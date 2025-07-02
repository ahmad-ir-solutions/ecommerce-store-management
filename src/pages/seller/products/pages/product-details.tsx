import { useParams, Link } from 'react-router-dom';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  console.log(productId, "productId");

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
    </div>
  );
};

export default ProductDetailsPage; 