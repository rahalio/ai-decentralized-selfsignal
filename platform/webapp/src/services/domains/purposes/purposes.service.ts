/**
 * purposes Service — thin client stub (wire to apiFetch as endpoints harden).
 */
import { apiFetch } from "@/services/shared/http";

export const purposesService = {
  async list(apiKey?: string) {
    return apiFetch(`/v1/purposes`, { apiKey });
  },
};
