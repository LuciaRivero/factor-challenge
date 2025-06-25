import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react"
import { formatPrice } from "../utils";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();


  return (
    <div className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-lg">
      <div className="p-6">
        <div className="aspect-square bg-white/20 rounded-lg mb-4 flex items-center justify-center">
          <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center">
            <ShoppingCart className="w-8 h-8 text-white/70" />
          </div>
        </div>
      
      <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
      <p className="text-2xl font-bold text-white/90 mb-4">{formatPrice(product.price)}</p>
      <button
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl"
        onClick={() => addToCart(product)}
      >
        Agregar
      </button>
      </div>
    </div>
  );
}
