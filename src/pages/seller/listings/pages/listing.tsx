import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search, Filter, Plus } from 'lucide-react'

export const SellerListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    // TODO: Fetch listings with pagination, search, and filters
    const fetchListings = async () => {
      try {
        // const response = await api.getListings({ 
        //   page: currentPage, 
        //   search: searchTerm,
        //   category: categoryFilter 
        // });
        // setListings(response.data.listings);
        // setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching listings:', error);
        setLoading(false);
      }
    };

    fetchListings();
  }, [currentPage, searchTerm, categoryFilter]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Listings</h1>
        <Link
          to="/seller/listings/create"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
        >
          <Plus size={20} />
          Create Listing
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-4 border-b">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search listings..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="home">Home & Garden</option>
              <option value="beauty">Beauty</option>
              <option value="sports">Sports</option>
            </select>
            <button className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-50">
              <Filter size={20} />
              More Filters
            </button>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center">Loading...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {listings.map((listing: any) => (
                <div key={listing.id} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="object-cover w-full h-48"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{listing.title}</h3>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{listing.description}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-lg font-bold text-gray-900">${listing.price}</span>
                        <span className="text-sm text-gray-500 ml-2">/ {listing.unit}</span>
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        listing.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {listing.status}
                      </span>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        {listing.views} views • {listing.favorites} favorites
                      </div>
                      <Link
                        to={`/seller/listings/${listing.id}`}
                        className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 py-4 border-t">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-700">
                  Showing page {currentPage} of {totalPages}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default SellerListingsPage
