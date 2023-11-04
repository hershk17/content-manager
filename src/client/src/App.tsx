import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { AuthContext } from "./providers/AuthProvider";
import RequireAuth from "./components/RequireAuth";
import ReduxTest from "./pages/ReduxTest";

const App = () => {
    const { isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <RequireAuth>
                        <Home />
                    </RequireAuth>
                }
            />

            <Route
                path="/login"
                element={<Login />}
            />
            <Route
                path="/test"
                element={
                    <RequireAuth>
                        <ReduxTest />
                    </RequireAuth>
                }
            />
        </Routes>
    );
};

export default App;
