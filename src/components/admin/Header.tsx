import { Search, Bell, User } from 'lucide-react';

const Header = () => {
    return (
        <header className="bg-white h-16 fixed top-0 right-0 left-0 md:left-64 z-40 shadow-sm flex items-center justify-between px-6">
            <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2 w-96">
                <Search size={18} className="text-gray-400 mr-2" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent border-none outline-none text-sm w-full text-navy placeholder-gray-400"
                />
            </div>

            <div className="flex items-center gap-6">
                <button className="relative text-gray-500 hover:text-navy transition-colors">
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-navy">Admin User</p>
                        <p className="text-xs text-gray-500">Super Admin</p>
                    </div>
                    <div className="w-10 h-10 bg-navy rounded-full flex items-center justify-center text-gold">
                        <User size={20} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
