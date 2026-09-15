import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createVaultProfile_Body = z
  .object({
    displayHandle: z.string().max(80).optional(),
    locale: z.string().min(2).max(16),
    childFlag: z.boolean().optional().default(false),
    specialCategoryFlag: z.boolean().optional().default(false),
  })
  .passthrough();
const updateVaultProfile_Body = z
  .object({
    displayHandle: z.string().max(80),
    locale: z.string().min(2).max(16),
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
const VaultProfileId = z.string();
const VaultProfileStatus = z.enum(['active', 'erasurePending', 'erased']);
const VaultProfile = z
  .object({
    id: z.string().regex(/^vpf_[0-9A-HJKMNP-TV-Z]{26}$/),
    displayHandle: z.string().max(80).optional(),
    status: z.enum(['active', 'erasurePending', 'erased']),
    locale: z.string().min(2).max(16),
    childFlag: z.boolean().optional(),
    specialCategoryFlag: z.boolean().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const VaultProfileListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^vpf_[0-9A-HJKMNP-TV-Z]{26}$/),
          displayHandle: z.string().max(80).optional(),
          status: z.enum(['active', 'erasurePending', 'erased']),
          locale: z.string().min(2).max(16),
          childFlag: z.boolean().optional(),
          specialCategoryFlag: z.boolean().optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
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
const VaultProfileListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^vpf_[0-9A-HJKMNP-TV-Z]{26}$/),
              displayHandle: z.string().max(80).optional(),
              status: z.enum(['active', 'erasurePending', 'erased']),
              locale: z.string().min(2).max(16),
              childFlag: z.boolean().optional(),
              specialCategoryFlag: z.boolean().optional(),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }),
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
const VaultProfileCreate = z
  .object({
    displayHandle: z.string().max(80).optional(),
    locale: z.string().min(2).max(16),
    childFlag: z.boolean().optional().default(false),
    specialCategoryFlag: z.boolean().optional().default(false),
  })
  .passthrough();
const VaultProfileResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^vpf_[0-9A-HJKMNP-TV-Z]{26}$/),
        displayHandle: z.string().max(80).optional(),
        status: z.enum(['active', 'erasurePending', 'erased']),
        locale: z.string().min(2).max(16),
        childFlag: z.boolean().optional(),
        specialCategoryFlag: z.boolean().optional(),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }),
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
const VaultProfileUpdate = z
  .object({
    displayHandle: z.string().max(80),
    locale: z.string().min(2).max(16),
  })
  .partial()
  .passthrough();
const VaultDataPack = z
  .object({
    personId: z.string().regex(/^vpf_[0-9A-HJKMNP-TV-Z]{26}$/),
    generatedAt: z.string().datetime({ offset: true }),
    grants: z.array(z.object({}).partial().passthrough()),
    rightsHistory: z.array(z.object({}).partial().passthrough()),
    packHash: z.string().optional(),
  })
  .passthrough();
const VaultDataPackResponse = z
  .object({
    data: z
      .object({
        personId: z.string().regex(/^vpf_[0-9A-HJKMNP-TV-Z]{26}$/),
        generatedAt: z.string().datetime({ offset: true }),
        grants: z.array(z.object({}).partial().passthrough()),
        rightsHistory: z.array(z.object({}).partial().passthrough()),
        packHash: z.string().optional(),
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
  createVaultProfile_Body,
  updateVaultProfile_Body,
  Problem,
  VaultProfileId,
  VaultProfileStatus,
  VaultProfile,
  VaultProfileListData,
  ResponseMeta,
  PageInfo,
  VaultProfileListResponse,
  VaultProfileCreate,
  VaultProfileResponse,
  VaultProfileUpdate,
  VaultDataPack,
  VaultDataPackResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/vault-profiles',
    alias: 'listVaultProfiles',
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
                  id: z.string().regex(/^vpf_[0-9A-HJKMNP-TV-Z]{26}$/),
                  displayHandle: z.string().max(80).optional(),
                  status: z.enum(['active', 'erasurePending', 'erased']),
                  locale: z.string().min(2).max(16),
                  childFlag: z.boolean().optional(),
                  specialCategoryFlag: z.boolean().optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }),
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
    path: '/v1/vault-profiles',
    alias: 'createVaultProfile',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createVaultProfile_Body,
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
            id: z.string().regex(/^vpf_[0-9A-HJKMNP-TV-Z]{26}$/),
            displayHandle: z.string().max(80).optional(),
            status: z.enum(['active', 'erasurePending', 'erased']),
            locale: z.string().min(2).max(16),
            childFlag: z.boolean().optional(),
            specialCategoryFlag: z.boolean().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
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
    path: '/v1/vault-profiles/:personId',
    alias: 'getVaultProfile',
    requestFormat: 'json',
    parameters: [
      {
        name: 'personId',
        type: 'Path',
        schema: z.string().regex(/^vpf_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^vpf_[0-9A-HJKMNP-TV-Z]{26}$/),
            displayHandle: z.string().max(80).optional(),
            status: z.enum(['active', 'erasurePending', 'erased']),
            locale: z.string().min(2).max(16),
            childFlag: z.boolean().optional(),
            specialCategoryFlag: z.boolean().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
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
    path: '/v1/vault-profiles/:personId',
    alias: 'updateVaultProfile',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: updateVaultProfile_Body,
      },
      {
        name: 'personId',
        type: 'Path',
        schema: z.string().regex(/^vpf_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^vpf_[0-9A-HJKMNP-TV-Z]{26}$/),
            displayHandle: z.string().max(80).optional(),
            status: z.enum(['active', 'erasurePending', 'erased']),
            locale: z.string().min(2).max(16),
            childFlag: z.boolean().optional(),
            specialCategoryFlag: z.boolean().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
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
    path: '/v1/vault-profiles/:personId/data-pack',
    alias: 'downloadVaultDataPack',
    requestFormat: 'json',
    parameters: [
      {
        name: 'personId',
        type: 'Path',
        schema: z.string().regex(/^vpf_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            personId: z.string().regex(/^vpf_[0-9A-HJKMNP-TV-Z]{26}$/),
            generatedAt: z.string().datetime({ offset: true }),
            grants: z.array(z.object({}).partial().passthrough()),
            rightsHistory: z.array(z.object({}).partial().passthrough()),
            packHash: z.string().optional(),
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
    path: '/v1/vault-profiles/:personId/erase',
    alias: 'eraseVaultProfile',
    requestFormat: 'json',
    parameters: [
      {
        name: 'personId',
        type: 'Path',
        schema: z.string().regex(/^vpf_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^vpf_[0-9A-HJKMNP-TV-Z]{26}$/),
            displayHandle: z.string().max(80).optional(),
            status: z.enum(['active', 'erasurePending', 'erased']),
            locale: z.string().min(2).max(16),
            childFlag: z.boolean().optional(),
            specialCategoryFlag: z.boolean().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
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
