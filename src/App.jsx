// import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
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