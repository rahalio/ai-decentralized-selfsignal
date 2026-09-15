import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const registerIntegration_Body = z
  .object({
    name: z.string(),
    role: z.enum(['controller', 'processor']),
    partyType: z.enum(['publisher', 'brand', 'vendor']).optional(),
    dpaOnFile: z.boolean().optional().default(false),
    purposeIds: z.array(z.string()).optional(),
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
const IntegrationId = z.string();
const IntegrationRole = z.enum(['controller', 'processor']);
const IntegrationStatus = z.enum(['active', 'suspended']);
const PartyType = z.enum(['publisher', 'brand', 'vendor']);
const Integration = z
  .object({
    id: z.string().regex(/^int_[0-9A-HJKMNP-TV-Z]{26}$/),
    name: z.string().min(1).max(160),
    role: z.enum(['controller', 'processor']),
    status: z.enum(['active', 'suspended']),
    partyType: z.enum(['publisher', 'brand', 'vendor']).optional(),
    dpaOnFile: z.boolean().optional(),
    purposeIds: z.array(z.string()).optional(),
    gapFlags: z
      .array(z.enum(['missingDpa', 'missingPurpose', 'suspendedPartner']))
      .optional(),
    createdAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const IntegrationListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^int_[0-9A-HJKMNP-TV-Z]{26}$/),
          name: z.string().min(1).max(160),
          role: z.enum(['controller', 'processor']),
          status: z.enum(['active', 'suspended']),
          partyType: z.enum(['publisher', 'brand', 'vendor']).optional(),
          dpaOnFile: z.boolean().optional(),
          purposeIds: z.array(z.string()).optional(),
          gapFlags: z
            .array(z.enum(['missingDpa', 'missingPurpose', 'suspendedPartner']))
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
const IntegrationListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^int_[0-9A-HJKMNP-TV-Z]{26}$/),
              name: z.string().min(1).max(160),
              role: z.enum(['controller', 'processor']),
              status: z.enum(['active', 'suspended']),
              partyType: z.enum(['publisher', 'brand', 'vendor']).optional(),
              dpaOnFile: z.boolean().optional(),
              purposeIds: z.array(z.string()).optional(),
              gapFlags: z
                .array(
                  z.enum(['missingDpa', 'missingPurpose', 'suspendedPartner'])
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
const IntegrationCreate = z
  .object({
    name: z.string(),
    role: z.enum(['controller', 'processor']),
    partyType: z.enum(['publisher', 'brand', 'vendor']).optional(),
    dpaOnFile: z.boolean().optional().default(false),
    purposeIds: z.array(z.string()).optional(),
  })
  .passthrough();
const IntegrationResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^int_[0-9A-HJKMNP-TV-Z]{26}$/),
        name: z.string().min(1).max(160),
        role: z.enum(['controller', 'processor']),
        status: z.enum(['active', 'suspended']),
        partyType: z.enum(['publisher', 'brand', 'vendor']).optional(),
        dpaOnFile: z.boolean().optional(),
        purposeIds: z.array(z.string()).optional(),
        gapFlags: z
          .array(z.enum(['missingDpa', 'missingPurpose', 'suspendedPartner']))
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
  registerIntegration_Body,
  Problem,
  IntegrationId,
  IntegrationRole,
  IntegrationStatus,
  PartyType,
  Integration,
  IntegrationListData,
  ResponseMeta,
  PageInfo,
  IntegrationListResponse,
  IntegrationCreate,
  IntegrationResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/integrations',
    alias: 'listIntegrations',
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
        name: 'role',
        type: 'Query',
        schema: z.enum(['controller', 'processor']).optional(),
      },
      {
        name: 'partyType',
        type: 'Query',
        schema: z.enum(['publisher', 'brand', 'vendor']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^int_[0-9A-HJKMNP-TV-Z]{26}$/),
                  name: z.string().min(1).max(160),
                  role: z.enum(['controller', 'processor']),
                  status: z.enum(['active', 'suspended']),
                  partyType: z
                    .enum(['publisher', 'brand', 'vendor'])
                    .optional(),
                  dpaOnFile: z.boolean().optional(),
                  purposeIds: z.array(z.string()).optional(),
                  gapFlags: z
                    .array(
                      z.enum([
                        'missingDpa',
                        'missingPurpose',
                        'suspendedPartner',
                      ])
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
    path: '/v1/integrations',
    alias: 'registerIntegration',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: registerIntegration_Body,
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
            id: z.string().regex(/^int_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(160),
            role: z.enum(['controller', 'processor']),
            status: z.enum(['active', 'suspended']),
            partyType: z.enum(['publisher', 'brand', 'vendor']).optional(),
            dpaOnFile: z.boolean().optional(),
            purposeIds: z.array(z.string()).optional(),
            gapFlags: z
              .array(
                z.enum(['missingDpa', 'missingPurpose', 'suspendedPartner'])
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
    path: '/v1/integrations/:integrationId',
    alias: 'getIntegration',
    requestFormat: 'json',
    parameters: [
      {
        name: 'integrationId',
        type: 'Path',
        schema: z.string().regex(/^int_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^int_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(160),
            role: z.enum(['controller', 'processor']),
            status: z.enum(['active', 'suspended']),
            partyType: z.enum(['publisher', 'brand', 'vendor']).optional(),
            dpaOnFile: z.boolean().optional(),
            purposeIds: z.array(z.string()).optional(),
            gapFlags: z
              .array(
                z.enum(['missingDpa', 'missingPurpose', 'suspendedPartner'])
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
