/**
 * integrations Service — thin client stub (wire to apiFetch as endpoints harden).
 */
import { apiFetch } from "@/services/shared/http";

export const integrationsService = {
  async list(apiKey?: string) {
    return apiFetch(`/v1/integrations`, { apiKey });
  },
};
