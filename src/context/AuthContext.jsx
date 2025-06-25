import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchClients } from '../services/index'

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (name, password) => {
  try {
    const res = await fetchClients();
    const clients = res;
    const client = clients.find(
      (client) => client.name === name && client.password === password
    );

    if (client) {
      setUser(client);
      localStorage.setItem("user", JSON.stringify(client));
      navigate("/");
    } else {
      alert("Credenciales inválidas");
    }
  } catch (error) {
    console.error("Error en login:", error);
    alert("Ocurrió un error al intentar iniciar sesión");
  }
};

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
