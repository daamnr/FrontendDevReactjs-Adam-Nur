import { BrowserRouter, Route, Routes } from "react-router-dom";
import RestaurantDetail from "./components/RestaurantDetail";
import Home from "./components/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route
          path="/restaurant/:restaurantId"
          element={<RestaurantDetail />}
        />
        <Route path="*" element={<h1>Error Page</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
