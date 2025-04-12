import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ProductFlow from "./pages/ProductFlow";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/flow" element={<ProductFlow />} />
        <Route path="/" element={<Navigate to="/flow" />} />
        <Route path="/flow" element={<ProductFlow />} />
      </Routes>
    </Router>
  );
};

export default App;