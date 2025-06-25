import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import Loader from '../components/Loader';
import Error from '../components/Error'

import { fetchProducts } from '../services/index';

export default function Home() {

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) return <Loader/>;
  if (error) return <Error/>;
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 p-6">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Tienda</h1>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
        <div className="md:col-span-4">
        <Cart />
      </div>
      </div>
    </div>
  );
}
