/**
 * rightsRequests Service — thin client stub (wire to apiFetch as endpoints harden).
 */
import { apiFetch } from "@/services/shared/http";

export const rightsRequestsService = {
  async list(apiKey?: string) {
    return apiFetch(`/v1/rights-requests`, { apiKey });
  },
};
