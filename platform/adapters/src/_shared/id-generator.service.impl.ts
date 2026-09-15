/**
 * ID Generator Service Implementation — Selfsignal prefixes.
 */

import type { DomainCode } from '@selfsignal/core/_shared/helpers';
import { DOMAIN_PREFIX_MAP, isValidDomainId } from '@selfsignal/core';
import { ulid } from 'ulid';
import type { IdGeneratorService } from '@selfsignal/services/_shared';

export function generateIdWithPrefix(prefix: string): string {
  if (!prefix || prefix.length !== 3 || !/^[a-z]{3}$/.test(prefix)) {
    throw new Error(
      `Invalid domain prefix: "${prefix}". Must be exactly 3 lowercase letters.`
    );
  }
  const id = `${prefix}_${ulid().toLowerCase()}`;
  if (!isValidDomainId(id)) {
    throw new Error(`Generated ID "${id}" failed validation.`);
  }
  return id;
}

export class DefaultIdGeneratorService implements IdGeneratorService {
  tntId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tenant);
  }
  keyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.apiKey);
  }
  idnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.identity);
  }
  autId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auth);
  }
  vpfId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.vaultProfile);
  }
  purId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.purpose);
  }
  cgrId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.consentGrant);
  }
  actId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.signalActivation);
  }
  cmpId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.campaign);
  }
  rrqId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.rightsRequest);
  }
  intId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.integration);
  }
  cpcId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.complaintCase);
  }
  cvrId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.coverageReport);
  }
  audId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auditExport);
  }
  generateIdForDomain(domainCode: DomainCode): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP[domainCode]);
  }
}

let idGeneratorService: DefaultIdGeneratorService | null = null;

export function getIdGeneratorService(): DefaultIdGeneratorService {
  if (!idGeneratorService) {
    idGeneratorService = new DefaultIdGeneratorService();
  }
  return idGeneratorService;
}
