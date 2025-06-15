"use server";

import { auth } from "@/lib/auth";
import { PlanDetailInfo } from "./get-plans";
import prisma from "@/lib/prisma";
import { canCreateService } from "./canCreateService";

export type PLAN_PROP = "BASIC" | "PROFESSIONAL" | "TRIAL" | "EXPIRED";

export interface ResultPermissionProp {
  hasPermission: boolean;
  PlanId: string;
  expired: boolean;
  plan: PlanDetailInfo | null;
}

interface CanPermissionProps {
  type: string;
}

export async function canPermission({
  type,
}: CanPermissionProps): Promise<ResultPermissionProp> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      hasPermission: false,
      PlanId: "EXPIRED",
      expired: true,
      plan: null,
    };
  }

  const subscription = await prisma.subscription.findFirst({
    where: {
      userId: session?.user?.id,
    },
  });

  switch (type) {
    case "service":
      const permission = await canCreateService(subscription, session);

    default:
      return {
        hasPermission: false,
        PlanId: "EXPIRED",
        expired: true,
        plan: null,
      };
  }
}
