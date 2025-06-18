import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const EditProductPage = () => {
  const { productId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
  });

  useEffect(() => {
    // TODO: Fetch product data using productId
    // This is a placeholder for the actual API call
    const fetchProduct = async () => {
      // const response = await api.getProduct(productId);
      // setFormData(response.data);
    };
    fetchProduct();
  }, [productId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement product update logic
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Product Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            className="w-full p-2 border rounded"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Price</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Stock</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage; 