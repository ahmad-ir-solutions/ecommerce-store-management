interface PickwaveStats {
  totalOutstandingOrders?: number;
  totalOpenPickwaves?: number;
  ordersPickedToday?: number;
  ordersPickedLast48Hours?: number;
  ordersPickedLastWeek?: number;
  avgOrdersPerPicker?: number;
  avgTimeToPick?: number;
  ordersRemainingToPick?: number;
}

export function PickwaveStats({ stats }: { stats: PickwaveStats }) {
    return (
      <div className="bg-white rounded-2xl shadow-none overflow-hidden px-3">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Stats</h2>
  
          <div className="grid grid-cols-3 gap-11 text-sm">
            <div className="grid gap-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Total Outstanding Orders</span>
                <span>{stats.totalOutstandingOrders ?? "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total Open Pickwaves</span>
                <span>{stats.totalOpenPickwaves ?? "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Orders Picked Today</span>
                <span>{stats.ordersPickedToday ?? "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Orders Picked Last 48 Hours</span>
                <span>{stats.ordersPickedLast48Hours ?? "-"}</span>
              </div>
            </div>
  
            <div className="grid gap-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Orders Picked Last Week</span>
                <span>{stats.ordersPickedLastWeek ?? "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Avg. Orders Per Picker</span>
                <span>{stats.avgOrdersPerPicker ?? "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Avg. Time To Pick (minutes)</span>
                <span>{stats.avgTimeToPick ?? "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Orders Remaining To Pick</span>
                <span>{stats.ordersRemainingToPick ?? "-"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  