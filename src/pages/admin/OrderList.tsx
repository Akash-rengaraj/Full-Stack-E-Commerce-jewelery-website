import { useState, useEffect } from 'react';
import { getOrders } from '../../services/orderService';

const OrderList = () => {
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders();
                setOrders(data);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-navy">Orders</h1>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                <th className="px-6 py-4 font-medium">Order ID</th>
                                <th className="px-6 py-4 font-medium">Customer</th>
                                <th className="px-6 py-4 font-medium">Date</th>
                                <th className="px-6 py-4 font-medium">Items</th>
                                <th className="px-6 py-4 font-medium">Total</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.map((order, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-navy">{order.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        <div>{order.customer}</div>
                                        <div className="text-xs text-gray-400">{order.email}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{order.items} items</td>
                                    <td className="px-6 py-4 text-sm font-medium text-navy">₹{order.total.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                                                order.status === 'Processing' ? 'bg-blue-100 text-blue-600' :
                                                    order.status === 'Shipped' ? 'bg-purple-100 text-purple-600' :
                                                        order.status === 'Cancelled' ? 'bg-red-100 text-red-600' :
                                                            'bg-yellow-100 text-yellow-600'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-navy hover:text-gold text-sm font-medium">View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrderList;
