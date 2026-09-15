/**
 * IdGeneratorService Port — Selfsignal prefixes.
 */

import type { DomainCode } from '@selfsignal/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  vpfId(): string;
  purId(): string;
  cgrId(): string;
  actId(): string;
  cmpId(): string;
  rrqId(): string;
  intId(): string;
  cpcId(): string;
  cvrId(): string;
  audId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
