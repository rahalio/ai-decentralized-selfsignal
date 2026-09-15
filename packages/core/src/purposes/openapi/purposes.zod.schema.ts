import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createPurpose_Body = z
  .object({
    name: z.string().min(1).max(120),
    description: z.string().max(2000).optional(),
    signalClasses: z
      .array(
        z.enum([
          'intent',
          'demographic',
          'contextual',
          'engagement',
          'suppression',
        ])
      )
      .min(1),
    riskTier: z
      .enum(['standard', 'elevated', 'specialCategory'])
      .optional()
      .default('standard'),
    badgeLabel: z.string().optional(),
  })
  .passthrough();
const updatePurpose_Body = z
  .object({
    name: z.string(),
    description: z.string(),
    status: z.enum(['active', 'retired']),
    badgeLabel: z.string(),
  })
  .partial()
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
const PurposeId = z.string();
const PurposeStatus = z.enum(['active', 'retired']);
const SignalClass = z.enum([
  'intent',
  'demographic',
  'contextual',
  'engagement',
  'suppression',
]);
const Purpose = z
  .object({
    id: z.string().regex(/^pur_[0-9A-HJKMNP-TV-Z]{26}$/),
    name: z.string().min(1).max(120),
    description: z.string().max(2000).optional(),
    status: z.enum(['active', 'retired']),
    signalClasses: z
      .array(
        z.enum([
          'intent',
          'demographic',
          'contextual',
          'engagement',
          'suppression',
        ])
      )
      .min(1),
    riskTier: z.enum(['standard', 'elevated', 'specialCategory']).optional(),
    badgeLabel: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const PurposeListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^pur_[0-9A-HJKMNP-TV-Z]{26}$/),
          name: z.string().min(1).max(120),
          description: z.string().max(2000).optional(),
          status: z.enum(['active', 'retired']),
          signalClasses: z
            .array(
              z.enum([
                'intent',
                'demographic',
                'contextual',
                'engagement',
                'suppression',
              ])
            )
            .min(1),
          riskTier: z
            .enum(['standard', 'elevated', 'specialCategory'])
            .optional(),
          badgeLabel: z.string().optional(),
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
const PurposeListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^pur_[0-9A-HJKMNP-TV-Z]{26}$/),
              name: z.string().min(1).max(120),
              description: z.string().max(2000).optional(),
              status: z.enum(['active', 'retired']),
              signalClasses: z
                .array(
                  z.enum([
                    'intent',
                    'demographic',
                    'contextual',
                    'engagement',
                    'suppression',
                  ])
                )
                .min(1),
              riskTier: z
                .enum(['standard', 'elevated', 'specialCategory'])
                .optional(),
              badgeLabel: z.string().optional(),
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
const PurposeCreate = z
  .object({
    name: z.string().min(1).max(120),
    description: z.string().max(2000).optional(),
    signalClasses: z
      .array(
        z.enum([
          'intent',
          'demographic',
          'contextual',
          'engagement',
          'suppression',
        ])
      )
      .min(1),
    riskTier: z
      .enum(['standard', 'elevated', 'specialCategory'])
      .optional()
      .default('standard'),
    badgeLabel: z.string().optional(),
  })
  .passthrough();
const PurposeResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^pur_[0-9A-HJKMNP-TV-Z]{26}$/),
        name: z.string().min(1).max(120),
        description: z.string().max(2000).optional(),
        status: z.enum(['active', 'retired']),
        signalClasses: z
          .array(
            z.enum([
              'intent',
              'demographic',
              'contextual',
              'engagement',
              'suppression',
            ])
          )
          .min(1),
        riskTier: z
          .enum(['standard', 'elevated', 'specialCategory'])
          .optional(),
        badgeLabel: z.string().optional(),
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
const PurposeUpdate = z
  .object({
    name: z.string(),
    description: z.string(),
    status: z.enum(['active', 'retired']),
    badgeLabel: z.string(),
  })
  .partial()
  .passthrough();

export const schemas: any = {
  createPurpose_Body,
  updatePurpose_Body,
  Problem,
  PurposeId,
  PurposeStatus,
  SignalClass,
  Purpose,
  PurposeListData,
  ResponseMeta,
  PageInfo,
  PurposeListResponse,
  PurposeCreate,
  PurposeResponse,
  PurposeUpdate,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/purposes',
    alias: 'listPurposes',
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
                  id: z.string().regex(/^pur_[0-9A-HJKMNP-TV-Z]{26}$/),
                  name: z.string().min(1).max(120),
                  description: z.string().max(2000).optional(),
                  status: z.enum(['active', 'retired']),
                  signalClasses: z
                    .array(
                      z.enum([
                        'intent',
                        'demographic',
                        'contextual',
                        'engagement',
                        'suppression',
                      ])
                    )
                    .min(1),
                  riskTier: z
                    .enum(['standard', 'elevated', 'specialCategory'])
                    .optional(),
                  badgeLabel: z.string().optional(),
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
    path: '/v1/purposes',
    alias: 'createPurpose',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createPurpose_Body,
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
            id: z.string().regex(/^pur_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(120),
            description: z.string().max(2000).optional(),
            status: z.enum(['active', 'retired']),
            signalClasses: z
              .array(
                z.enum([
                  'intent',
                  'demographic',
                  'contextual',
                  'engagement',
                  'suppression',
                ])
              )
              .min(1),
            riskTier: z
              .enum(['standard', 'elevated', 'specialCategory'])
              .optional(),
            badgeLabel: z.string().optional(),
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
    path: '/v1/purposes/:purposeId',
    alias: 'getPurpose',
    requestFormat: 'json',
    parameters: [
      {
        name: 'purposeId',
        type: 'Path',
        schema: z.string().regex(/^pur_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^pur_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(120),
            description: z.string().max(2000).optional(),
            status: z.enum(['active', 'retired']),
            signalClasses: z
              .array(
                z.enum([
                  'intent',
                  'demographic',
                  'contextual',
                  'engagement',
                  'suppression',
                ])
              )
              .min(1),
            riskTier: z
              .enum(['standard', 'elevated', 'specialCategory'])
              .optional(),
            badgeLabel: z.string().optional(),
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
    method: 'patch',
    path: '/v1/purposes/:purposeId',
    alias: 'updatePurpose',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: updatePurpose_Body,
      },
      {
        name: 'purposeId',
        type: 'Path',
        schema: z.string().regex(/^pur_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^pur_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(120),
            description: z.string().max(2000).optional(),
            status: z.enum(['active', 'retired']),
            signalClasses: z
              .array(
                z.enum([
                  'intent',
                  'demographic',
                  'contextual',
                  'engagement',
                  'suppression',
                ])
              )
              .min(1),
            riskTier: z
              .enum(['standard', 'elevated', 'specialCategory'])
              .optional(),
            badgeLabel: z.string().optional(),
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
