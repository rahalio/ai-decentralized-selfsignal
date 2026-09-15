/**
 * Vault Profiles Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/vault-profiles.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type VaultDataPack = components["schemas"]["VaultDataPack"];
export type VaultProfile = components["schemas"]["VaultProfile"];
export type VaultProfileCreate = components["schemas"]["VaultProfileCreate"];
export type VaultProfileId = components["schemas"]["VaultProfileId"];
export type VaultProfileListData = components["schemas"]["VaultProfileListData"];
export type VaultProfileStatus = components["schemas"]["VaultProfileStatus"];
export type VaultProfileUpdate = components["schemas"]["VaultProfileUpdate"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateVaultProfileRequestInput = NonNullable<operations["createVaultProfile"]["requestBody"]>["content"]["application/json"];
export type UpdateVaultProfileRequestInput = NonNullable<operations["updateVaultProfile"]["requestBody"]>["content"]["application/json"];
export type UpdateVaultProfileRequest = UpdateVaultProfileRequestInput;


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListVaultProfilesParams = NonNullable<operations["listVaultProfiles"]["parameters"]["query"]>;
export type GetVaultProfileParams = operations["getVaultProfile"]["parameters"]["path"];
export type UpdateVaultProfileParams = operations["updateVaultProfile"]["parameters"]["path"];
export type EraseVaultProfileParams = operations["eraseVaultProfile"]["parameters"]["path"];
export type DownloadVaultDataPackParams = operations["downloadVaultDataPack"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListVaultProfilesResponse = operations["listVaultProfiles"]["responses"]["200"]["content"]["application/json"];
export type CreateVaultProfileResponse = operations["createVaultProfile"]["responses"]["201"]["content"]["application/json"];
export type GetVaultProfileResponse = operations["getVaultProfile"]["responses"]["200"]["content"]["application/json"];
export type UpdateVaultProfileResponse = operations["updateVaultProfile"]["responses"]["200"]["content"]["application/json"];
export type EraseVaultProfileResponse = operations["eraseVaultProfile"]["responses"]["200"]["content"]["application/json"];
export type DownloadVaultDataPackResponse = operations["downloadVaultDataPack"]["responses"]["200"]["content"]["application/json"];


