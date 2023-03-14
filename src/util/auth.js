import { redirect } from "react-router-dom";

export function getAuthToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function getRole() {
  const role = localStorage.getItem("role");
  return role;
}

export function roleLoader() {
  return getRole();
}

export function checkAuthLoader() {
  const token = getAuthToken();
  console.log("in loader");
  console.log(token);
  if (!token) {
    return redirect("/auth");
  }
  return null;
}

export function checkRoleLoader() {
  const token = getAuthToken();
  const role = getRole();
  if (!token || !(role === "admin")) {
    return redirect("/");
  }
  return null;
}
