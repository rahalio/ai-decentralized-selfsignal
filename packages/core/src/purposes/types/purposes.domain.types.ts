/**
 * Purposes Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/purposes.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type Purpose = components["schemas"]["Purpose"];
export type PurposeCreate = components["schemas"]["PurposeCreate"];
export type PurposeId = components["schemas"]["PurposeId"];
export type PurposeListData = components["schemas"]["PurposeListData"];
export type PurposeStatus = components["schemas"]["PurposeStatus"];
export type PurposeUpdate = components["schemas"]["PurposeUpdate"];
export type SignalClass = components["schemas"]["SignalClass"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreatePurposeRequestInput = NonNullable<operations["createPurpose"]["requestBody"]>["content"]["application/json"];
export type UpdatePurposeRequestInput = NonNullable<operations["updatePurpose"]["requestBody"]>["content"]["application/json"];
export type UpdatePurposeRequest = UpdatePurposeRequestInput;


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListPurposesParams = NonNullable<operations["listPurposes"]["parameters"]["query"]>;
export type GetPurposeParams = operations["getPurpose"]["parameters"]["path"];
export type UpdatePurposeParams = operations["updatePurpose"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListPurposesResponse = operations["listPurposes"]["responses"]["200"]["content"]["application/json"];
export type CreatePurposeResponse = operations["createPurpose"]["responses"]["201"]["content"]["application/json"];
export type GetPurposeResponse = operations["getPurpose"]["responses"]["200"]["content"]["application/json"];
export type UpdatePurposeResponse = operations["updatePurpose"]["responses"]["200"]["content"]["application/json"];


