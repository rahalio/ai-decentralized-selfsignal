/**
 * complaintCases Service — thin client stub (wire to apiFetch as endpoints harden).
 */
import { apiFetch } from "@/services/shared/http";

export const complaintCasesService = {
  async list(apiKey?: string) {
    return apiFetch(`/v1/complaint-cases`, { apiKey });
  },
};
