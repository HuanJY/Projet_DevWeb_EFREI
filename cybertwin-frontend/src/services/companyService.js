const BASE = "http://localhost:3000";

export const getCompany = async () => {
  const res = await fetch(`${BASE}/company`);
  if (!res.ok) throw new Error("Erreur GET /company");
  return res.json();
};

export const updateCompany = async (data) => {
  const res = await fetch(`${BASE}/company`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Erreur PUT /company");
  return res.json();
};