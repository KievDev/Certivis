"use server";

import { addDays, isAfter } from "date-fns";
import { Session } from "next-auth";
import { ResultPermissionProp } from "./canPermission";
import { TRIAL_DAYS } from "./trial_limits";

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
