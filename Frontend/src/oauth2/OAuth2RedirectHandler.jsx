import React from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { Navigate, useNavigate, useParams } from "react-router-dom";

function OAuth2RedirectHandler() {
  const token = new URL(window.location.href).searchParams.get("token");
  if (token) {
    localStorage.setItem(ACCESS_TOKEN, token);
    localStorage.setItem(REFRESH_TOKEN, null);

    return <Navigate to="/" />;
  }
}

export default OAuth2RedirectHandler;
