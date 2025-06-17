import authApi from "@/lib/axios"
import type {
  IPickwaveResponse,
  IPickwave,
  IPickList,
  IScanResponse,
  IOrderLabel,
  CreatePickwaveData,
  UpdatePickwaveData,
  PickwaveQueryParams,
  ScanProductData,
  OrderLabelParams,
} from "./_modals"

const PICKWAVE_URL = "/pickwave"
const PICKLIST_URL = "/pickwave/generate-picklist"
const SCAN_URL = "/pickwave/scan"
const LABEL_URL = "/pickwave/label"

// Get all pickwaves with optional query parameters
export function getAllPickwaves(params?: PickwaveQueryParams) {
  return authApi.get<IPickwave[]>(PICKWAVE_URL, { params })
}

// Get a specific pickwave by ID
export function getSpecificPickwave(id: string) {
  return authApi.get<IPickwave>(`${PICKWAVE_URL}/${id}`)
}

// Create a new pickwave
export function createPickwave(body: CreatePickwaveData) {
  return authApi.post<IPickwaveResponse>(PICKWAVE_URL, body)
}

// Update an existing pickwave
export function updatePickwave(id: string, body: UpdatePickwaveData) {
  return authApi.patch<IPickwaveResponse>(`${PICKWAVE_URL}/${id}`, body)
}

// Delete a pickwave
export function deletePickwave(id: string) {
  return authApi.delete<{ message: string }>(`${PICKWAVE_URL}/${id}`)
}

// Create a pick list for a pickwave
export function createPickList(pickwaveId: string) {
  return authApi.post<IPickList>(`${PICKLIST_URL}/${pickwaveId}`)
}

// Scan a product
export function scanProduct(data: ScanProductData) {
  return authApi.post<IScanResponse>(SCAN_URL, data)
}

// Get order label
export function getOrderLabel(params: OrderLabelParams) {
  return authApi.get<IOrderLabel>(LABEL_URL, { params })
}

// Mark pickwave as complete
export function completePickwave(id: string) {
  return authApi.patch<IPickwaveResponse>(`${PICKWAVE_URL}/${id}/complete`)
}

// Assign picker to pickwave
export function assignPicker(id: string, picker: string) {
  return authApi.patch<IPickwaveResponse>(`${PICKWAVE_URL}/${id}/assign`, { picker })
}

// Start picking process
export function startPicking(id: string) {
  return authApi.patch<IPickwaveResponse>(`${PICKWAVE_URL}/${id}/start`)
}

// Cancel pickwave
export function cancelPickwave(id: string) {
  return authApi.patch<IPickwaveResponse>(`${PICKWAVE_URL}/${id}/cancel`)
}