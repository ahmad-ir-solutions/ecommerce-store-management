
export const getStatusColor = (status?: string) => {
    // Check if dateString is provided
    if (!status) {
      return 'bg-gray-500 text-white'; // Return a default message if no date is provided
    }

    switch (status) {
      case 'pending':
        return 'bg-yellow-500 text-white';
      case 'processing':
        return 'bg-[#024AFE] text-white';
      case 'completed':
        return 'bg-green-500 text-white';
      case 'refunded':
        return 'bg-red-500 text-white';
      case 'cancelled':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
    };

  export const getStatusText = (status?: string) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'processing':
        return 'Processing';
      case 'completed': 
        return 'Completed';
      case 'refunded':
        return 'Refunded';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };