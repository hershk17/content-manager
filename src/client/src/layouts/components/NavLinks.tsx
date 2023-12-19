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
  { icon: IconHome, label: "Home", link: "/home" },
  { icon: IconLogin, label: "Login", link: "/login" },
  { icon: IconUserPlus, label: "Register", link: "/register" },
  { icon: IconSearch, label: "Search", link: "/search" },
  { icon: IconLibrary, label: "Library", link: "/library" },
  { icon: IconTestPipe, label: "Loader Test", link: "/test" },
  { icon: IconError404, label: "Not Found", link: "/404" },
];
