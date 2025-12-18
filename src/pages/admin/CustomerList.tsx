import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getCustomers, deleteCustomer } from '../../services/customerService';

const CustomerList = () => {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState<any[]>([]);

    const fetchCustomers = async () => {
        try {
            const data = await getCustomers();
            setCustomers(data);
        } catch (error) {
            console.error('Failed to fetch customers:', error);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            try {
                await deleteCustomer(id);
                fetchCustomers();
            } catch (error) {
                console.error('Failed to delete customer:', error);
            }
        }
    };

    const [searchTerm, setSearchTerm] = useState('');

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm)
    );

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-navy">Customers</h1>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <input
                    type="text"
                    placeholder="Search customers by name, email or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                <th className="px-6 py-4 font-medium">Name</th>
                                <th className="px-6 py-4 font-medium">Phone</th>
                                <th className="px-6 py-4 font-medium">Password (Hash)</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredCustomers.length > 0 ? (
                                filteredCustomers.map((customer, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-navy">{customer.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{customer.phone}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500 font-mono truncate max-w-[150px]" title={customer.password}>
                                            {customer.password ? customer.password.substring(0, 10) + '...' : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${customer.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                                                {customer.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => navigate(`/admin/customers/edit/${customer.id}`)}
                                                className="text-gold hover:text-navy text-sm font-medium mr-3"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(customer.id)}
                                                className="text-red-500 hover:text-red-700 text-sm font-medium"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                                        No customers found matching "{searchTerm}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CustomerList;
