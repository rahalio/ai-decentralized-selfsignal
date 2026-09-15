/**
 * campaigns Service — thin client stub (wire to apiFetch as endpoints harden).
 */
import { apiFetch } from "@/services/shared/http";

export const campaignsService = {
  async list(apiKey?: string) {
    return apiFetch(`/v1/campaigns`, { apiKey });
  },
};
