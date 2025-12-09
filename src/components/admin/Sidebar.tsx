import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Users, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path ? 'bg-gold/20 text-gold border-r-4 border-gold' : 'text-gray-400 hover:bg-white/5 hover:text-white';
    };

    const navItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/admin' },
        { icon: <Package size={20} />, label: 'Products', path: '/admin/products' },
        { icon: <ShoppingBag size={20} />, label: 'Orders', path: '/admin/orders' },
        { icon: <Users size={20} />, label: 'Customers', path: '/admin/customers' },
        { icon: <Settings size={20} />, label: 'Settings', path: '/admin/settings' },
    ];

    return (
        <aside className="w-64 bg-navy h-screen fixed left-0 top-0 flex flex-col z-50 hidden md:flex">
            <div className="p-6 border-b border-white/10">
                <h1 className="text-gold font-heading font-bold text-xl tracking-widest uppercase">
                    Sanjana <span className="text-white text-sm block tracking-normal normal-case opacity-70">Admin Panel</span>
                </h1>
            </div>

            <nav className="flex-grow py-6">
                <ul className="space-y-1">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                className={`flex items-center gap-3 px-6 py-3 transition-all duration-200 ${isActive(item.path)}`}
                            >
                                {item.icon}
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="p-6 border-t border-white/10">
                <button className="flex items-center gap-3 text-gray-400 hover:text-red-400 transition-colors w-full">
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
