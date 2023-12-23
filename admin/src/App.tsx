import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import "./index.css";
import Layout from "./layouts/Layout";
import Movies from "./pages/Movies";
import Movie from "./pages/Movie";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import { useEffect } from "react";
import { useAppSelector } from "./hook";
import { toast } from "react-toastify";
import Actors from "./pages/Actors";

function App() {
    const root = document.querySelector("#root");
    const { isLoading } = useAppSelector((state) => state.loading!);
    const { message } = useAppSelector((state) => state.message!);

    useEffect(() => {
        if (isLoading) {
            root?.classList.add("brightness-50");
        } else {
            root?.classList.remove("brightness-50");
        }
    }, [isLoading, root?.classList]);

    useEffect(() => {
        if (message !== "") {
            toast(message);
        }
    }, [message]);

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute />}>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/movies/:id" element={<Movie />} />
                    <Route path="/actors" element={<Actors />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
