import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode"; // Importa jwt-decode correctamente

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo && userInfo.token) {
      const decodedToken = jwtDecode(userInfo.token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("userInfo");
        setUser(null);
        Swal.fire({
          position: "top-end",
          icon: "info",
          title: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
          showConfirmButton: true,
        });
      } else {
        axiosInstance
          .get("/api/users/profile", {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          })
          .then((response) => {
            setUser(response.data);
          })
          .catch((error) => {
            console.error("Error al obtener el perfil del usuario:", error);
            localStorage.removeItem("userInfo");
          });
      }
    }
  }, []);

  const loginUser = async (email, password, rememberMe) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/api/users/login", {
        email,
        password,
      });
      const { token, user } = response.data;
      const userInfo = { token, user };
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      setUser(user);
      setLoading(false);
      navigate("/"); // Redirige a la página principal o a otra ruta después de iniciar sesión
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Iniciaste sesión correctamente!",
        showConfirmButton: false,
        timer: 1500,
      });
      return true;
    } catch (error) {
      setLoading(false);
      console.error("Error al iniciar sesión:", error);
      return false;
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    navigate("/LoginPage");
  };

  const registerUser = async (userData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/api/users/register",
        userData
      );
      const { token, user } = response.data;
      const userInfo = { token, user };
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      setUser(user);
      setLoading(false);
      navigate("/"); // Redirige a la página principal o a otra ruta después de registrarse
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Usuario registrado exitosamente!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      setLoading(false);
      console.error("Error al registrarse:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, loginUser, logoutUser, registerUser, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
