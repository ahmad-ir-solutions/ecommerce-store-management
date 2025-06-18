import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Plus, Settings } from 'lucide-react';

export const SellerShopsPage = () => {
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        // TODO: Fetch shops with pagination and search
        const fetchShops = async () => {
            try {
                // const response = await api.getShops({ 
                //   page: currentPage, 
                //   search: searchTerm 
                // });
                // setShops(response.data.shops);
                // setTotalPages(response.data.totalPages);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching shops:', error);
                setLoading(false);
            }
        };

        fetchShops();
    }, [currentPage, searchTerm]);

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Shops</h1>
                <Link
                    to="/seller/shops/create"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
                >
                    <Plus size={20} />
                    Create Shop
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
                                    placeholder="Search shops..."
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <button className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-50">
                            <Filter size={20} />
                            Filters
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="p-8 text-center">Loading...</div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                            {shops.map((shop: any) => (
                                <div key={shop.id} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    <div className="aspect-w-16 aspect-h-9">
                                        <img
                                            src={shop.banner}
                                            alt={shop.name}
                                            className="object-cover w-full h-48"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center gap-4 mb-4">
                                            <img
                                                src={shop.logo}
                                                alt={`${shop.name} logo`}
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-900">{shop.name}</h3>
                                                <p className="text-sm text-gray-500">{shop.category}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{shop.description}</p>
                                        <div className="flex justify-between items-center">
                                            <div className="text-sm text-gray-500">
                                                {shop.products} products • {shop.followers} followers
                                            </div>
                                            <div className="flex gap-2">
                                                <Link
                                                    to={`/seller/shops/${shop.id}`}
                                                    className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    to={`/seller/shops/settings/${shop.id}`}
                                                    className="text-gray-600 hover:text-gray-900"
                                                >
                                                    <Settings size={18} />
                                                </Link>
                                            </div>
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
    );
};

export default SellerShopsPage;
