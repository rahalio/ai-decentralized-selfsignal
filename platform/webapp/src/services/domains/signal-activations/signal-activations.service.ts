/**
 * signalActivations Service — thin client stub (wire to apiFetch as endpoints harden).
 */
import { apiFetch } from "@/services/shared/http";

export const signalActivationsService = {
  async list(apiKey?: string) {
    return apiFetch(`/v1/signal-activations`, { apiKey });
  },
};
