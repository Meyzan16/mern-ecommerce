import './App.css';
import {Routes,Route} from 'react-router-dom';
import Homepage from './pages/Homepage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Pagenotfound  from './pages/Pagenotfound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';

import ForgetPassword from './pages/Auth/ForgetPassword';

// user
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private'
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';

//admin
import AdminDashboard from './pages/Admin/Dashboard';
import AdminRoute from './components/Routes/AdminRoute';
import NewCategory from './pages/Admin/Category/New';

import NewProducts from './pages/Admin/Products/New';
import EditProducts from './pages/Admin/Products/Edit';
import Products from './pages/Admin/Products/Index';
import AllUsers from './pages/Admin/AllUsers';
import ProductDetail from './pages/ProductDetail';
import CategoryProducts from './pages/CategoryProducts';
import Cart from './pages/Cart';

function App() {
  return (
    <>
     <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/product/:slug' element={<ProductDetail />} />
        <Route path='/category/:slug' element={<CategoryProducts />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/privacy-policy' element={<Policy />} />
        <Route path='*' element={<Pagenotfound />} />

        {/* user */}
        <Route path='/dashboard' element={<PrivateRoute />}>
            <Route path='user' element={<Dashboard />} />
            <Route path='user/profile' element={<Profile />} />
            <Route path='user/orders' element={<Orders />} />
        </Route>

        {/* admin */}
        <Route path='/dashboard' element={<AdminRoute />}>
            <Route path='admin' element={<AdminDashboard />} />
            <Route path='admin/create-category' element={<NewCategory />} />

            <Route path='admin/create-products' element={<NewProducts />} />
            <Route path='admin/product/:slug' element={<EditProducts />} />

            <Route path='admin/products' element={<Products />} />
            <Route path='admin/users' element={<AllUsers />} />
        </Route>


        {/* auth */}
        <Route path='/register' element={<Register />} />
        <Route path='/forget-password' element={<ForgetPassword />} />
        <Route path='/login' element={<Login />} />
     </Routes>
    </>
  );
}

export default App;
