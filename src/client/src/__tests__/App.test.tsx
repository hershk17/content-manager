import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../App";
import { AuthContext, AuthContextType } from "../providers/AuthProvider";

const renderApp = (context: AuthContextType) => {
  render(
    <BrowserRouter>
      <AuthContext.Provider value={context}>
        <App />
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

describe("App", () => {
  test("renders loading message when isLoading is true", () => {
    renderApp({ isLoading: true } as AuthContextType);
    const loadingMessage = screen.getByText(/loading/i);
    expect(loadingMessage).toBeInTheDocument();
  });

  test("renders login page when user is not authenticated and visits /", () => {
    renderApp({ isAuthenticated: false } as AuthContextType);
    const loginPage = screen.getByText(/login/i);
    expect(loginPage).toBeInTheDocument();
  });

  test("renders login page when user is not authenticated and /login", () => {
    renderApp({ isAuthenticated: false } as AuthContextType);
    const loginPage = screen.getByText(/login/i);
    expect(loginPage).toBeInTheDocument();
  });

  test("renders home page when user is authenticated and visits /", () => {
    renderApp({ isAuthenticated: true } as AuthContextType);
    console.log(screen.debug());
    const homePage = screen.getByText(/home/i);
    expect(homePage).toBeInTheDocument();
  });

  test("renders home page when user is authenticated and visits /login", () => {
    renderApp({ isAuthenticated: true } as AuthContextType);
    const homePage = screen.getByText(/home/i);
    expect(homePage).toBeInTheDocument();
  });
});
