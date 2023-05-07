import {Routes,Route} from "react-router-dom";
import SignIn from "./pages/signin";
import EmpSignUp from "./pages/empSingup";
import EmpAll from "./pages/empAll";
import EmpSingle from "./pages/empSingle";
import EmpUpdate from "./pages/empUpdate";
import EmpSalaryHistory from "./pages/empSalaryHistory";
import Layout from "./components/layout";
function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/dash/admin" element={<Layout comp={<EmpAll />} />} />
      <Route
        path="/dash/admin/emp/:id"
        element={<Layout comp={<EmpSingle />} />}
      />
      <Route
        path="/dash/admin/emp/:id/update"
        element={<Layout comp={<EmpUpdate />} />}
      />
      <Route
        path="/dash/admin/emp/:id/salary"
        element={<Layout comp={<EmpSalaryHistory />} />}
      />
      <Route
        path="/dash/admin/emp/create"
        element={<Layout comp={<EmpSignUp />} />}
      />
    </Routes>
  );
}

export default App;
