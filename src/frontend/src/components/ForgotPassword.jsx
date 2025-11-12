import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage(null);
        setLoading(true);

        try {
            // Aquí va tu llamada a la API para recuperar contraseña
            const response = await fetch('http://localhost:3000/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al enviar el correo');
            }

            setMessage('Se ha enviado un enlace de recuperación a tu correo electrónico');
            
            // Redirigir después de 3 segundos
            setTimeout(() => {
                navigate('/login');
            }, 3000);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

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

                {/* Formulario */}
                <div className="bg-white/95 rounded-2xl shadow-2xl p-8">
                    <h2 className="text-2xl font-bold text-center mb-3 text-gray-800">
                        Recupera tu Cuenta
                    </h2>
                    
                    <p className="text-center text-gray-600 mb-6">
                        Introduce tu correo electrónico para buscar tu cuenta
                    </p>

                    {message && (
                        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm flex items-start gap-2">
                            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>{message}</span>
                        </div>
                    )}

                    {error && (
                        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm flex items-start gap-2">
                            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Email */}
                        <div className="mb-6">
                            <label 
                                htmlFor="email" 
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                                placeholder="tu@email.com"
                            />
                        </div>

                        {/* Botones */}
                        <div className="flex gap-3">
                            <Link
                                to="/login"
                                className="flex-1 bg-white text-gray-800 font-semibold py-3 px-6 rounded-lg border-2 border-gray-300 hover:bg-gray-100 transition-all text-center"
                            >
                                Cancelar
                            </Link>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold py-3 rounded-lg hover:from-teal-600 hover:to-teal-700 transform hover:-translate-y-0.5 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Enviando...
                                    </span>
                                ) : (
                                    'Buscar'
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Link alternativo */}
                    <div className="mt-6 text-center">
                        <Link
                            to="/register"
                            className="text-sm text-teal-600 hover:text-teal-700 hover:underline transition-colors"
                        >
                            ¿No tienes cuenta? Regístrate aquí
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;