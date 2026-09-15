/**
 * auditExports Service — thin client stub (wire to apiFetch as endpoints harden).
 */
import { apiFetch } from "@/services/shared/http";

export const auditExportsService = {
  async list(apiKey?: string) {
    return apiFetch(`/v1/audit-exports`, { apiKey });
  },
};
