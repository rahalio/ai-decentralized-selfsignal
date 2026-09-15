import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const requestSignalActivation_Body = z
  .object({
    personId: z.string(),
    purposeId: z.string(),
    integrationId: z.string(),
    preferMode: z.enum(['deterministic', 'probabilistic']).optional(),
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
const SignalActivationId = z.string();
const ActivationMode = z.enum(['deterministic', 'probabilistic']);
const SignalActivation = z
  .object({
    id: z.string().regex(/^act_[0-9A-HJKMNP-TV-Z]{26}$/),
    personId: z.string(),
    purposeId: z.string(),
    integrationId: z.string(),
    allowed: z.boolean(),
    mode: z.enum(['deterministic', 'probabilistic']),
    emittedSignals: z.array(z.string()).optional(),
    reason: z.string().optional(),
    failureCode: z
      .enum([
        'noGrant',
        'expired',
        'withdrawn',
        'childBlock',
        'specialCategoryBlock',
        'campaignBlocked',
      ])
      .optional(),
    bidstreamTokenStatus: z
      .enum(['issued', 'suppressed', 'expired'])
      .optional(),
    withdrawalSlaMs: z.number().int().optional(),
    createdAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const SignalActivationListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^act_[0-9A-HJKMNP-TV-Z]{26}$/),
          personId: z.string(),
          purposeId: z.string(),
          integrationId: z.string(),
          allowed: z.boolean(),
          mode: z.enum(['deterministic', 'probabilistic']),
          emittedSignals: z.array(z.string()).optional(),
          reason: z.string().optional(),
          failureCode: z
            .enum([
              'noGrant',
              'expired',
              'withdrawn',
              'childBlock',
              'specialCategoryBlock',
              'campaignBlocked',
            ])
            .optional(),
          bidstreamTokenStatus: z
            .enum(['issued', 'suppressed', 'expired'])
            .optional(),
          withdrawalSlaMs: z.number().int().optional(),
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
const SignalActivationListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^act_[0-9A-HJKMNP-TV-Z]{26}$/),
              personId: z.string(),
              purposeId: z.string(),
              integrationId: z.string(),
              allowed: z.boolean(),
              mode: z.enum(['deterministic', 'probabilistic']),
              emittedSignals: z.array(z.string()).optional(),
              reason: z.string().optional(),
              failureCode: z
                .enum([
                  'noGrant',
                  'expired',
                  'withdrawn',
                  'childBlock',
                  'specialCategoryBlock',
                  'campaignBlocked',
                ])
                .optional(),
              bidstreamTokenStatus: z
                .enum(['issued', 'suppressed', 'expired'])
                .optional(),
              withdrawalSlaMs: z.number().int().optional(),
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
const SignalActivationRequest = z
  .object({
    personId: z.string(),
    purposeId: z.string(),
    integrationId: z.string(),
    preferMode: z.enum(['deterministic', 'probabilistic']).optional(),
  })
  .passthrough();
const SignalActivationResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^act_[0-9A-HJKMNP-TV-Z]{26}$/),
        personId: z.string(),
        purposeId: z.string(),
        integrationId: z.string(),
        allowed: z.boolean(),
        mode: z.enum(['deterministic', 'probabilistic']),
        emittedSignals: z.array(z.string()).optional(),
        reason: z.string().optional(),
        failureCode: z
          .enum([
            'noGrant',
            'expired',
            'withdrawn',
            'childBlock',
            'specialCategoryBlock',
            'campaignBlocked',
          ])
          .optional(),
        bidstreamTokenStatus: z
          .enum(['issued', 'suppressed', 'expired'])
          .optional(),
        withdrawalSlaMs: z.number().int().optional(),
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
const SignalActivationReplay = z
  .object({ note: z.string() })
  .partial()
  .passthrough();

export const schemas: any = {
  requestSignalActivation_Body,
  Problem,
  SignalActivationId,
  ActivationMode,
  SignalActivation,
  SignalActivationListData,
  ResponseMeta,
  PageInfo,
  SignalActivationListResponse,
  SignalActivationRequest,
  SignalActivationResponse,
  SignalActivationReplay,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/signal-activations',
    alias: 'listSignalActivations',
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
        name: 'personId',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'allowed',
        type: 'Query',
        schema: z.boolean().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^act_[0-9A-HJKMNP-TV-Z]{26}$/),
                  personId: z.string(),
                  purposeId: z.string(),
                  integrationId: z.string(),
                  allowed: z.boolean(),
                  mode: z.enum(['deterministic', 'probabilistic']),
                  emittedSignals: z.array(z.string()).optional(),
                  reason: z.string().optional(),
                  failureCode: z
                    .enum([
                      'noGrant',
                      'expired',
                      'withdrawn',
                      'childBlock',
                      'specialCategoryBlock',
                      'campaignBlocked',
                    ])
                    .optional(),
                  bidstreamTokenStatus: z
                    .enum(['issued', 'suppressed', 'expired'])
                    .optional(),
                  withdrawalSlaMs: z.number().int().optional(),
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
    path: '/v1/signal-activations',
    alias: 'requestSignalActivation',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: requestSignalActivation_Body,
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
            id: z.string().regex(/^act_[0-9A-HJKMNP-TV-Z]{26}$/),
            personId: z.string(),
            purposeId: z.string(),
            integrationId: z.string(),
            allowed: z.boolean(),
            mode: z.enum(['deterministic', 'probabilistic']),
            emittedSignals: z.array(z.string()).optional(),
            reason: z.string().optional(),
            failureCode: z
              .enum([
                'noGrant',
                'expired',
                'withdrawn',
                'childBlock',
                'specialCategoryBlock',
                'campaignBlocked',
              ])
              .optional(),
            bidstreamTokenStatus: z
              .enum(['issued', 'suppressed', 'expired'])
              .optional(),
            withdrawalSlaMs: z.number().int().optional(),
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
    path: '/v1/signal-activations/:activationId',
    alias: 'getSignalActivation',
    requestFormat: 'json',
    parameters: [
      {
        name: 'activationId',
        type: 'Path',
        schema: z.string().regex(/^act_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^act_[0-9A-HJKMNP-TV-Z]{26}$/),
            personId: z.string(),
            purposeId: z.string(),
            integrationId: z.string(),
            allowed: z.boolean(),
            mode: z.enum(['deterministic', 'probabilistic']),
            emittedSignals: z.array(z.string()).optional(),
            reason: z.string().optional(),
            failureCode: z
              .enum([
                'noGrant',
                'expired',
                'withdrawn',
                'childBlock',
                'specialCategoryBlock',
                'campaignBlocked',
              ])
              .optional(),
            bidstreamTokenStatus: z
              .enum(['issued', 'suppressed', 'expired'])
              .optional(),
            withdrawalSlaMs: z.number().int().optional(),
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
    method: 'post',
    path: '/v1/signal-activations/:activationId/replay',
    alias: 'replaySignalActivation',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z
          .object({ note: z.string() })
          .partial()
          .passthrough()
          .optional(),
      },
      {
        name: 'activationId',
        type: 'Path',
        schema: z.string().regex(/^act_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^act_[0-9A-HJKMNP-TV-Z]{26}$/),
            personId: z.string(),
            purposeId: z.string(),
            integrationId: z.string(),
            allowed: z.boolean(),
            mode: z.enum(['deterministic', 'probabilistic']),
            emittedSignals: z.array(z.string()).optional(),
            reason: z.string().optional(),
            failureCode: z
              .enum([
                'noGrant',
                'expired',
                'withdrawn',
                'childBlock',
                'specialCategoryBlock',
                'campaignBlocked',
              ])
              .optional(),
            bidstreamTokenStatus: z
              .enum(['issued', 'suppressed', 'expired'])
              .optional(),
            withdrawalSlaMs: z.number().int().optional(),
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
