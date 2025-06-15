"use server";

import { auth } from "@/lib/auth";
import { PlanDetailInfo } from "./get-plans";
import prisma from "@/lib/prisma";

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
      return {
        hasPermission: false,
        PlanId: "EXPIRED",
        expired: true,
        plan: null,
      };
    default:
      return {
        hasPermission: false,
        PlanId: "EXPIRED",
        expired: true,
        plan: null,
      };
  }
}
