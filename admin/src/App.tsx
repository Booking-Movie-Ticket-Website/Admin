import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import "./index.css";
import Layout from "./layouts/Layout";
import Movies from "./pages/Movies";
import Movie from "./pages/Movie";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    // const logOut = useCallback(() => {
    //     dispatch(logout());
    // }, [dispatch]);

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute />}>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/movies/:id" element={<Movie />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
