import React, {useState, useEffect} from "react";
import {getMatches, getUserPredictions, getChampionPrediction} from "../api";
import TeamFlag from "./TeamFlag";
import {toPanamaTime} from "../utils/panamaTime";

function Predictions({user}) {
  // const isAdmin = localStorage.getItem("is_admin") === "true";
  // const adminUserId = Number(localStorage.getItem("user_id"));
  const [matches, setMatches] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [champion, setChampion] = useState(null);
  const [finalWinner, setFinalWinner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  // Recargar siempre que el usuario vuelva a la pestaña
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible" && user) {
        loadData();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, [user]);

  const loadData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [matchesRes, predictionsRes, championRes] = await Promise.all([
        getMatches(),
        getUserPredictions(user.id),
        getChampionPrediction(user.id).catch(() => null),
      ]);

      setMatches(
        matchesRes && Array.isArray(matchesRes.data) ? matchesRes.data : [],
      );
      setPredictions(
        predictionsRes && Array.isArray(predictionsRes.data)
          ? predictionsRes.data
          : [],
      );
      setChampion(championRes && championRes.data ? championRes.data : null);

      // Buscar el ganador de la final si existe
      const finalMatch = matchesRes.data.find(
        (m) => m.phase === "Final" && m.is_finished && m.winner,
      );
      setFinalWinner(finalMatch ? finalMatch.winner : null);
      setLoading(false);
    } catch (err) {
      console.error("Error loading data:", err);
      setLoading(false);
    }
  };

  const getMatchById = (matchId) => {
    return matches.find((m) => m.id === matchId);
  };

  const formatDate = (dateStr) => {
    const panamaDate = toPanamaTime(dateStr);
    if (!panamaDate || !panamaDate.isValid || !panamaDate.isValid()) {
      return "";
    }
    return `${panamaDate.format("DD MMM HH:mm")} PT`;
  };

  const getPhaseLabelInEnglish = (phase) => {
    if (!phase) return "Group Stage";

    // Visual mapping for GRUPO A-H to GROUP A-H
    const grupoMatch = phase.match(/^GRUPO\s([A-H])$/i);
    if (grupoMatch) {
      return `GROUP ${grupoMatch[1]}`;
    }

    const normalized = phase
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .replace(/\s+/g, "")
      .toLowerCase();

    const phaseMap = {
      fasedegrupos: "Group Stage",
      groupstage: "Group Stage",
      dieciseisavos: "Round of 32",
      roundof32: "Round of 32",
      octavos: "Round of 16",
      octavosdefinal: "Round of 16",
      roundof16: "Round of 16",
      cuartos: "Quarterfinals",
      cuartosdefinal: "Quarterfinals",
      quarterfinal: "Quarterfinals",
      quarterfinals: "Quarterfinals",
      semifinal: "Semifinals",
      semifinales: "Semifinals",
      semifinals: "Semifinals",
      final: "Final",
      tercerlugar: "Third Place",
      tercerpuesto: "Third Place",
      thirdplace: "Third Place",
    };

    return phaseMap[normalized] || phase;
  };

  const basePoints = predictions.reduce(
    (sum, prediction) => sum + (prediction.points || 0),
    0,
  );
  const championBonus =
    champion && finalWinner && champion.team === finalWinner ? 15 : 0;
  const totalPoints = basePoints + championBonus;

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  // Ordenar predicciones por fecha de partido (de antes a después)
  const sortedPredictions = [...predictions].sort((a, b) => {
    const matchA = getMatchById(a.match_id);
    const matchB = getMatchById(b.match_id);
    if (!matchA || !matchB) return 0;
    return new Date(matchA.match_date) - new Date(matchB.match_date);
  });

  return (
    <div>
      <h1 className="text-3xl font-black mb-8 text-white">Mis puntos</h1>

      <div className="mb-6 bg-slate-800 p-5 rounded-xl border border-slate-700 shadow-lg">
        <div className="text-slate-400 font-medium uppercase text-xs tracking-wider mb-1">
          Total acumulado
        </div>
        <div className="text-4xl font-black text-green-400">{totalPoints}</div>
      </div>

      {/* Lista de predicciones */}
      <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700 overflow-hidden">
        <h2 className="text-xl font-bold p-6 border-b border-slate-700 text-white">
          Historial de Predicciones
        </h2>

        {predictions.length === 0 ? (
          <div className="text-center text-slate-500 py-10">
            No tienes ninguna predicción aún
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {champion && (
              <div className="bg-yellow-900/30 border border-yellow-600 rounded-xl p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 font-bold text-yellow-300">
                  <span className="text-2xl">👑</span>
                  <span>Campeón del Mundial: {champion.team}</span>
                </div>
                <div className="font-bold">
                  {finalWinner ? (
                    champion.team === finalWinner ? (
                      <span className="text-green-400">+15 pts</span>
                    ) : (
                      <span className="text-red-400">0 pts</span>
                    )
                  ) : (
                    <span className="text-slate-400">
                      (15 puntos si aciertas)
                    </span>
                  )}
                </div>
              </div>
            )}

            {sortedPredictions.map((prediction) => {
              const match = getMatchById(prediction.match_id);
              if (!match) return null;

              return (
                <div
                  key={prediction.id}
                  className="bg-slate-900/60 rounded-xl border border-slate-700 shadow p-4 hover:bg-slate-700/40 transition-colors"
                >
                  {/* Fila 1: fase y estadio */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-slate-400 font-bold uppercase">
                      {getPhaseLabelInEnglish(match.phase)}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 font-bold">
                        {match.stadium || ""}
                      </span>
                      <span
                        className={`text-xs font-black px-2 py-1 rounded border ${
                          (prediction.points || 0) > 0
                            ? "text-green-300 border-green-700 bg-green-900/30"
                            : "text-slate-300 border-slate-600 bg-slate-800/70"
                        }`}
                      >
                        {(prediction.points || 0)} pts
                      </span>
                    </div>
                  </div>

                  {/* Fila 2: equipos y predicción */}
                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <TeamFlag
                        team={match.team_home}
                        size="20px"
                        showName={false}
                      />
                      <span className="font-bold text-white truncate">
                        {match.team_home}
                      </span>
                    </div>
                    <span className="font-bold text-slate-300 bg-slate-900/70 px-3 py-1 rounded border border-slate-700 whitespace-nowrap">
                      {prediction.predicted_home} - {prediction.predicted_away}
                    </span>
                    <div className="flex items-center justify-end gap-2 min-w-0">
                      <span className="font-bold text-white truncate">
                        {match.team_away}
                      </span>
                      <TeamFlag
                        team={match.team_away}
                        size="20px"
                        showName={false}
                      />
                    </div>
                  </div>

                  {/* Fila 3: fecha y hora centradas */}
                  <div className="flex justify-center mt-3">
                    <span className="text-sm text-slate-300 font-semibold">
                      {formatDate(match.match_date)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Predictions;
