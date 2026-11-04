
'use client'
import React from "react";
import { parseCartKey } from "@/lib/sizing.mjs"; 
import { assets } from "@/assets/assets"; 
import OrderSummary from "@/components/OrderSummary"; 
import Image from "next/image"; 
import Navbar from "@/components/Navbar"; 
import { useAppContext } from "@/context/AppContext"; 
 
const Cart = () => { 
 
  const { products, router, cartItems, addToCart, updateCartQuantity, getCartCount, currency } = useAppContext(); 
 
  return ( 
    <> 
      <Navbar /> 
      <div className="flex flex-col md:flex-row gap-10 px-6 md:px-16 lg:px-32 pt-14 mb-20"> 
        <div className="flex-1"> 
          <div className="flex items-center justify-between mb-8 border-b border-gray-500/30 pb-6"> 
            <p className="text-2xl md:text-3xl text-gray-500"> 
              Your <span className="font-medium text-black">Cart</span> 
            </p> 
            <p className="text-lg md:text-xl text-gray-500/80">{getCartCount()} Items</p> 
          </div> 
          <div className="overflow-x-auto"> 
            <table className="min-w-full table-auto"> 
              <thead className="text-left"> 
                <tr> 
                  <th className="text-nowrap pb-6 md:px-4 px-1 text-gray-600 font-medium"> 
                    Product Details 
                  </th> 
                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium"> 
                    Price 
                  </th> 
                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium"> 
                    Quantity 
                  </th> 
                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium"> 
                    Subtotal 
                  </th> 
                </tr> 
              </thead> 
              <tbody> 
                {Object.keys(cartItems).map((itemId) => { 
                  const { productId, size } = parseCartKey(itemId);
                  const product = products.find(product => product._id === productId); 
 
                  if (!product || cartItems[itemId] <= 0) return null; 
 
                  return ( 
                    <tr key={itemId}> 
                      <td className="flex items-center gap-4 py-4 md:px-4 px-1"> 
                        <div> 
                          <div className="rounded-lg overflow-hidden bg-gray-500/10 p-2"> 
                            <Image 
                              src={product.image[0]} 
                              alt={product.name} 
                              className="w-16 h-auto object-cover mix-blend-multiply" 
                              width={1280} 
                              height={720} 
                            /> 
                          </div> 
                          <button 
                            className="md:hidden text-xs text-black mt-1" 
                            onClick={() => updateCartQuantity(itemId, 0)} 
                          > 
                            Remove 
                          </button> 
                        </div> 
                        <div className="text-sm hidden md:block"> 
                          <p className="text-gray-800">{product.name}</p>
                          {size && <p className="text-xs font-medium">Size: {size}</p>} 
                          <button 
                            className="text-xs text-black mt-1" 
                            onClick={() => updateCartQuantity(product._id, 0)} 
                          > 
                            Remove 
                          </button> 
                        </div> 
                      </td> 
                      <td className="py-4 md:px-4 px-1 text-gray-600">{currency}{product.offerPrice}</td> 
                      <td className="py-4 md:px-4 px-1"> 
                        <div className="flex items-center md:gap-2 gap-1"> 
                          <button onClick={() => updateCartQuantity(itemId, cartItems[itemId] - 1)}> 
                            <Image 
                              src={assets.decrease_arrow} 
                              alt="decrease_arrow" 
                              className="w-4 h-4" 
                            /> 
                          </button> 
                          <input onChange={e => updateCartQuantity(itemId, Number(e.target.value))} type="number" value={cartItems[itemId]} className="w-8 border text-center appearance-none"></input> 
                          <button onClick={() => addToCart(product._id, size)}> 
                            <Image 
                              src={assets.increase_arrow} 
                              alt="increase_arrow" 
                              className="w-4 h-4" 
                            /> 
                          </button> 
                        </div> 
                      </td> 
                      <td className="py-4 md:px-4 px-1 text-gray-600">{currency}{(product.offerPrice * cartItems[itemId]).toFixed(2)}</td> 
                    </tr> 
                  ); 
                })} 
              </tbody> 
            </table> 
          </div> 
          <button onClick={()=> router.push('/all-products')} className="group flex items-center mt-6 gap-2 text-black"> 
            <Image 
              className="group-hover:-translate-x-1 transition" 
              src={assets.arrow_right_icon_colored} 
              alt="arrow_right_icon_colored" 
            /> 
            Continue Shopping 
          </button> 
        </div> 
        <OrderSummary /> 
      </div> 
    </> 
  ); 
}; 
 
export default Cart; 