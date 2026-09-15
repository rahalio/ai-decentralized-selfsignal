import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createCoverageReport_Body = z
  .object({
    periodStart: z.string().datetime({ offset: true }),
    periodEnd: z.string().datetime({ offset: true }),
    integrationId: z.string().optional(),
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
const CoverageReportId = z.string();
const CoverageReport = z
  .object({
    id: z.string().regex(/^cvr_[0-9A-HJKMNP-TV-Z]{26}$/),
    periodStart: z.string().datetime({ offset: true }),
    periodEnd: z.string().datetime({ offset: true }),
    consentedRpm: z.number(),
    contextualRpm: z.number(),
    coveragePct: z.number().gte(0).lte(100),
    withdrawalLatencyP50Ms: z.number().int().optional(),
    expiredGrantCount: z.number().int().optional(),
    specialCategoryBlockRate: z.number().optional(),
    purposeHeat: z
      .array(
        z
          .object({
            purposeId: z.string(),
            coveragePct: z.number(),
            fineRiskScore: z.number(),
            expiredGrants: z.number().int().optional(),
          })
          .passthrough()
      )
      .optional(),
    createdAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const CoverageReportListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^cvr_[0-9A-HJKMNP-TV-Z]{26}$/),
          periodStart: z.string().datetime({ offset: true }),
          periodEnd: z.string().datetime({ offset: true }),
          consentedRpm: z.number(),
          contextualRpm: z.number(),
          coveragePct: z.number().gte(0).lte(100),
          withdrawalLatencyP50Ms: z.number().int().optional(),
          expiredGrantCount: z.number().int().optional(),
          specialCategoryBlockRate: z.number().optional(),
          purposeHeat: z
            .array(
              z
                .object({
                  purposeId: z.string(),
                  coveragePct: z.number(),
                  fineRiskScore: z.number(),
                  expiredGrants: z.number().int().optional(),
                })
                .passthrough()
            )
            .optional(),
          createdAt: z.string().datetime({ offset: true }),
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
const CoverageReportListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^cvr_[0-9A-HJKMNP-TV-Z]{26}$/),
              periodStart: z.string().datetime({ offset: true }),
              periodEnd: z.string().datetime({ offset: true }),
              consentedRpm: z.number(),
              contextualRpm: z.number(),
              coveragePct: z.number().gte(0).lte(100),
              withdrawalLatencyP50Ms: z.number().int().optional(),
              expiredGrantCount: z.number().int().optional(),
              specialCategoryBlockRate: z.number().optional(),
              purposeHeat: z
                .array(
                  z
                    .object({
                      purposeId: z.string(),
                      coveragePct: z.number(),
                      fineRiskScore: z.number(),
                      expiredGrants: z.number().int().optional(),
                    })
                    .passthrough()
                )
                .optional(),
              createdAt: z.string().datetime({ offset: true }),
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
const CoverageReportCreate = z
  .object({
    periodStart: z.string().datetime({ offset: true }),
    periodEnd: z.string().datetime({ offset: true }),
    integrationId: z.string().optional(),
  })
  .passthrough();
const CoverageReportResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^cvr_[0-9A-HJKMNP-TV-Z]{26}$/),
        periodStart: z.string().datetime({ offset: true }),
        periodEnd: z.string().datetime({ offset: true }),
        consentedRpm: z.number(),
        contextualRpm: z.number(),
        coveragePct: z.number().gte(0).lte(100),
        withdrawalLatencyP50Ms: z.number().int().optional(),
        expiredGrantCount: z.number().int().optional(),
        specialCategoryBlockRate: z.number().optional(),
        purposeHeat: z
          .array(
            z
              .object({
                purposeId: z.string(),
                coveragePct: z.number(),
                fineRiskScore: z.number(),
                expiredGrants: z.number().int().optional(),
              })
              .passthrough()
          )
          .optional(),
        createdAt: z.string().datetime({ offset: true }),
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
  createCoverageReport_Body,
  Problem,
  CoverageReportId,
  CoverageReport,
  CoverageReportListData,
  ResponseMeta,
  PageInfo,
  CoverageReportListResponse,
  CoverageReportCreate,
  CoverageReportResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/coverage-reports',
    alias: 'listCoverageReports',
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
                  id: z.string().regex(/^cvr_[0-9A-HJKMNP-TV-Z]{26}$/),
                  periodStart: z.string().datetime({ offset: true }),
                  periodEnd: z.string().datetime({ offset: true }),
                  consentedRpm: z.number(),
                  contextualRpm: z.number(),
                  coveragePct: z.number().gte(0).lte(100),
                  withdrawalLatencyP50Ms: z.number().int().optional(),
                  expiredGrantCount: z.number().int().optional(),
                  specialCategoryBlockRate: z.number().optional(),
                  purposeHeat: z
                    .array(
                      z
                        .object({
                          purposeId: z.string(),
                          coveragePct: z.number(),
                          fineRiskScore: z.number(),
                          expiredGrants: z.number().int().optional(),
                        })
                        .passthrough()
                    )
                    .optional(),
                  createdAt: z.string().datetime({ offset: true }),
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
    path: '/v1/coverage-reports',
    alias: 'createCoverageReport',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createCoverageReport_Body,
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
            id: z.string().regex(/^cvr_[0-9A-HJKMNP-TV-Z]{26}$/),
            periodStart: z.string().datetime({ offset: true }),
            periodEnd: z.string().datetime({ offset: true }),
            consentedRpm: z.number(),
            contextualRpm: z.number(),
            coveragePct: z.number().gte(0).lte(100),
            withdrawalLatencyP50Ms: z.number().int().optional(),
            expiredGrantCount: z.number().int().optional(),
            specialCategoryBlockRate: z.number().optional(),
            purposeHeat: z
              .array(
                z
                  .object({
                    purposeId: z.string(),
                    coveragePct: z.number(),
                    fineRiskScore: z.number(),
                    expiredGrants: z.number().int().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            createdAt: z.string().datetime({ offset: true }),
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
    path: '/v1/coverage-reports/:reportId',
    alias: 'getCoverageReport',
    requestFormat: 'json',
    parameters: [
      {
        name: 'reportId',
        type: 'Path',
        schema: z.string().regex(/^cvr_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^cvr_[0-9A-HJKMNP-TV-Z]{26}$/),
            periodStart: z.string().datetime({ offset: true }),
            periodEnd: z.string().datetime({ offset: true }),
            consentedRpm: z.number(),
            contextualRpm: z.number(),
            coveragePct: z.number().gte(0).lte(100),
            withdrawalLatencyP50Ms: z.number().int().optional(),
            expiredGrantCount: z.number().int().optional(),
            specialCategoryBlockRate: z.number().optional(),
            purposeHeat: z
              .array(
                z
                  .object({
                    purposeId: z.string(),
                    coveragePct: z.number(),
                    fineRiskScore: z.number(),
                    expiredGrants: z.number().int().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            createdAt: z.string().datetime({ offset: true }),
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
    path: '/v1/coverage-reports/latest',
    alias: 'getLatestCoverageReport',
    requestFormat: 'json',
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^cvr_[0-9A-HJKMNP-TV-Z]{26}$/),
            periodStart: z.string().datetime({ offset: true }),
            periodEnd: z.string().datetime({ offset: true }),
            consentedRpm: z.number(),
            contextualRpm: z.number(),
            coveragePct: z.number().gte(0).lte(100),
            withdrawalLatencyP50Ms: z.number().int().optional(),
            expiredGrantCount: z.number().int().optional(),
            specialCategoryBlockRate: z.number().optional(),
            purposeHeat: z
              .array(
                z
                  .object({
                    purposeId: z.string(),
                    coveragePct: z.number(),
                    fineRiskScore: z.number(),
                    expiredGrants: z.number().int().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            createdAt: z.string().datetime({ offset: true }),
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
