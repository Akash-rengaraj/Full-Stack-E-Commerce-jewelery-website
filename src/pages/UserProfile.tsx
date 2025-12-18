import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import { User, Package, LogOut } from 'lucide-react';

const UserProfile = () => {
    const { user, logout, login, token } = useAuth();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user?.name || '');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleSave = async () => {
        if (!user || !token) return;
        setIsLoading(true);
        try {
            // In a real app, you would call an API to update the user here.
            // For now, we'll simulate an update and update the local context.
            // const updatedUser = await updateProfile({ name });

            // Simulating API call
            await new Promise(resolve => setTimeout(resolve, 500));

            const updatedUser = { ...user, name };
            login(updatedUser, token);
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-cream">
                <p>Please login to view your profile.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-navy px-6 py-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="h-20 w-20 rounded-full bg-gold flex items-center justify-center text-navy text-3xl font-bold">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="ml-6">
                                    <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                                    <p className="text-gold">{user.phoneNumber}</p>
                                </div>
                            </div>
                            {!isEditing && (
                                <Button
                                    variant="secondary"
                                    onClick={() => setIsEditing(true)}
                                    className="text-sm"
                                >
                                    Edit Profile
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Account Details */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <div className="flex items-center mb-4 text-navy">
                                    <User className="mr-2" />
                                    <h2 className="text-lg font-bold">Account Details</h2>
                                </div>
                                <div className="space-y-4 text-gray-600">
                                    {isEditing ? (
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-navy"
                                                />
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="primary"
                                                    onClick={handleSave}
                                                    disabled={isLoading}
                                                    className="text-sm"
                                                >
                                                    {isLoading ? 'Saving...' : 'Save Changes'}
                                                </Button>
                                                <Button
                                                    variant="secondary"
                                                    onClick={() => {
                                                        setIsEditing(false);
                                                        setName(user.name);
                                                    }}
                                                    disabled={isLoading}
                                                    className="text-sm bg-gray-200 text-gray-800 hover:bg-gray-300"
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <p><span className="font-medium">Name:</span> {user.name}</p>
                                            <p><span className="font-medium">Phone:</span> {user.phoneNumber}</p>
                                            <p><span className="font-medium">Role:</span> {user.isAdmin ? 'Admin' : 'Customer'}</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Order History (Placeholder) */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <div className="flex items-center mb-4 text-navy">
                                    <Package className="mr-2" />
                                    <h2 className="text-lg font-bold">Recent Orders</h2>
                                </div>
                                <p className="text-gray-500 italic">No recent orders found.</p>
                                <Button to="/shop" variant="secondary" className="mt-4 text-sm">
                                    Start Shopping
                                </Button>
                            </div>
                        </div>

                        <div className="mt-8 border-t border-gray-100 pt-6 flex justify-end">
                            <button
                                onClick={handleLogout}
                                className="flex items-center text-red-500 hover:text-red-700 font-medium transition-colors"
                            >
                                <LogOut className="mr-2" size={20} />
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
