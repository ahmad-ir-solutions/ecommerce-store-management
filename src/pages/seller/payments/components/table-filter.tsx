import { Button } from "@/components/ui/button"
import { CustomSearch } from "@/components/shared/custom-search"

interface FilterTab {
  id: string
  label: string
  count?: number
}

interface TableFiltersProps {
  tabs: FilterTab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  searchTerm: string
  onSearchChange: (term: string) => void
  onRefresh?: () => void
}

export function TableFilters({
  tabs,
  activeTab,
  onTabChange,
  searchTerm,
  onSearchChange,
  // onRefresh,
}: TableFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-3">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "outline"}
            size="sm"
            onClick={() => onTabChange(tab.id)}
            className={`rounded-xl px-11 py-3 text-sm font-medium transition-all shadow-none ${activeTab === tab.id
              ? "bg-[#024AFE] text-white hover:bg-[#0230fe]"
              : "bg-white text-gray-600 border-none hover:bg-gray-50"
              }`}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 
      bg-white rounded-xl p-4
      ">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <CustomSearch value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)} placeholder="search here ..." />
        </div>

        {/* Action Buttons */}
        {/* <div className="flex items-center space-x-2">
          <Button
            variant="filter"
            size="sm"
          >
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </Button>

          <Button
            variant="filter"
            size="sm"
          >
            <BarChart3 className="w-4 h-4" />
          </Button>

          {onRefresh && (
            <Button
              variant="filter"
              size="sm"
              onClick={onRefresh}
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          )}

          <Button
            variant="filter"
            size="sm"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div> */}
      </div>
    </div>
  )
}
