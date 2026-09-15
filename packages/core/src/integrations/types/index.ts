/**
 * Integrations Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/integrations.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type Integration = components["schemas"]["Integration"];
export type IntegrationCreate = components["schemas"]["IntegrationCreate"];
export type IntegrationId = components["schemas"]["IntegrationId"];
export type IntegrationListData = components["schemas"]["IntegrationListData"];
export type IntegrationRole = components["schemas"]["IntegrationRole"];
export type IntegrationStatus = components["schemas"]["IntegrationStatus"];
export type PartyType = components["schemas"]["PartyType"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RegisterIntegrationRequestInput = NonNullable<operations["registerIntegration"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListIntegrationsParams = NonNullable<operations["listIntegrations"]["parameters"]["query"]>;
export type GetIntegrationParams = operations["getIntegration"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListIntegrationsResponse = operations["listIntegrations"]["responses"]["200"]["content"]["application/json"];
export type RegisterIntegrationResponse = operations["registerIntegration"]["responses"]["201"]["content"]["application/json"];
export type GetIntegrationResponse = operations["getIntegration"]["responses"]["200"]["content"]["application/json"];


