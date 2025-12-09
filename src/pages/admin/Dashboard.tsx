import { DollarSign, ShoppingBag, Package, Users, TrendingUp } from 'lucide-react';

const Dashboard = () => {
    const stats = [
        { title: 'Total Sales', value: '₹1,24,500', icon: <DollarSign size={24} />, color: 'bg-green-100 text-green-600', trend: '+12.5%' },
        { title: 'Total Orders', value: '156', icon: <ShoppingBag size={24} />, color: 'bg-blue-100 text-blue-600', trend: '+8.2%' },
        { title: 'Total Products', value: '48', icon: <Package size={24} />, color: 'bg-orange-100 text-orange-600', trend: '+2.4%' },
        { title: 'Total Customers', value: '1,205', icon: <Users size={24} />, color: 'bg-purple-100 text-purple-600', trend: '+5.1%' },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-navy">Dashboard</h1>
                <div className="text-sm text-gray-500">Last updated: Today, 12:00 PM</div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-lg ${stat.color}`}>
                                {stat.icon}
                            </div>
                            <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                <TrendingUp size={12} className="mr-1" />
                                {stat.trend}
                            </span>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
                        <p className="text-2xl font-bold text-navy mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-navy">Recent Orders</h2>
                    <button className="text-sm text-gold font-bold hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                <th className="px-6 py-4 font-medium">Order ID</th>
                                <th className="px-6 py-4 font-medium">Customer</th>
                                <th className="px-6 py-4 font-medium">Date</th>
                                <th className="px-6 py-4 font-medium">Amount</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {[
                                { id: '#ORD-7829', customer: 'Priya Sharma', date: 'Oct 24, 2023', amount: '₹12,450', status: 'Delivered' },
                                { id: '#ORD-7828', customer: 'Rahul Verma', date: 'Oct 24, 2023', amount: '₹8,999', status: 'Processing' },
                                { id: '#ORD-7827', customer: 'Anjali Gupta', date: 'Oct 23, 2023', amount: '₹45,000', status: 'Shipped' },
                                { id: '#ORD-7826', customer: 'Meera Patel', date: 'Oct 23, 2023', amount: '₹2,500', status: 'Pending' },
                                { id: '#ORD-7825', customer: 'Suresh Kumar', date: 'Oct 22, 2023', amount: '₹18,750', status: 'Delivered' },
                            ].map((order, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-navy">{order.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{order.customer}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-navy">{order.amount}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                                                order.status === 'Processing' ? 'bg-blue-100 text-blue-600' :
                                                    order.status === 'Shipped' ? 'bg-purple-100 text-purple-600' :
                                                        'bg-yellow-100 text-yellow-600'
                                            }`}>
                                            {order.status}
                                        </span>
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

export default Dashboard;
