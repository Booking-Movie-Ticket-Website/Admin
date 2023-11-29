import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import "./index.css";
import Layout from "./layouts/Layout";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
            </Route>
        </Routes>
    );
}

export default App;
