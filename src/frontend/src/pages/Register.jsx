import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState(null);
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Validar contraseñas en tiempo real
        if (name === "confirmPassword" || name === "password") {
            if (name === "confirmPassword" && formData.password !== value) {
                setPasswordError("Las contraseñas no coinciden");
            } else if (name === "password" && formData.confirmPassword && formData.confirmPassword !== value) {
                setPasswordError("Las contraseñas no coinciden");
            } else {
                setPasswordError("");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Validar que las contraseñas coincidan
        if (formData.password !== formData.confirmPassword) {
            setPasswordError("Las contraseñas no coinciden");
            return;
        }

        try {
            // Adaptando a tu API existente
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: `${formData.nombre} ${formData.apellido}`,
                    email: formData.email,
                    password: formData.password,
                    telefono: formData.telefono // Si tu API lo soporta
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al registrar el usuario');
            }

            console.log('Usuario registrado:', data);
            navigate('/login'); // Redirige al login después del registro exitoso

        } catch (err) {
            setError(err.message);
            console.error(err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-200 via-cyan-200 to-teal-300 py-12 px-4">
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

                {/* Register Box */}
                <div className="bg-white/95 rounded-2xl shadow-2xl p-8">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                        Crear cuenta
                    </h2>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Nombre */}
                        <div>
                            <label 
                                htmlFor="nombre" 
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Nombre*
                            </label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Apellido */}
                        <div>
                            <label 
                                htmlFor="apellido" 
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Apellido*
                            </label>
                            <input
                                type="text"
                                id="apellido"
                                name="apellido"
                                value={formData.apellido}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label 
                                htmlFor="email" 
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Email*
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Teléfono */}
                        <div>
                            <label 
                                htmlFor="telefono" 
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Teléfono
                            </label>
                            <input
                                type="tel"
                                id="telefono"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Contraseña */}
                        <div>
                            <label 
                                htmlFor="password" 
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Contraseña*
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Confirmar Contraseña */}
                        <div>
                            <label 
                                htmlFor="confirmPassword" 
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Confirmar Contraseña*
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                    passwordError 
                                        ? 'border-red-500 focus:ring-red-500' 
                                        : 'border-gray-300 focus:ring-teal-500 focus:border-transparent'
                                }`}
                            />
                            {passwordError && (
                                <p className="mt-1 text-sm text-red-600">{passwordError}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold py-3 rounded-lg hover:from-teal-600 hover:to-teal-700 transform hover:-translate-y-0.5 transition-all duration-200 shadow-md hover:shadow-lg mt-6"
                        >
                            Crear cuenta
                        </button>
                    </form>

                    {/* Link a Login */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            ¿Ya tienes una cuenta?{" "}
                            <Link
                                to="/login"
                                className="text-teal-600 hover:text-teal-700 font-medium hover:underline transition-colors"
                            >
                                Iniciar sesión
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;