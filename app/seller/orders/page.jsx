
'use client'; 
import React, { useEffect, useState } from "react"; 
import { assets } from "@/assets/assets"; 
import Image from "next/image"; 
import { useAppContext } from "@/context/AppContext"; 
import Footer from "@/components/seller/Footer"; 
import Loading from "@/components/Loading"; 
import axios from "axios"; 
import toast from "react-hot-toast"; 
 
const Orders = () => { 
 
    const { currency, getToken, user } = useAppContext(); 
 
    const [orders, setOrders] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(false); 
 
    const fetchSellerOrders = async (signal) => { 
        try { 
            setLoading(true); 
            setError(false); 
 
            const token = await getToken(); 
 
            if (signal?.aborted) { 
                return; 
            } 
 
            const { data } = await axios.get('/api/orders/sellerOrders', { 
                headers: { 
                    Authorization: `Bearer ${token}`, 
                }, 
                signal, 
            }); 
 
            if (signal?.aborted) { 
                return; 
            } 
 
            if (data.success) { 
                setOrders(data.orders || []); 
                setLoading(false); 
            } else { 
                setError(true); 
                setLoading(false); 
                toast.error(data.message); 
            } 
        } catch (error) { 
            if (axios.isCancel(error) || error.name === 'CanceledError') { 
                return; 
            } 
 
            setError(true); 
            setLoading(false); 
            toast.error(error.message); 
        } 
    }; 
 
    useEffect(() => { 
        if (!user) { 
            setLoading(false); 
            setOrders([]); 
            return; 
        } 
 
        const controller = new AbortController(); 
 
        fetchSellerOrders(controller.signal); 
 
        return () => { 
            controller.abort(); 
        }; 
    }, [user]); 
 
    const handleRetry = () => { 
        if (loading || !user) { 
            return; 
        } 
 
        fetchSellerOrders(); 
    }; 
 
    return ( 
        <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm"> 
            {loading ? <Loading /> : <div className="md:p-10 p-4 space-y-5"> 
                <h2 className="text-lg font-medium text-black">Orders</h2> 
 
                {!user ? ( 
                    <div className="max-w-4xl rounded-md border border-black/10 p-10 text-center"> 
                        <h3 className="text-base font-medium text-black"> 
                            Unable to load orders 
                        </h3> 
                        <p className="text-gray-500 mt-2"> 
                            Please sign in to view seller orders. 
                        </p> 
                    </div> 
                ) : error ? ( 
                    <div className="max-w-4xl rounded-md border border-black/10 p-10 text-center"> 
                        <h3 className="text-base font-medium text-black"> 
                            Failed to load orders 
                        </h3> 
                        <p className="text-gray-500 mt-2"> 
                            Something went wrong while loading the orders. 
                        </p> 
                        <button 
                            onClick={handleRetry} 
                            disabled={loading} 
                            className="mt-5 px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed" 
                        > 
                            {loading ? "Retrying..." : "Retry"} 
                        </button> 
                    </div> 
                ) : orders.length === 0 ? ( 
                    <div className="max-w-4xl rounded-md border border-black/10 p-10 text-center"> 
                        <Image 
                            className="w-16 h-16 mx-auto mb-4 opacity-60" 
                            src={assets.box_icon} 
                            alt="box_icon" 
                        /> 
                        <h3 className="text-base font-medium text-black"> 
                            No orders yet 
                        </h3> 
                        <p className="text-gray-500 mt-2"> 
                            There are currently no orders to display. 
                        </p> 
                    </div> 
                ) : ( 
                    <div className="max-w-4xl rounded-md"> 
                        {orders.map((order) => ( 
                            <div 
                                key={order._id} 
                                className="flex flex-col md:flex-row gap-5 justify-between p-5 border-t border-black/10" 
                            > 
                                <div className="flex-1 flex gap-5 max-w-80"> 
                                    <Image 
                                        className="max-w-16 max-h-16 object-cover" 
                                        src={assets.box_icon} 
                                        alt="box_icon" 
                                    /> 
                                    <p className="flex flex-col gap-3"> 
                                        <span className="font-medium text-black"> 
                                            {order.items.map((item) => (item.product?.name || "Product") + (item.size ? ` (Size ${item.size})` : "") + ` x ${item.quantity}`).join(", ")} 
                                        </span> 
                                        <span className="text-gray-500">Items : {order.items.length}</span> 
                                    </p> 
                                </div> 
 
                                <div> 
                                    <p className="text-gray-500"> 
                                        <span className="font-medium text-black"> 
                                            {order.address?.fullName || "Address unavailable"} 
                                        </span> 
                                        <br /> 
                                        <span>{order.address?.area || ""}</span> 
                                        <br /> 
                                        <span> 
                                            {`${order.address?.city || ""}, ${order.address?.state || ""}`} 
                                        </span> 
                                        <br /> 
                                        <span>{order.address?.phoneNumber || ""}</span> 
                                    </p> 
                                </div> 
 
                                <p className="font-medium my-auto text-black"> 
                                    {currency}{order.amount} 
                                </p> 
 
                                <div> 
                                    <p className="flex flex-col text-gray-500"> 
                                        <span>Method : {order.paymentMethod || "Not recorded"}</span> 
                                        <span> 
                                            Date : {new Date(order.date).toLocaleDateString()} 
                                        </span> 
                                        <span>Payment : {order.paymentStatus || "Not recorded"}</span> 
                                    </p> 
                                </div> 
                            </div> 
                        ))} 
                    </div> 
                )} 
            </div>} 
 
            <Footer /> 
        </div> 
    ); 
}; 
 
export default Orders; 
