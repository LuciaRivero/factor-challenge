import { useState, useEffect } from "react";
import { ShoppingCart, CreditCard, Tag,} from "lucide-react"
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import {fetchPromotionalDate} from '../services/index'
import { formatPrice, getPartialPrice, discount25, checkApplicableDiscount } from "../utils";
import Loader from '../components/Loader';
import Error from '../components/Error'

import PaymentOption from "../components/PaymentOption";

export default function Checkout() {

const [paymentMethod, setPaymentMethod] = useState("debit-card");
const [datePromotional, setDatePromotional] = useState([]);
const [error, setError] = useState(null);
const [loading, setLoading] = useState(true);

const { cart } = useCart();
const { user } = useAuth();

 

 useEffect(() => {
     const getPromotionalDate = async () => {
       try {
         const data = await fetchPromotionalDate();
         setDatePromotional(data);
       } catch (err) {
         setError(err);
       } finally {
         setLoading(false);
       }
     };
 
     getPromotionalDate();
   }, []);

   if (loading) return <Loader/>;
   if (error) return <Error/>;

   let applypromotion = cart.length >= 4 && cart.length <=10 ? 
   cart.length >= 10 ? checkApplicableDiscount(cart, user, datePromotional) : discount25(cart) 
   : false;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 p-6">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <div className="space-y-6">
                <div className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-lg p-6">
                    <div className="text-white flex items-center gap-2">
                        <ShoppingCart className="w-8 h-8 text-white" /> 
                        <h2 className="text-2xl md:text-3xl font-bold text-white">Resumen del Pedido</h2>
                    </div>
                    <div className="space-y-4 mt-8">
                        {cart.map((item) => (
                            <div key={item.id} className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                                <div>
                                <h4 className="text-white font-medium">{item.name}</h4>
                                <p className="text-white/60 text-sm">Cantidad: {item.quantity}</p>
                                </div>
                                <p className="text-white font-semibold">{formatPrice(item.price * item.quantity)}</p>
                            </div>
                            ))}
                    </div> 
                </div>
                {applypromotion ? 
                <div className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-lg p-6">
                    <div className="text-white flex items-center justify-between gap-2">
                        <div className="text-white flex items-center">
                            <Tag className="w-6 h-6" />
                            <h3 className="text-2xl font-bold text-white">Promociones Aplicadas</h3>
                        </div>
                        
                        <h3 className=" text-green-300">{applypromotion.descType}</h3>
                    </div>
                </div> : null }

                
            </div>
            <div className="space-y-6">
                <div className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-lg p-6">
                    <div className="text-white flex items-center gap-2 mb-8">
                        <CreditCard className="w-8 h-8" />
                        <h2 className="text-2xl md:text-3xl font-bold text-white">Método de Pago</h2>  
                    </div>
                    <div className="space-y-4">
                        <PaymentOption
                            id="debit-card"
                            value="debit-card"
                            label="Tarjeta de Débito"
                            checked={paymentMethod === "debit-card"}
                            onChange={() => setPaymentMethod("debit-card")}
                        />
                        <PaymentOption
                            id="credit-card"
                            value="credit-card"
                            label="Tarjeta de Crédito"
                            checked={paymentMethod === "credit-card"}
                            onChange={() => setPaymentMethod("credit-card")}
                        />
                        <PaymentOption
                            id="mercadopago"
                            value="mercadopago"
                            label="MercadoPago"
                            checked={paymentMethod === "mercadopago"}
                            onChange={() => setPaymentMethod("mercadopago")}
                        />
                        <PaymentOption
                            id="transfer"
                            value="transfer"
                            label="Transferencia Bancaria"
                            checked={paymentMethod === "transfer"}
                            onChange={() => setPaymentMethod("transfer")}
                        />
                    </div>
                </div>
                <div className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-lg">
                    <div className="p-6 space-y-4">
                        {applypromotion ? 
                            <div className="space-y-4">
                                <div className="flex justify-between text-white">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(getPartialPrice(cart))}</span>
                                </div>

                                <div className="flex justify-between text-green-300">
                                    <span>Descuento</span>
                                    <span>-{applypromotion.totalWithDiscount}</span>
                                </div>
                                <div className="h-px w-full bg-white/20" />
                            </div> : null}

                        <div className="flex justify-between text-white text-xl font-bold">
                            <span>Total</span>
                            {applypromotion ? formatPrice(getPartialPrice(cart) - applypromotion.totalWithDiscount) :<span>{formatPrice(getPartialPrice(cart))}</span>}
                        </div>

                        <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg">
                            Finalizar Compra
                        </button>
                    </div>
                </div>
            </div>
        </div>    
    </div>
  );
}
