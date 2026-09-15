/**
 * vaultProfiles Service — thin client stub (wire to apiFetch as endpoints harden).
 */
import { apiFetch } from "@/services/shared/http";

export const vaultProfilesService = {
  async list(apiKey?: string) {
    return apiFetch(`/v1/vault-profiles`, { apiKey });
  },
};
