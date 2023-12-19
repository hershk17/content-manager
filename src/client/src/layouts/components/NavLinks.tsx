import {
  IconError404,
  IconHome,
  IconLibrary,
  IconLogin,
  IconSearch,
  IconTestPipe,
  IconUserPlus,
} from "@tabler/icons-react";

export const NAV_LINKS = [
  {
    icon: IconHome,
    label: "Home",
    link: "/home",
    isProtected: false,
    hiddenPostAuth: false,
  },
  {
    icon: IconLogin,
    label: "Login",
    link: "/login",
    isProtected: false,
    hiddenPostAuth: true,
  },
  {
    icon: IconUserPlus,
    label: "Register",
    link: "/register",
    isProtected: false,
    hiddenPostAuth: true,
  },
  {
    icon: IconSearch,
    label: "Search",
    link: "/search",
    isProtected: true,
    hiddenPostAuth: false,
  },
  {
    icon: IconLibrary,
    label: "Library",
    link: "/library",
    isProtected: true,
    hiddenPostAuth: false,
  },
  // { icon: IconTestPipe, label: "Loader Test", link: "/test" },
  // { icon: IconError404, label: "Not Found", link: "/404" },
];
