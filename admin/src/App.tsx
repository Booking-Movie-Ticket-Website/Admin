import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import Layout from "./layouts/Layout";
import Movies from "./pages/Movies";
import Movie from "./pages/Movie";
import { useState, useEffect, useCallback } from "react";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

function App() {
    const [showAdminBoard, setShowAdminBoard] = useState(false);

    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const location = useLocation();

    useEffect(() => {
        if (["/login", "/register"].includes(location.pathname)) {
            dispatch(clearMessage());
        }
    }, [dispatch, location]);

    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    useEffect(() => {
        if (currentUser) {
            setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
        } else {
            setShowAdminBoard(false);
        }
    }, [currentUser]);
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/movies/:id" element={<Movie />} />
            </Route>
        </Routes>
    );
}

export default App;
