/**
 * consentGrants Service — thin client stub (wire to apiFetch as endpoints harden).
 */
import { apiFetch } from "@/services/shared/http";

export const consentGrantsService = {
  async list(apiKey?: string) {
    return apiFetch(`/v1/consent-grants`, { apiKey });
  },
};
