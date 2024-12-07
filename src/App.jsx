import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLoginPage from "./admin/login/page";
import Layout from "./modules/accounting/layout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/accounting" element={<Layout />} />
      </Routes>
    </Router>
  );
};

export default App;
  