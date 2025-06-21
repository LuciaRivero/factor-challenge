import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, User } from "lucide-react"

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500">
      <div className="w-full max-w-md">
        <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="flex justify-center mb-8">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <User className="w-10 h-10 text-white/70" />
              </div>
          </div>
          <div className="space-y-2 mb-12">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
              
              <input
                type="email"
                placeholder="Usuario"
                className="w-full pl-12 bg-transparent border-0 border-b-2 border-white/30 rounded-none text-white placeholder:text-white/60 focus:border-white/60 focus:ring-0 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2 mb-12">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full pl-12 bg-transparent border-0 border-b-2 border-white/30 rounded-none text-white placeholder:text-white/60 focus:border-white/60 focus:ring-0 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            onClick={() => login(email, password)}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl"
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
    
  );
}
