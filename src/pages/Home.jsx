import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";

import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";



export default function Home() {
 const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;

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
