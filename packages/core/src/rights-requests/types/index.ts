/**
 * Rights Requests Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/rights-requests.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type RightType = components["schemas"]["RightType"];
export type RightsRequest = components["schemas"]["RightsRequest"];
export type RightsRequestCreate = components["schemas"]["RightsRequestCreate"];
export type RightsRequestFulfil = components["schemas"]["RightsRequestFulfil"];
export type RightsRequestId = components["schemas"]["RightsRequestId"];
export type RightsRequestListData = components["schemas"]["RightsRequestListData"];
export type RightsRequestListResponse = components["schemas"]["RightsRequestListResponse"];
export type RightsRequestResponse = components["schemas"]["RightsRequestResponse"];
export type RightsRequestStatus = components["schemas"]["RightsRequestStatus"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateRightsRequestRequestInput = NonNullable<operations["createRightsRequest"]["requestBody"]>["content"]["application/json"];
export type FulfilRightsRequestRequestInput = NonNullable<operations["fulfilRightsRequest"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListRightsRequestsParams = NonNullable<operations["listRightsRequests"]["parameters"]["query"]>;
export type GetRightsRequestParams = operations["getRightsRequest"]["parameters"]["path"];
export type FulfilRightsRequestParams = operations["fulfilRightsRequest"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListRightsRequestsResponse = operations["listRightsRequests"]["responses"]["200"]["content"]["application/json"];
export type CreateRightsRequestResponse = operations["createRightsRequest"]["responses"]["201"]["content"]["application/json"];
export type GetRightsRequestResponse = operations["getRightsRequest"]["responses"]["200"]["content"]["application/json"];
export type FulfilRightsRequestResponse = operations["fulfilRightsRequest"]["responses"]["200"]["content"]["application/json"];


