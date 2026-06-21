const BASE = "http://localhost:3000";

export const calculateRisk = async () => {
  const res = await fetch(`${BASE}/risk/calculate`, { method: "POST" });
  if (!res.ok) throw new Error("Erreur POST /risk/calculate");
  return res.json();
};