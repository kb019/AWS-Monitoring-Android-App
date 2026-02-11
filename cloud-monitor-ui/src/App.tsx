import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Instances from "./pages/Instances";
import InstanceDetail from "./pages/InstanceDetail";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/instances" replace />} />
        <Route path="login" element={<Login />} />
        <Route path="instances" element={<Instances />} />
        <Route path="instances/:instanceId" element={<InstanceDetail />} />
      </Route>

      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}
