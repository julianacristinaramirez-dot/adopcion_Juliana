import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function LoginSuccess() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get("token");

        if (token) {
            console.log("✅ Token recibido y guardado:", token);
            localStorage.setItem("authToken", token);
            // Pequeño delay para mostrar el mensaje de éxito
            setTimeout(() => {
                navigate("/", { replace: true });
            }, 1500);
        } else {
            console.error("⚠️ No se recibió token, redirigiendo al login");
            navigate("/login", { replace: true });
        }
    }, [navigate, searchParams]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-200 via-cyan-200 to-teal-300 px-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="relative">
                        <div className="w-16 h-16 bg-black rounded-t-full flex items-center justify-center">
                            <span className="text-white text-3xl">♥</span>
                        </div>
                        <div className="w-0 h-0 border-l-[32px] border-l-transparent border-r-[32px] border-r-transparent border-t-[16px] border-t-black mx-auto"></div>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800">Huellitas JR</h1>
                </div>

                {/* Success Box */}
                <div className="bg-white/95 rounded-2xl shadow-2xl p-8 text-center">
                    {/* Spinner animado */}
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center">
                                <svg 
                                    className="w-12 h-12 text-teal-600 animate-spin" 
                                    fill="none" 
                                    viewBox="0 0 24 24"
                                >
                                    <circle 
                                        className="opacity-25" 
                                        cx="12" 
                                        cy="12" 
                                        r="10" 
                                        stroke="currentColor" 
                                        strokeWidth="4"
                                    />
                                    <path 
                                        className="opacity-75" 
                                        fill="currentColor" 
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                            </div>
                            {/* Checkmark que aparece después */}
                            <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                                <svg 
                                    className="w-8 h-8 text-green-600" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={3} 
                                        d="M5 13l4 4L19 7" 
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        ¡Inicio de sesión exitoso!
                    </h2>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        Procesando tu información...
                    </p>

                    {/* Barra de progreso animada */}
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-teal-500 to-teal-600 h-2 rounded-full animate-progress"></div>
                    </div>

                    <p className="text-sm text-gray-500 mt-4">
                        Serás redirigido en un momento...
                    </p>
                </div>
            </div>

            <style jsx>{`
                @keyframes progress {
                    0% {
                        width: 0%;
                    }
                    100% {
                        width: 100%;
                    }
                }
                .animate-progress {
                    animation: progress 1.5s ease-in-out;
                }
            `}</style>
        </div>
    );
}

export default LoginSuccess;