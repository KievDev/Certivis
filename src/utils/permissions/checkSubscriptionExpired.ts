"use server";

import { addDays, isAfter } from "date-fns";
import { Session } from "next-auth";
import { ResultPermissionProp } from "./canPermission";

const TRIAL_DAYS = 3;

export async function checkSubscriptionExpired(
  session: Session
): Promise<ResultPermissionProp> {
  const trialEndDate = addDays(session?.user?.createdAt!, TRIAL_DAYS);

  if (isAfter(new Date(), trialEndDate)) {
    return {
      hasPermission: false,
      PlanId: "EXPIRED",
      expired: true,
      plan: null,
    };
  }

  return {
    hasPermission: true,
    PlanId: "TRIAL",
    expired: false,
    plan: null,
  };
}
