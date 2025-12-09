import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />
            <Header />
            <main className="md:ml-64 pt-16 min-h-screen p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
