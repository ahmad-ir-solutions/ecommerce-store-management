import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    createdAt: '',
    updatedAt: '',
  });

  useEffect(() => {
    // TODO: Fetch product details using productId
    // This is a placeholder for the actual API call
    const fetchProductDetails = async () => {
      // const response = await api.getProductDetails(productId);
      // setProduct(response.data);
    };
    fetchProductDetails();
  }, [productId]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Details</h1>
        <Link
          to={`/seller/products/edit/${productId}`}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Edit Product
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Name</label>
                <p className="mt-1">{product.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Description</label>
                <p className="mt-1">{product.description}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Price</label>
                <p className="mt-1">${product.price}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Stock</label>
                <p className="mt-1">{product.stock} units</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Additional Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Created At</label>
                <p className="mt-1">{product.createdAt}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Last Updated</label>
                <p className="mt-1">{product.updatedAt}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage; 