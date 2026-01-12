import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Shop from "./pages/shop";
import About from "./pages/about";
import Contact from "./pages/contact";
import Footer from "./component/footer";
import HomePageWithSignup from "./pages/signup"
import Profile from "./pages/profile";
import AddProduct from "./pages/adminadd";
import GetProducts from "./pages/adminget.jsx";
import Updelproduct from "./pages/updelproduct.jsx";
import NotFound from "./pages/not.jsx";
import Cart from "./pages/cart.jsx";
import OrderSummary from "./pages/ordersummary.jsx";
export default function App() {
  function Layout({ children }) {
    return (
      <div className="flex flex-col min-h-screen">
        {children}
        <Footer />
      </div>
    );
  }
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePageWithSignup />}></Route>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/getproduct" element={<GetProducts />} />
            <Route path="/updelproduct/:id" element={<Updelproduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/ordersummary" element={<OrderSummary />} />
            <Route path="/*" element={<NotFound />} />

          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}
