import { useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Header({ textHead, showBack }) {
  const navigate = useNavigate();
  const { setCart } = useCart();

  const logout = () => {
    
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    setCart([]);
    navigate("/login");
    
  };
  return (
    <header className="sticky top-0 z-50 mb-8 w-full backdrop-blur-md bg-white/10 border-b border-white/20 rounded-xl">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between text-white">
        {showBack && (
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 hover:bg-white/10 border border-white/20 rounded-full px-4 py-2 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="hidden sm:inline">Volver</span>
        </button>)}
        <div className="text-white font-semibold text-lg">{textHead}</div>
        <button
          onClick={() => logout()}
          className="flex items-center gap-2 hover:bg-white/10 border border-white/20 rounded-full px-4 py-2 transition-colors duration-200"
        >
          <LogOut className="h-5 w-5" />
          <span className="hidden sm:inline">Cerrar sesión</span>
        </button>
      </div>
    </header>
  );
}
