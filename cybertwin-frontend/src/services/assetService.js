const BASE = "http://localhost:3000";

export const getAssets = async () => {
  const res = await fetch(`${BASE}/assets`);
  if (!res.ok) throw new Error("Erreur GET /assets");
  return res.json();
};

export const createAsset = async (data) => {
  const res = await fetch(`${BASE}/assets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Erreur POST /assets");
  return res.json();
};

export const updateAsset = async (id, data) => {
  const res = await fetch(`${BASE}/assets/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Erreur PUT /assets/:id");
  return res.json();
};

export const deleteAsset = async (id) => {
  const res = await fetch(`${BASE}/assets/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erreur DELETE /assets/:id");
};