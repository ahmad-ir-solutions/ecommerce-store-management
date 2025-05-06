import { Address, OrderDetails, OrderItem, OrderNote } from "@/pages/admin/orders/core/_modals"
import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface OrderState {
  order: OrderDetails | null
  isLoading: boolean
  error: Error | null

  // Actions
  setOrder: (order: OrderDetails) => void
  updateOrderStatus: (status: string) => void
  updateShippingMethod: (method: string) => void
  updateShippingCost: (cost: number) => void
  updateAttentionRequired: (required: boolean) => void
  updateBillingAddress: (address: Address) => void
  updateShippingAddress: (address: Address) => void
  updateOrderItems: (items: OrderItem[]) => void
  addOrderNote: (note: Omit<OrderNote, "id" | "createdOn">) => void
  addProductsToOrder: (products: any[]) => void

  // Loading and error states
  setLoading: (isLoading: boolean) => void
  setError: (error: Error | null) => void
}

export const useOrderStore = create<OrderState>()(
  devtools(
    (set) => ({
      order: null,
      isLoading: false,
      error: null,

      setOrder: (order) => set({ order }),

      updateOrderStatus: (status) =>
        set((state) => ({
          order: state.order ? { ...state.order, status } : null,
        })),

      updateShippingMethod: (shippingMethod) =>
        set((state) => ({
          order: state.order ? { ...state.order, shippingMethod } : null,
        })),

      updateShippingCost: (shippingCosts) =>
        set((state) => ({
          order: state.order
            ? {
                ...state.order,
                totals: {
                  ...state.order.totals,
                  shippingCosts,
                  total:
                    state.order.totals.subtotal +
                    shippingCosts +
                    state.order.totals.lineItemsTax -
                    state.order.totals.discount,
                },
              }
            : null,
        })),

      updateAttentionRequired: (attentionRequired) =>
        set((state) => ({
          order: state.order ? { ...state.order, attentionRequired } : null,
        })),

      updateBillingAddress: (billingAddress) =>
        set((state) => ({
          order: state.order ? { ...state.order, billingAddress } : null,
        })),

      updateShippingAddress: (shippingAddress) =>
        set((state) => ({
          order: state.order ? { ...state.order, shippingAddress } : null,
        })),

      updateOrderItems: (items) =>
        set((state) => {
          if (!state.order) return { order: null }

          // Recalculate totals
          const subtotal = items.reduce((sum, item) => sum + item.unitSubtotal * item.quantity, 0)
          const lineItemsTax = items.reduce((sum, item) => sum + item.taxTotal, 0)

          return {
            order: {
              ...state.order,
              items,
              totals: {
                ...state.order.totals,
                subtotal,
                lineItemsTax,
                total: subtotal + state.order.totals.shippingCosts + lineItemsTax - state.order.totals.discount,
              },
            },
          }
        }),

      addOrderNote: (noteData) =>
        set((state) => {
          if (!state.order) return { order: null }

          const newNote: OrderNote = {
            id: `note-${state.order.notes.length + 1}`,
            subject: noteData.subject,
            note: noteData.note,
            createdOn: new Date(),
            createdBy: noteData.createdBy,
          }

          return {
            order: {
              ...state.order,
              notes: [...state.order.notes, newNote],
            },
          }
        }),

      addProductsToOrder: (products) =>
        set((state) => {
          if (!state.order) return { order: null }

          // Convert products to order items
          const newItems: OrderItem[] = products.map((product) => ({
            id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            sku: product.sku,
            name: product.name,
            quantity: product.quantity || 1,
            unitSubtotal: product.price,
            taxRate: 20, // Default tax rate
            taxTotal: product.price * 0.2, // 20% tax
            discount: 0,
            status: "Pending",
            quantityAllocated: 0,
            options: "",
          }))

          const updatedItems = [...state.order.items, ...newItems]

          // Recalculate totals
          const subtotal = updatedItems.reduce((sum, item) => sum + item.unitSubtotal * item.quantity, 0)
          const lineItemsTax = updatedItems.reduce((sum, item) => sum + item.taxTotal, 0)

          return {
            order: {
              ...state.order,
              items: updatedItems,
              totals: {
                ...state.order.totals,
                subtotal,
                lineItemsTax,
                total: subtotal + state.order.totals.shippingCosts + lineItemsTax - state.order.totals.discount,
              },
            },
          }
        }),

      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
    }),
    { name: "order-store" },
  ),
)
