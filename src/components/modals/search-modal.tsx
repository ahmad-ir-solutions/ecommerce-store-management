import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { Search, Package, ShoppingCart, FileText, X, User, MapPin } from "lucide-react"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
// import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

interface SearchResult {
  id: string
  title: string
  subtitle?: string
  type: "order" | "product" | "page" | "help"
  image?: string
  metadata?: Record<string, any>
}

interface SearchResponse {
  orders: SearchResult[]
  products: SearchResult[]
  pages: SearchResult[]
  help: SearchResult[]
}

// Mock API functions - replace with your actual API calls
const searchAPI = async (query: string): Promise<SearchResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  if (!query.trim()) {
    return { orders: [], products: [], pages: [], help: [] }
  }

  // Mock data - replace with actual API calls
  return {
    orders: [
      {
        id: "19867111",
        title: "Order 19867111",
        subtitle: "01/03/2025 12:16 • 1 item",
        type: "order",
        metadata: { customer: "John Doe", status: "completed" },
      },
      {
        id: "20307689",
        title: "Order 20307689",
        subtitle: "12/05/2025 16:11 • 1 item",
        type: "order",
        metadata: { customer: "Martin Townsend", location: "United Kingdom" },
      },
      {
        id: "20116170",
        title: "Order 20116170",
        subtitle: "11/04/2025 09:10 • 1 item",
        type: "order",
        metadata: { customer: "SL25GF", location: "United Kingdom" },
      },
    ],
    products: [
      {
        id: "3614274092974",
        title: "YSL LASH CLASH MASCARA",
        subtitle: "SKU: 3614274092974",
        type: "product",
        image: "/placeholder.svg?height=40&width=40",
        metadata: { price: "£24.99", stock: 150 },
      },
    ],
    pages: [
      {
        id: "top-selling",
        title: "Top Selling Items",
        type: "page",
      },
      {
        id: "top-selling-parent",
        title: "Top Selling Parent Products",
        type: "page",
      },
    ],
    help: [],
  }
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function SearchModal({ isOpen, onClose, searchQuery, onSearchChange }: SearchModalProps) {
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery)

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () => searchAPI(debouncedQuery),
    enabled: isOpen && debouncedQuery.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const handleResultClick = (result: SearchResult) => {
    console.log("Selected result:", result)
    // Handle navigation based on result type
    switch (result.type) {
      case "order":
        // Navigate to order details
        break
      case "product":
        // Navigate to product details
        break
      case "page":
        // Navigate to specific page
        break
      case "help":
        // Open help article
        break
    }
    onClose()
  }

  const renderOrderResult = (order: SearchResult) => (
    <div
      key={order.id}
      className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer rounded-lg"
      onClick={() => handleResultClick(order)}
    >
      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
        <ShoppingCart className="w-4 h-4 text-blue-600" />
      </div>
      <div className="flex-1">
        <div className="font-medium text-sm">{order.title}</div>
        <div className="text-xs text-gray-500">{order.subtitle}</div>
        {order.metadata && (
          <div className="flex items-center gap-2 mt-1">
            {order.metadata.customer && (
              <div className="flex items-center gap-1">
                <User className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500">{order.metadata.customer}</span>
              </div>
            )}
            {order.metadata.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500">{order.metadata.location}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )

  const renderProductResult = (product: SearchResult) => (
    <div
      key={product.id}
      className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer rounded-lg"
      onClick={() => handleResultClick(product)}
    >
      <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden">
        {product.image ? (
          <img src={product.image || "/placeholder.svg"} alt={product.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-4 h-4 text-gray-400" />
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="font-medium text-sm">{product.title}</div>
        <div className="text-xs text-gray-500">{product.subtitle}</div>
        {product.metadata && (
          <div className="flex items-center gap-2 mt-1">
            {product.metadata.price && (
              <Badge variant="secondary" className="text-xs">
                {product.metadata.price}
              </Badge>
            )}
            {product.metadata.stock && <span className="text-xs text-gray-500">Stock: {product.metadata.stock}</span>}
          </div>
        )}
      </div>
    </div>
  )

  const renderPageResult = (page: SearchResult) => (
    <div
      key={page.id}
      className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer rounded-lg"
      onClick={() => handleResultClick(page)}
    >
      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
        <FileText className="w-4 h-4 text-green-600" />
      </div>
      <div className="flex-1">
        <div className="font-medium text-sm">{page.title}</div>
      </div>
    </div>
  )

  const hasResults =
    searchResults &&
    (searchResults.orders.length > 0 ||
      searchResults.products.length > 0 ||
      searchResults.pages.length > 0 ||
      searchResults.help.length > 0)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0">
        <DialogHeader className="p-4 pb-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search for orders, products, pages, actions & help"
              className="pl-10 pr-10 border-0 focus-visible:ring-0 text-base"
              autoFocus
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-auto">
          {isLoading && searchQuery && (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-2"></div>
              Searching...
            </div>
          )}

          {!isLoading && searchQuery && !hasResults && (
            <div className="p-4 text-center text-gray-500">No results found for "{searchQuery}"</div>
          )}

          {!searchQuery && (
            <div className="p-4 text-center text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>Start typing to search for orders, products, pages, and more...</p>
            </div>
          )}

          {searchResults && hasResults && (
            <div className="p-4 space-y-4">
              {/* Orders Section */}
              {searchResults.orders.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-sm text-gray-700">ORDERS</h3>
                      <Badge variant="secondary" className="text-xs">
                        {searchResults.orders.length} RESULTS
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs text-blue-600">
                      VIEW ALL RESULTS
                    </Button>
                  </div>
                  <div className="space-y-1">{searchResults.orders.map(renderOrderResult)}</div>
                </div>
              )}

              {/* Products Section */}
              {searchResults.products.length > 0 && (
                <div>
                  {/* <Separator className="my-4" /> */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-sm text-gray-700">PRODUCTS</h3>
                      <Badge variant="secondary" className="text-xs">
                        {searchResults.products.length} RESULT
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs text-blue-600">
                      VIEW ALL RESULTS
                    </Button>
                  </div>
                  <div className="space-y-1">{searchResults.products.map(renderProductResult)}</div>
                </div>
              )}

              {/* Pages & Actions Section */}
              {searchResults.pages.length > 0 && (
                <div>
                  {/* <Separator className="my-4" /> */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-sm text-gray-700">PAGES & ACTIONS</h3>
                      <Badge variant="secondary" className="text-xs">
                        {searchResults.pages.length} RESULTS
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-1">{searchResults.pages.map(renderPageResult)}</div>
                </div>
              )}

              {/* Help Section */}
              {searchResults.help.length > 0 && (
                <div>
                  {/* <Separator className="my-4" /> */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-sm text-gray-700">HELP</h3>
                      <Badge variant="secondary" className="text-xs">
                        NO RESULTS
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs text-blue-600">
                      OPEN
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
