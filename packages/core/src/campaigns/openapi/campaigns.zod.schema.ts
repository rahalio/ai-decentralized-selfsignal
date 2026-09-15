import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createCampaign_Body = z
  .object({
    name: z.string(),
    purposeId: z.string(),
    brandIntegrationId: z.string().optional(),
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
const CampaignId = z.string();
const CampaignStatus = z.enum([
  'draft',
  'approved',
  'blocked',
  'live',
  'ended',
]);
const Campaign = z
  .object({
    id: z.string().regex(/^cmp_[0-9A-HJKMNP-TV-Z]{26}$/),
    name: z.string().min(1).max(160),
    purposeId: z.string(),
    brandIntegrationId: z.string().optional(),
    status: z.enum(['draft', 'approved', 'blocked', 'live', 'ended']),
    audienceCount: z.number().int().gte(0).optional(),
    grantedAudienceCount: z.number().int().gte(0).optional(),
    fineRiskScore: z.number().gte(0).lte(100),
    blockReason: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const CampaignListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^cmp_[0-9A-HJKMNP-TV-Z]{26}$/),
          name: z.string().min(1).max(160),
          purposeId: z.string(),
          brandIntegrationId: z.string().optional(),
          status: z.enum(['draft', 'approved', 'blocked', 'live', 'ended']),
          audienceCount: z.number().int().gte(0).optional(),
          grantedAudienceCount: z.number().int().gte(0).optional(),
          fineRiskScore: z.number().gte(0).lte(100),
          blockReason: z.string().optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }).optional(),
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
const CampaignListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^cmp_[0-9A-HJKMNP-TV-Z]{26}$/),
              name: z.string().min(1).max(160),
              purposeId: z.string(),
              brandIntegrationId: z.string().optional(),
              status: z.enum(['draft', 'approved', 'blocked', 'live', 'ended']),
              audienceCount: z.number().int().gte(0).optional(),
              grantedAudienceCount: z.number().int().gte(0).optional(),
              fineRiskScore: z.number().gte(0).lte(100),
              blockReason: z.string().optional(),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }).optional(),
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
const CampaignCreate = z
  .object({
    name: z.string(),
    purposeId: z.string(),
    brandIntegrationId: z.string().optional(),
  })
  .passthrough();
const CampaignResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^cmp_[0-9A-HJKMNP-TV-Z]{26}$/),
        name: z.string().min(1).max(160),
        purposeId: z.string(),
        brandIntegrationId: z.string().optional(),
        status: z.enum(['draft', 'approved', 'blocked', 'live', 'ended']),
        audienceCount: z.number().int().gte(0).optional(),
        grantedAudienceCount: z.number().int().gte(0).optional(),
        fineRiskScore: z.number().gte(0).lte(100),
        blockReason: z.string().optional(),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }).optional(),
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
const CampaignGateResult = z
  .object({
    campaignId: z.string().regex(/^cmp_[0-9A-HJKMNP-TV-Z]{26}$/),
    allowed: z.boolean(),
    fineRiskScore: z.number(),
    missingGrantCount: z.number().int().optional(),
    expiredGrantCount: z.number().int().optional(),
    blockReason: z.string().optional(),
  })
  .passthrough();
const CampaignGateResultResponse = z
  .object({
    data: z
      .object({
        campaignId: z.string().regex(/^cmp_[0-9A-HJKMNP-TV-Z]{26}$/),
        allowed: z.boolean(),
        fineRiskScore: z.number(),
        missingGrantCount: z.number().int().optional(),
        expiredGrantCount: z.number().int().optional(),
        blockReason: z.string().optional(),
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
  createCampaign_Body,
  Problem,
  CampaignId,
  CampaignStatus,
  Campaign,
  CampaignListData,
  ResponseMeta,
  PageInfo,
  CampaignListResponse,
  CampaignCreate,
  CampaignResponse,
  CampaignGateResult,
  CampaignGateResultResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/campaigns',
    alias: 'listCampaigns',
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
      {
        name: 'status',
        type: 'Query',
        schema: z
          .enum(['draft', 'approved', 'blocked', 'live', 'ended'])
          .optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^cmp_[0-9A-HJKMNP-TV-Z]{26}$/),
                  name: z.string().min(1).max(160),
                  purposeId: z.string(),
                  brandIntegrationId: z.string().optional(),
                  status: z.enum([
                    'draft',
                    'approved',
                    'blocked',
                    'live',
                    'ended',
                  ]),
                  audienceCount: z.number().int().gte(0).optional(),
                  grantedAudienceCount: z.number().int().gte(0).optional(),
                  fineRiskScore: z.number().gte(0).lte(100),
                  blockReason: z.string().optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/campaigns',
    alias: 'createCampaign',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createCampaign_Body,
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
            id: z.string().regex(/^cmp_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(160),
            purposeId: z.string(),
            brandIntegrationId: z.string().optional(),
            status: z.enum(['draft', 'approved', 'blocked', 'live', 'ended']),
            audienceCount: z.number().int().gte(0).optional(),
            grantedAudienceCount: z.number().int().gte(0).optional(),
            fineRiskScore: z.number().gte(0).lte(100),
            blockReason: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/campaigns/:campaignId',
    alias: 'getCampaign',
    requestFormat: 'json',
    parameters: [
      {
        name: 'campaignId',
        type: 'Path',
        schema: z.string().regex(/^cmp_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^cmp_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(160),
            purposeId: z.string(),
            brandIntegrationId: z.string().optional(),
            status: z.enum(['draft', 'approved', 'blocked', 'live', 'ended']),
            audienceCount: z.number().int().gte(0).optional(),
            grantedAudienceCount: z.number().int().gte(0).optional(),
            fineRiskScore: z.number().gte(0).lte(100),
            blockReason: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/campaigns/:campaignId/compliance-gate',
    alias: 'runCampaignComplianceGate',
    requestFormat: 'json',
    parameters: [
      {
        name: 'campaignId',
        type: 'Path',
        schema: z.string().regex(/^cmp_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            campaignId: z.string().regex(/^cmp_[0-9A-HJKMNP-TV-Z]{26}$/),
            allowed: z.boolean(),
            fineRiskScore: z.number(),
            missingGrantCount: z.number().int().optional(),
            expiredGrantCount: z.number().int().optional(),
            blockReason: z.string().optional(),
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
