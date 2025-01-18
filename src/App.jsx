import { createHashRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Home from './Pages/Home/Home';
import Layout from './Components/Layout/Layout';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import GuestRoute from './Components/GuestRoute/GuestRoute';
import UserProvider from './context/UserContext/User.context';
import CartProvider from './context/CartContext/Cart.Context';
import Cart from './Pages/Cart/Cart';
import Products from './Pages/Products/Products';
import Category from './Pages/Category/Category';
import Brands from './Pages/Brands/Brands';
import WishList from './Pages/WishList/WishList';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import Checkout from './Pages/Checkout/Checkout';
import Orders from './Pages/Orders/Orders';

function App() {
  const router = createHashRouter([ // Use createHashRouter instead of createBrowserRouter
    {
      path: "/",
      element: <ProtectedRoute><Layout /></ProtectedRoute>,
      children: [
        { index: true, element: <Home /> },
        { path: "cart", element: <Cart /> },
        { path: "products", element: <Products /> },
        { path: "categories", element: <Category /> },
        { path: "brands", element: <Brands /> },
        { path: "wishlist", element: <WishList /> },
        { path: "productDetails/:id", element: <ProductDetails /> },
        { path: "checkout", element: <Checkout /> },
        { path: "allorders", element: <Orders /> },
      ],
    },
    {
      path: "/",
      element: <GuestRoute><Layout /></GuestRoute>,
      children: [
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },
      ],
    },
  ], {
    basename: "/Fresh-Cart", // Add this line to specify the path for GitHub Pages
  });

  return (
    <>
      <UserProvider>
        <CartProvider>
          <RouterProvider router={router}></RouterProvider>
        </CartProvider>
      </UserProvider>
      <Toaster />
    </>
  );
}

export default App;
