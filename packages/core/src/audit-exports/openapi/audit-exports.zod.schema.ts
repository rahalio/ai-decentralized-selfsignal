import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createAuditExport_Body = z
  .object({
    periodStart: z.string().datetime({ offset: true }),
    periodEnd: z.string().datetime({ offset: true }),
    includeRights: z.boolean().optional().default(true),
    includeComplaints: z.boolean().optional().default(true),
  })
  .passthrough();
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const AuditExportId = z.string();
const AuditExportStatus = z.enum(['pending', 'ready', 'failed']);
const AuditExport = z
  .object({
    id: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
    periodStart: z.string().datetime({ offset: true }),
    periodEnd: z.string().datetime({ offset: true }),
    status: z.enum(['pending', 'ready', 'failed']),
    artefactChecklist: z.array(z.string()).optional(),
    packHash: z.string().optional(),
    attestationUrl: z.string().url().optional(),
    createdAt: z.string().datetime({ offset: true }),
    readyAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const AuditExportListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
          periodStart: z.string().datetime({ offset: true }),
          periodEnd: z.string().datetime({ offset: true }),
          status: z.enum(['pending', 'ready', 'failed']),
          artefactChecklist: z.array(z.string()).optional(),
          packHash: z.string().optional(),
          attestationUrl: z.string().url().optional(),
          createdAt: z.string().datetime({ offset: true }),
          readyAt: z.string().datetime({ offset: true }).optional(),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const PageInfo = z
  .object({
    page: z.number().int().gte(1),
    limit: z.number().int().gte(1),
    total: z.number().int().gte(0),
    cursor: z.string(),
  })
  .partial()
  .passthrough();
const AuditExportListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
              periodStart: z.string().datetime({ offset: true }),
              periodEnd: z.string().datetime({ offset: true }),
              status: z.enum(['pending', 'ready', 'failed']),
              artefactChecklist: z.array(z.string()).optional(),
              packHash: z.string().optional(),
              attestationUrl: z.string().url().optional(),
              createdAt: z.string().datetime({ offset: true }),
              readyAt: z.string().datetime({ offset: true }).optional(),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .and(
        z
          .object({
            pagination: z
              .object({
                page: z.number().int().gte(1),
                limit: z.number().int().gte(1),
                total: z.number().int().gte(0),
                cursor: z.string(),
              })
              .partial()
              .passthrough(),
          })
          .partial()
          .passthrough()
      )
      .optional(),
  })
  .passthrough();
const AuditExportCreate = z
  .object({
    periodStart: z.string().datetime({ offset: true }),
    periodEnd: z.string().datetime({ offset: true }),
    includeRights: z.boolean().optional().default(true),
    includeComplaints: z.boolean().optional().default(true),
  })
  .passthrough();
const AuditExportResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
        periodStart: z.string().datetime({ offset: true }),
        periodEnd: z.string().datetime({ offset: true }),
        status: z.enum(['pending', 'ready', 'failed']),
        artefactChecklist: z.array(z.string()).optional(),
        packHash: z.string().optional(),
        attestationUrl: z.string().url().optional(),
        createdAt: z.string().datetime({ offset: true }),
        readyAt: z.string().datetime({ offset: true }).optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const AuditAttestation = z
  .object({
    exportId: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
    packHash: z.string(),
    verified: z.boolean(),
    generatedAt: z.string().datetime({ offset: true }),
    summary: z.string().optional(),
  })
  .passthrough();
const AuditAttestationResponse = z
  .object({
    data: z
      .object({
        exportId: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
        packHash: z.string(),
        verified: z.boolean(),
        generatedAt: z.string().datetime({ offset: true }),
        summary: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();

export const schemas: any = {
  createAuditExport_Body,
  Problem,
  AuditExportId,
  AuditExportStatus,
  AuditExport,
  AuditExportListData,
  ResponseMeta,
  PageInfo,
  AuditExportListResponse,
  AuditExportCreate,
  AuditExportResponse,
  AuditAttestation,
  AuditAttestationResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/audit-exports',
    alias: 'listAuditExports',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(100).optional().default(25),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
                  periodStart: z.string().datetime({ offset: true }),
                  periodEnd: z.string().datetime({ offset: true }),
                  status: z.enum(['pending', 'ready', 'failed']),
                  artefactChecklist: z.array(z.string()).optional(),
                  packHash: z.string().optional(),
                  attestationUrl: z.string().url().optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  readyAt: z.string().datetime({ offset: true }).optional(),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .and(
            z
              .object({
                pagination: z
                  .object({
                    page: z.number().int().gte(1),
                    limit: z.number().int().gte(1),
                    total: z.number().int().gte(0),
                    cursor: z.string(),
                  })
                  .partial()
                  .passthrough(),
              })
              .partial()
              .passthrough()
          )
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/audit-exports',
    alias: 'createAuditExport',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createAuditExport_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
            periodStart: z.string().datetime({ offset: true }),
            periodEnd: z.string().datetime({ offset: true }),
            status: z.enum(['pending', 'ready', 'failed']),
            artefactChecklist: z.array(z.string()).optional(),
            packHash: z.string().optional(),
            attestationUrl: z.string().url().optional(),
            createdAt: z.string().datetime({ offset: true }),
            readyAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/audit-exports/:exportId',
    alias: 'getAuditExport',
    requestFormat: 'json',
    parameters: [
      {
        name: 'exportId',
        type: 'Path',
        schema: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
            periodStart: z.string().datetime({ offset: true }),
            periodEnd: z.string().datetime({ offset: true }),
            status: z.enum(['pending', 'ready', 'failed']),
            artefactChecklist: z.array(z.string()).optional(),
            packHash: z.string().optional(),
            attestationUrl: z.string().url().optional(),
            createdAt: z.string().datetime({ offset: true }),
            readyAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/audit-exports/:exportId/verify',
    alias: 'verifyAuditExport',
    requestFormat: 'json',
    parameters: [
      {
        name: 'exportId',
        type: 'Path',
        schema: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            exportId: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
            packHash: z.string(),
            verified: z.boolean(),
            generatedAt: z.string().datetime({ offset: true }),
            summary: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/public/attestations/:exportId',
    alias: 'getPublicAttestation',
    requestFormat: 'json',
    parameters: [
      {
        name: 'exportId',
        type: 'Path',
        schema: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            exportId: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
            packHash: z.string(),
            verified: z.boolean(),
            generatedAt: z.string().datetime({ offset: true }),
            summary: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
