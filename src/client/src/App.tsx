import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import { AuthContext } from "./providers/AuthProvider";

function App() {
  const { isLoading, isAuthenticated } = useContext(AuthContext);

  return (
    <BrowserRouter>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />}></Route>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
