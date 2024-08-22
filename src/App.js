// src/App.jsx
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './Components/Page/Home.jsx';
import About from './Components/Component/About.jsx';
import Contactus from './Components/Component/Contactus.jsx';
import Front from './Components/Component/Front.jsx';
import Login from './Components/Page/Login.jsx';
import Signin from './Components/Page/Signin.jsx';
import 'react-toastify/dist/ReactToastify.css';
import CartPage from './Components/Component/CartPage.jsx';
import { CartProvider } from './Components/Context/CartContext.jsx';
import ProductDetails from './Components/Component/ProductDetails.jsx';
import FilteredProducts from './Components/Component/FilteredProducts.jsx';
import Checkout from './Components/Component/Checkout.jsx';
import SearchResults from './Components/Component/SearchResults.jsx';
import Homes from './Components/ADMIN/Homes.jsx';
import Dashboard from './Components/ADMIN/Dashboard.jsx';
import Allusers from './Components/ADMIN/Allusers.jsx';
import Addproducts from './Components/ADMIN/Addproducts.jsx';
import Editproducts from './Components/ADMIN/Editproducts.jsx';
import Editpage from './Components/ADMIN/Editpage.jsx';
import UserDetails from './Components/ADMIN/UserDetails.jsx';
import OrderDetails from './Components/ADMIN/OrderDetails.jsx';
import Nav from './Components/Component/Nav.jsx';
import Footer from './Components/Component/Footer.jsx';


function App() {
 const location =useLocation()
 const shouldhiddenNavbar=location.pathname==='/login' || location.pathname==='/sign' || location.pathname.startsWith('/admin');
  return (
    
    <CartProvider>
      <div className="App">
        {!shouldhiddenNavbar && <Nav/>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/front" element={<Front />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign" element={<Signin />} />
          <Route path="/products" element={<FilteredProducts />} />
          <Route path="/cart1" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/:category/:id" element={<ProductDetails />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/admin/*" element={<Homes />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="all-users" element={<Allusers />} />
            <Route path="all-users/:id" element={<UserDetails />} />
            <Route path="add-product" element={<Addproducts />} />
            <Route path="edit-product" element={<Editproducts />} />
            <Route path="edit-product/:id" element={<Editpage />} />
            <Route path='orders' element={<OrderDetails/>}/>
          </Route>
        </Routes>
        {!shouldhiddenNavbar && <Footer/>}
      </div>
    </CartProvider>
  );
}

export default App;
