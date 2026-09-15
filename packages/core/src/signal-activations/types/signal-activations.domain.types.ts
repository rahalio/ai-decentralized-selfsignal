/**
 * Signal Activations Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/signal-activations.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ActivationMode = components["schemas"]["ActivationMode"];
export type SignalActivation = components["schemas"]["SignalActivation"];
export type SignalActivationId = components["schemas"]["SignalActivationId"];
export type SignalActivationListData = components["schemas"]["SignalActivationListData"];
export type SignalActivationReplay = components["schemas"]["SignalActivationReplay"];
export type SignalActivationRequest = components["schemas"]["SignalActivationRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RequestSignalActivationRequestInput = NonNullable<operations["requestSignalActivation"]["requestBody"]>["content"]["application/json"];
export type ReplaySignalActivationRequestInput = NonNullable<operations["replaySignalActivation"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListSignalActivationsParams = NonNullable<operations["listSignalActivations"]["parameters"]["query"]>;
export type GetSignalActivationParams = operations["getSignalActivation"]["parameters"]["path"];
export type ReplaySignalActivationParams = operations["replaySignalActivation"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListSignalActivationsResponse = operations["listSignalActivations"]["responses"]["200"]["content"]["application/json"];
export type RequestSignalActivationResponse = operations["requestSignalActivation"]["responses"]["201"]["content"]["application/json"];
export type GetSignalActivationResponse = operations["getSignalActivation"]["responses"]["200"]["content"]["application/json"];
export type ReplaySignalActivationResponse = operations["replaySignalActivation"]["responses"]["200"]["content"]["application/json"];


