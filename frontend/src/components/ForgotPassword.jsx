import React, { useState } from "react";
import { forgotPassword } from "../api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await forgotPassword(email);
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.detail || "Error al enviar el correo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-2">
      <div className="bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-2xl border border-slate-700">
        <h2 className="text-2xl font-black text-white mb-2 text-center">
          Contraseña Olvidada
        </h2>
        <p className="text-slate-400 text-sm text-center mb-6">
          Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
        </p>

        {sent ? (
          <div className="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-4 rounded-lg text-center text-sm">
            ✓ Si el correo está registrado, recibirás un enlace para restablecer tu contraseña en breve.
            <br />
            <a href="/login" className="text-green-400 underline mt-3 inline-block font-bold">
              Volver al inicio de sesión
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-4 text-sm text-center">
                {error}
              </div>
            )}
            <div className="mb-5">
              <label className="block text-slate-400 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-colors"
                placeholder="your@email.com"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-lg shadow-lg shadow-green-900/20 transition-all transform active:scale-95"
            >
              {loading ? "Enviando..." : "Enviar enlace de restablecimiento"}
            </button>
          </form>
        )}

        {!sent && (
          <p className="text-center mt-5 text-slate-400 text-sm">
            ¿Recuerdas tu contraseña?{" "}
            <a href="/login" className="text-green-400 hover:underline font-bold">
              Iniciar sesión
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
