// import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/login";
import Register from "./components/register";
import ForgetPassword from "./components/forgetPassword";
import ResetPassword from "./components/resetPassword";
// import FullFeaturedCrudGrid from "./Grid/FullFeaturedCrudGrid";
// import Form from "./components/Form";
// import DataGridComponent from "./Grid/DataGridComponent";
// import { store } from "../src/GlobalRedux/store";

const App = () => {
  return (
    // <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route >
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/navbar" element={<Navbar />} />
            {/* <Route path="/grid" element={<FullFeaturedCrudGrid />} />
            <Route path="/form" element={<Form />} />
            <Route path="/datagrid" element={<FullFeaturedCrudGrid />} />
            <Route path="/datagrid1" element={<DataGridComponent />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    // </Provider>
  );
};

export default App;