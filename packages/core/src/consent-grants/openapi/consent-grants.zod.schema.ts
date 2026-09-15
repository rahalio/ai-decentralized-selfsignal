import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createConsentGrant_Body = z
  .object({
    personId: z.string(),
    purposeId: z.string(),
    controllerIntegrationId: z.string(),
    signalClasses: z.array(z.string()).min(1),
    expiresAt: z.string().datetime({ offset: true }),
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
const ConsentGrantId = z.string();
const ConsentGrantStatus = z.enum(['active', 'withdrawn', 'expired']);
const ConsentGrant = z
  .object({
    id: z.string().regex(/^cgr_[0-9A-HJKMNP-TV-Z]{26}$/),
    personId: z.string(),
    purposeId: z.string(),
    controllerIntegrationId: z.string(),
    status: z.enum(['active', 'withdrawn', 'expired']),
    signalClasses: z.array(z.string()).min(1),
    expiresAt: z.string().datetime({ offset: true }),
    withdrawnAt: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const ConsentGrantListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^cgr_[0-9A-HJKMNP-TV-Z]{26}$/),
          personId: z.string(),
          purposeId: z.string(),
          controllerIntegrationId: z.string(),
          status: z.enum(['active', 'withdrawn', 'expired']),
          signalClasses: z.array(z.string()).min(1),
          expiresAt: z.string().datetime({ offset: true }),
          withdrawnAt: z.string().datetime({ offset: true }).optional(),
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
const ConsentGrantListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^cgr_[0-9A-HJKMNP-TV-Z]{26}$/),
              personId: z.string(),
              purposeId: z.string(),
              controllerIntegrationId: z.string(),
              status: z.enum(['active', 'withdrawn', 'expired']),
              signalClasses: z.array(z.string()).min(1),
              expiresAt: z.string().datetime({ offset: true }),
              withdrawnAt: z.string().datetime({ offset: true }).optional(),
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
const ConsentGrantCreate = z
  .object({
    personId: z.string(),
    purposeId: z.string(),
    controllerIntegrationId: z.string(),
    signalClasses: z.array(z.string()).min(1),
    expiresAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const ConsentGrantResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^cgr_[0-9A-HJKMNP-TV-Z]{26}$/),
        personId: z.string(),
        purposeId: z.string(),
        controllerIntegrationId: z.string(),
        status: z.enum(['active', 'withdrawn', 'expired']),
        signalClasses: z.array(z.string()).min(1),
        expiresAt: z.string().datetime({ offset: true }),
        withdrawnAt: z.string().datetime({ offset: true }).optional(),
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
const ConsentGrantWithdraw = z
  .object({ reason: z.string().max(500) })
  .partial()
  .passthrough();
const ConsentGrantRenew = z
  .object({ expiresAt: z.string().datetime({ offset: true }) })
  .passthrough();

export const schemas: any = {
  createConsentGrant_Body,
  Problem,
  ConsentGrantId,
  ConsentGrantStatus,
  ConsentGrant,
  ConsentGrantListData,
  ResponseMeta,
  PageInfo,
  ConsentGrantListResponse,
  ConsentGrantCreate,
  ConsentGrantResponse,
  ConsentGrantWithdraw,
  ConsentGrantRenew,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/consent-grants',
    alias: 'listConsentGrants',
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
        name: 'status',
        type: 'Query',
        schema: z.enum(['active', 'withdrawn', 'expired']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^cgr_[0-9A-HJKMNP-TV-Z]{26}$/),
                  personId: z.string(),
                  purposeId: z.string(),
                  controllerIntegrationId: z.string(),
                  status: z.enum(['active', 'withdrawn', 'expired']),
                  signalClasses: z.array(z.string()).min(1),
                  expiresAt: z.string().datetime({ offset: true }),
                  withdrawnAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/consent-grants',
    alias: 'createConsentGrant',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createConsentGrant_Body,
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
            id: z.string().regex(/^cgr_[0-9A-HJKMNP-TV-Z]{26}$/),
            personId: z.string(),
            purposeId: z.string(),
            controllerIntegrationId: z.string(),
            status: z.enum(['active', 'withdrawn', 'expired']),
            signalClasses: z.array(z.string()).min(1),
            expiresAt: z.string().datetime({ offset: true }),
            withdrawnAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/consent-grants/:grantId',
    alias: 'getConsentGrant',
    requestFormat: 'json',
    parameters: [
      {
        name: 'grantId',
        type: 'Path',
        schema: z.string().regex(/^cgr_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^cgr_[0-9A-HJKMNP-TV-Z]{26}$/),
            personId: z.string(),
            purposeId: z.string(),
            controllerIntegrationId: z.string(),
            status: z.enum(['active', 'withdrawn', 'expired']),
            signalClasses: z.array(z.string()).min(1),
            expiresAt: z.string().datetime({ offset: true }),
            withdrawnAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/consent-grants/:grantId/renew',
    alias: 'renewConsentGrant',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z
          .object({ expiresAt: z.string().datetime({ offset: true }) })
          .passthrough(),
      },
      {
        name: 'grantId',
        type: 'Path',
        schema: z.string().regex(/^cgr_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^cgr_[0-9A-HJKMNP-TV-Z]{26}$/),
            personId: z.string(),
            purposeId: z.string(),
            controllerIntegrationId: z.string(),
            status: z.enum(['active', 'withdrawn', 'expired']),
            signalClasses: z.array(z.string()).min(1),
            expiresAt: z.string().datetime({ offset: true }),
            withdrawnAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/consent-grants/:grantId/withdraw',
    alias: 'withdrawConsentGrant',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z
          .object({ reason: z.string().max(500) })
          .partial()
          .passthrough()
          .optional(),
      },
      {
        name: 'grantId',
        type: 'Path',
        schema: z.string().regex(/^cgr_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^cgr_[0-9A-HJKMNP-TV-Z]{26}$/),
            personId: z.string(),
            purposeId: z.string(),
            controllerIntegrationId: z.string(),
            status: z.enum(['active', 'withdrawn', 'expired']),
            signalClasses: z.array(z.string()).min(1),
            expiresAt: z.string().datetime({ offset: true }),
            withdrawnAt: z.string().datetime({ offset: true }).optional(),
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
