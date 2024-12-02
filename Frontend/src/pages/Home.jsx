import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Register/Register";
import Login from "./Register/Login";
import Admin from "./Product for Admin/Admin";
import User from "./Product for User/User";
import ProtectedRoute from "./ProtectedRoute";
import AddProduct from "./Product/AddProduct";
import EditProduct from "./Product/EditProduct";
import ViewProduct from "./Product/ViewProduct";

const Home = () => {
 
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />}/>
          <Route path='/login' element={<Login />}/>
          
          {/* Admin Route */}
        <Route
          path='/admin'
          element={
            <ProtectedRoute role="admin">
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* User Route */}
        <Route
          path='/user'
          element={
            <ProtectedRoute role="user">
              <User />
            </ProtectedRoute>
          }
        />
        <Route path='/add' element={<AddProduct />} />
        <Route path='/edit-product/:id' element={<EditProduct />} />
        <Route path='/view/:id' element={<ViewProduct />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Home;
