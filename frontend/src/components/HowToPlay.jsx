import React from "react";

export default function HowToPlay() {
  const knockoutRows = [
    ["Round of 32", "6 pts", "3 pts"],
    ["Round of 16", "7 pts", "4 pts"],
    ["Quarterfinals", "9 pts", "5 pts"],
    ["Semifinals", "12 pts", "6 pts"],
    ["Third Place", "10 pts", "5 pts"],
    ["Final", "15 pts", "8 pts"],
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-cyan-400/30 bg-slate-900/85 p-3 sm:p-6 md:p-10 shadow-2xl">
      <div className="pointer-events-none absolute -top-28 -right-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto text-sm sm:text-base">
        <div className="mb-8 flex items-center gap-4">
          <img
            src="/img/integ.png"
            alt="INTEG"
            className="h-16 w-16 rounded-xl bg-white object-contain p-1 shadow"
          />
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-yellow-400">
              🏆 Quiniela Mundial 2026
            </h1>
            <p className="mt-1 text-cyan-200 font-semibold">Reglas Rápidas</p>
          </div>
        </div>

        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-emerald-300 mb-3">
            ⚽ Cómo participar
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-100">
            <li>Regístrate en la plataforma con tus datos.</li>
            <li>Envía tu predicción de puntuación para cada partido.</li>
            <li>Puedes editar tu predicción hasta 5 minutos antes del inicio del partido.</li>
            <li>Una vez que el partido comienza, la predicción se bloquea.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-emerald-300 mb-3">
            🧮 Sistema de Puntuación
          </h2>

          <h3 className="text-lg font-bold text-cyan-200 mb-2">⚽ Fase de Grupos</h3>
          <ul className="list-disc pl-6 space-y-1 text-slate-100 mb-5">
            <li>5 pts → Marcador exacto</li>
            <li>3 pts → Ganador correcto o empate</li>
            <li>1 pt → Goles correctos para un equipo</li>
          </ul>

          <h3 className="text-lg font-bold text-cyan-200 mb-3">🔥 Fase de Eliminación</h3>
          <p className="text-slate-100 mb-3">
            Si predices un empate, indica el marcador esperado después del tiempo extra y luego selecciona el equipo que esperas que gane en los penales.
          </p>
          <div className="overflow-x-auto rounded-xl border border-cyan-400/30">
            <table className="w-full min-w-[320px] sm:min-w-[520px] text-left text-xs sm:text-base">
              <thead className="bg-cyan-700/35 text-cyan-100">
                <tr>
                  <th className="px-4 py-3 font-bold">Fase</th>
                  <th className="px-4 py-3 font-bold">Marcador Exacto</th>
                  <th className="px-4 py-3 font-bold">Ganador</th>
                </tr>
              </thead>
              <tbody>
                {knockoutRows.map(([phase, exactScore, winner]) => (
                  <tr key={phase} className="border-t border-cyan-400/20 text-slate-100">
                    <td className="px-4 py-3">{phase}</td>
                    <td className="px-4 py-3">{exactScore}</td>
                    <td className="px-4 py-3">{winner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-emerald-300 mb-3">
            👑 Campeón Mundial
          </h2>
          <p className="text-slate-100">Si aciertas el campeón del torneo:</p>
          <p className="mt-2 text-yellow-400 font-extrabold text-lg">🏆 +15 puntos de bonificación</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-emerald-300 mb-3">
            📊 Tabla de Clasificación
          </h2>
          <p className="text-slate-100 mb-3">
            La tabla de clasificación se actualiza automáticamente después de cada partido.
          </p>
          <p className="text-slate-100">En caso de empate:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-1 text-slate-100">
            <li>1 Marcadores exactos adicionales</li>
            <li>2 Ganadores correctos adicionales</li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-emerald-300 mb-3">
            ⚠️ Reglas
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-100">
            <li>Solo se permite una cuenta por jugador.</li>
            <li>
              Las predicciones fraudulentas o múltiples cuentas serán descalificadas.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-bold text-emerald-300 mb-3">
            📩 Contacto
          </h2>
          <p className="text-slate-100">
            Si tienes alguna pregunta o comentario, escribe a{" "}
            <a
              href="mailto:quinimundial@gmail.com"
              className="font-bold text-cyan-300 underline hover:text-cyan-200"
            >
              quinimundial@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
