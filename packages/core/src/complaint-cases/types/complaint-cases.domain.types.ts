/**
 * Complaint Cases Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/complaint-cases.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ComplaintCase = components["schemas"]["ComplaintCase"];
export type ComplaintCaseClose = components["schemas"]["ComplaintCaseClose"];
export type ComplaintCaseCreate = components["schemas"]["ComplaintCaseCreate"];
export type ComplaintCaseEscalate = components["schemas"]["ComplaintCaseEscalate"];
export type ComplaintCaseId = components["schemas"]["ComplaintCaseId"];
export type ComplaintCaseListData = components["schemas"]["ComplaintCaseListData"];
export type ComplaintCaseStatus = components["schemas"]["ComplaintCaseStatus"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type OpenComplaintCaseRequestInput = NonNullable<operations["openComplaintCase"]["requestBody"]>["content"]["application/json"];
export type EscalateComplaintCaseRequestInput = NonNullable<operations["escalateComplaintCase"]["requestBody"]>["content"]["application/json"];
export type CloseComplaintCaseRequestInput = NonNullable<operations["closeComplaintCase"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListComplaintCasesParams = NonNullable<operations["listComplaintCases"]["parameters"]["query"]>;
export type GetComplaintCaseParams = operations["getComplaintCase"]["parameters"]["path"];
export type EscalateComplaintCaseParams = operations["escalateComplaintCase"]["parameters"]["path"];
export type CloseComplaintCaseParams = operations["closeComplaintCase"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListComplaintCasesResponse = operations["listComplaintCases"]["responses"]["200"]["content"]["application/json"];
export type OpenComplaintCaseResponse = operations["openComplaintCase"]["responses"]["201"]["content"]["application/json"];
export type GetComplaintCaseResponse = operations["getComplaintCase"]["responses"]["200"]["content"]["application/json"];
export type EscalateComplaintCaseResponse = operations["escalateComplaintCase"]["responses"]["200"]["content"]["application/json"];
export type CloseComplaintCaseResponse = operations["closeComplaintCase"]["responses"]["200"]["content"]["application/json"];


