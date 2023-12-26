import './styles/global.scss';
import Home from './pages/home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Users from './pages/users/Users';
import Products from './pages/products/Products';
import Layout from './components/Layout/Layout';
import Login from './pages/login/Login';
import User from './pages/user/User';
import Product from './pages/product/Product';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<User />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<Product />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
