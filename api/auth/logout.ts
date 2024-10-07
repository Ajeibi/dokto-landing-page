import { useUser } from "@/context/user";
import Cookies from "js-cookie";

export function useSignOut() {
  const { setUser } = useUser();

  function logout() {
    Cookies.remove("dokto-token");
    setUser(null);
    window.location.reload();
  }

  return {
    logout,
  };
}

export function logoutUser() {
  Cookies.remove("dokto-token");
  window.location.href = "/auth/login";
}
