import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { formatPrice, getPartialPrice } from "../utils";


export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity } = useCart();


  return (
    <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-4 md:p-8 shadow-2xl border border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <ShoppingCart className="w-8 h-8 text-white" />
        <h2 className="text-2xl md:text-3xl font-bold text-white">Carrito</h2>
        {cart.length > 0 && (
          <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {cart.reduce((total, item) => total + item.quantity, 0)}
          </span>
        )}
      </div>

      {cart.length === 0 ? (
        <p className="text-white/70 text-lg text-center py-8">No hay productos</p>
        ) : (
      <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="backdrop-blur-sm bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-lg">{item.name}</h4>
                  <p className="text-white/70">{formatPrice(item.price)} c/u</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full md:w-auto">
                  <div className="flex items-center gap-2 bg-white/10 rounded-lg p-1">
                    <button
                      size="sm"
                      variant="ghost"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-8 w-8 p-0 text-white hover:bg-white/20 flex items-center justify-center"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-white font-semibold min-w-[2rem] text-center">{item.quantity}</span>
                    <button
                      size="sm"
                      variant="ghost"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-8 w-8 p-0 text-white hover:bg-white/20 flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-white font-bold text-lg min-w-[6rem] text-center md:text-right">
                    {formatPrice(item.price * item.quantity)}
                  </p>

                  <button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeFromCart(item.id)}
                    className="h-8 w-8 p-0 flex items-center justify-center text-red-950 hover:text-red-200 hover:bg-red-500 hover:rounded-full"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="border-t border-white/20 pt-4 mt-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2 sm:gap-0">
              <span className="text-white text-xl font-semibold">Subtotal:</span>
              <span className="text-white text-2xl font-bold">{formatPrice(getPartialPrice(cart))}</span>
            </div>
            <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl"
            onClick={() => navigate("/checkout")}>
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  )}
