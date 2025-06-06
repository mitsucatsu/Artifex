import "./App.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from './screens/ProductScreen';
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AddProductScreen from './screens/AddProductScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserListScreen from './screens/UserListScreen';
import EditUserScreen from './screens/EditUserScreen';
import ProductListScreen from './screens/ProductListScreen';
import EditProductScreen from './screens/EditProductScreen';
import OrderListScreen from './screens/OrderListScreen';
import UpdateProfileScreen from './screens/UpdateProfileScreen';
import TermsAndConditionsScreen from './screens/TermsAndConditionsScreen';

function App() {
  return (
<Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/products/:id" element={<ProductScreen />} />
          <Route path="/Login" element={<LoginScreen />} />
          <Route path="/Register" element={<RegisterScreen />} />
          <Route path="/AddProduct" element={<AddProductScreen />} />
          <Route path="/Profile" element={<ProfileScreen />} />
          <Route path="/Cart/:id?" element={<CartScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path='/placeorder' element={<PlaceOrderScreen />} />
          <Route path='/order/:id' element={<OrderScreen />} />
          <Route path="/Userlist" element={<UserListScreen />} exact />
          <Route path="/EditUser/:_id" element={<EditUserScreen />} exact />
          <Route path="/ProductList" element={<ProductListScreen/>} exact/>
          <Route path="/EditProduct/:id" element={<EditProductScreen/>}/>
          <Route path="/Orderlist" element={<OrderListScreen/>}/>
          <Route path="/UpdateProfile" element={<UpdateProfileScreen/>}/>
          <Route path="/TermsAndConditions" element={<TermsAndConditionsScreen/>} />

          </Routes>
        </Container>
      </main>

      <Footer />
      </Router>
  );
}

export default App;