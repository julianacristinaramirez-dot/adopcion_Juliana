import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function LoginSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      console.log("✅ Token recibido:", token);
      localStorage.setItem("authToken", token);

      // 🔹 Pedir datos del usuario al backend
      fetch("http://localhost:3000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.user) {
            console.log("👤 Usuario autenticado:", data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/profile", { replace: true }); // Ir al perfil
          } else {
            console.error("⚠️ No se recibió usuario en la respuesta");
            navigate("/login", { replace: true });
          }
        })
        .catch((err) => {
          console.error("❌ Error al obtener usuario:", err);
          navigate("/login", { replace: true });
        });
    } else {
      console.error("⚠️ No se recibió token, redirigiendo al login");
      navigate("/login", { replace: true });
    }
  }, [navigate, searchParams]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg">Procesando inicio de sesión...</p>
    </div>
  );
}

export default LoginSuccess;
