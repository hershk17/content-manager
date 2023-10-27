/* eslint-disable perfectionist/sort-imports */
import './global.css';

import { useScrollToTop } from './hooks/use-scroll-to-top';
import ThemeProvider from './theme';

// ----------------------------------------------------------------------

export default function Test() {
  useScrollToTop();

  const handleSignInClickSteam = () => {
    window.location.href = 'http://localhost:3000/api/auth/steam';
  };
  const handleSignInClickGoogle = () => {
    window.location.href = 'http://localhost:3000/api/auth/google';
  };
  const handleRegisterClickLocal = () => {
    window.location.href = 'http://localhost:3000/api/register';
  };
  const handleSignInClickLocal = () => {
    window.location.href = 'http://localhost:3000/api/login';
  };

  return (
    <ThemeProvider>
      <button type="button" onClick={handleSignInClickSteam}>
        Sign In Steam
      </button>
      <button type="button" onClick={handleSignInClickGoogle}>
        Sign In Google
      </button>
      <button type="button" onClick={handleRegisterClickLocal}>
        Register Local
      </button>
      <button type="button" onClick={handleSignInClickLocal}>
        Sign In Local
      </button>
    </ThemeProvider>
  );
}
