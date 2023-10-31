import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./hocs/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { AuthContext } from "./providers/AuthProvider";

function App() {
  const { isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
