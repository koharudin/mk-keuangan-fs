import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      navigate("/login");
      return;
    }

    // simpan token
    localStorage.setItem("app_tokenx", token);

    // redirect ke dashboard
    navigate("/");
  }, []);

  return <p>Logging in...</p>;
}
