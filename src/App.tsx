import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Collections from './pages/Collections';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ProductList from './pages/admin/ProductList';
import ProductForm from './pages/admin/ProductForm';
import FeaturedProducts from './pages/admin/FeaturedProducts';
import CategoryList from './pages/admin/CategoryList';
import CategoryForm from './pages/admin/CategoryForm';
import MaterialList from './pages/admin/MaterialList';
import MaterialForm from './pages/admin/MaterialForm';
import OrderList from './pages/admin/OrderList';
import OrderDetails from './pages/admin/OrderDetails';
import CustomerList from './pages/admin/CustomerList';
import CustomerForm from './pages/admin/CustomerForm';
import CTAList from './pages/admin/CTAList';
import Settings from './pages/admin/Settings';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import UserProfile from './pages/UserProfile';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="shop" element={<Gallery />} />
            <Route path="collections" element={<Collections />} />
            <Route path="product/:id" element={<Shop />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<UserProfile />} />
            {/* Add other routes here */}
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductList />} />
            <Route path="products/new" element={<ProductForm />} />
            <Route path="products/edit/:id" element={<ProductForm />} />
            <Route path="featured" element={<FeaturedProducts />} />
            <Route path="categories" element={<CategoryList />} />
            <Route path="categories/new" element={<CategoryForm />} />
            <Route path="categories/edit/:id" element={<CategoryForm />} />
            <Route path="materials" element={<MaterialList />} />
            <Route path="materials/new" element={<MaterialForm />} />
            <Route path="materials/edit/:id" element={<MaterialForm />} />
            <Route path="orders" element={<OrderList />} />
            <Route path="orders/:id" element={<OrderDetails />} />
            <Route path="customers" element={<CustomerList />} />
            <Route path="customers/new" element={<CustomerForm />} />
            <Route path="customers/edit/:id" element={<CustomerForm />} />
            <Route path="cta" element={<CTAList />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
