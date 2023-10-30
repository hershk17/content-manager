import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import { AuthContext } from "./providers/AuthProvider";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function App() {
  const { isLoading, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </>
  );
}

export default App;
