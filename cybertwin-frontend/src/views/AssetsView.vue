<template>
  <section class="page">
    <h1 class="page-title">Actifs</h1>
    <p v-if="error" class="error">{{ error }}</p>

    <form @submit.prevent="add" class="asset-form">
      <input v-model="name" placeholder="Nom actif" required />
      <select v-model="type" required>
        <option disabled value="">Type</option>
        <option>Serveur Web</option>
        <option>Base de données</option>
        <option>Poste utilisateur</option>
        <option>Routeur</option>
        <option>Pare-feu</option>
        <option>Application métier</option>
      </select>
      <label class="check-field">
        <input type="checkbox" v-model="exposedToInternet" /> Expose Internet
      </label>
      <button type="submit" class="btn-primary">Ajouter</button>
    </form>

    <table v-if="store.assets.length" class="data-table">
      <thead>
        <tr><th>Nom</th><th>Type</th><th>Expose</th><th>Actions</th></tr>
      </thead>
      <tbody>
        <tr v-for="a in store.assets" :key="a.id">
          <td v-if="editingId !== a.id">{{ a.name }}</td>
          <td v-else>
            <input v-model="editForm.name" placeholder="Nom actif" />
          </td>

          <td v-if="editingId !== a.id">{{ a.type }}</td>
          <td v-else>
            <select v-model="editForm.type">
              <option>Serveur Web</option>
              <option>Base de données</option>
              <option>Poste utilisateur</option>
              <option>Routeur</option>
              <option>Pare-feu</option>
              <option>Application métier</option>
            </select>
          </td>

          <td v-if="editingId !== a.id">{{ a.exposedToInternet ? "Oui" : "Non" }}</td>
          <td v-else>
            <label>
              <input type="checkbox" v-model="editForm.exposedToInternet" /> Expose Internet
            </label>
          </td>

          <td v-if="editingId !== a.id" class="actions-cell">
            <button type="button" class="btn-secondary" @click="startEdit(a)">Modifier</button>
            <button type="button" class="btn-danger" @click="remove(a.id)">Supprimer</button>
          </td>
          <td v-else class="actions-cell">
            <button type="button" class="btn-primary" @click="saveEdit(a.id)">Enregistrer</button>
            <button type="button" class="btn-secondary" @click="cancelEdit">Annuler</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else class="empty">Aucun actif enregistre.</p>
  </section>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useCyberStore } from "../stores/cyberStore";

const store = useCyberStore();
const name = ref("");
const type = ref("");
const exposedToInternet = ref(false);
const error = ref(null);
const editingId = ref(null);
const editForm = reactive({
  name: "",
  type: "",
  exposedToInternet: false
});

onMounted(async () => {
  try { await store.fetchAssets(); }
  catch (e) { error.value = "Impossible de charger les actifs."; }
});

const add = async () => {
  try {
    await store.addAsset({ name: name.value, type: type.value, exposedToInternet: exposedToInternet.value });
    name.value = "";
    type.value = "";
    exposedToInternet.value = false;
  } catch (e) {
    error.value = "Erreur lors de l'ajout.";
  }
};

const startEdit = (asset) => {
  editingId.value = asset.id;
  editForm.name = asset.name;
  editForm.type = asset.type;
  editForm.exposedToInternet = !!asset.exposedToInternet;
  error.value = null;
};

const cancelEdit = () => {
  editingId.value = null;
};

const saveEdit = async (id) => {
  try {
    await store.editAsset(id, {
      name: editForm.name,
      type: editForm.type,
      exposedToInternet: editForm.exposedToInternet
    });
    editingId.value = null;
    error.value = null;
  } catch (e) {
    error.value = "Erreur lors de la modification.";
  }
};

const remove = async (id) => {
  try {
    await store.removeAsset(id);
    if (editingId.value === id) editingId.value = null;
    error.value = null;
  } catch (e) {
    error.value = "Erreur lors de la suppression.";
  }
};
</script>

<style scoped>
.page {
  border: 1px solid #dbe4f0;
  background: #ffffff;
  border-radius: 14px;
  padding: 1.2rem;
}

.page-title {
  margin: 0 0 1rem;
  color: #0f172a;
  font-size: 1.75rem;
  line-height: 1.2;
}

.error {
  margin: 0 0 0.8rem;
  padding: 0.6rem 0.7rem;
  border-radius: 8px;
  color: #b91c1c;
  background: #fef2f2;
  border: 1px solid #fecaca;
}

.asset-form {
  display: grid;
  grid-template-columns: 2fr 1.4fr auto auto;
  gap: 0.7rem;
  align-items: center;
  margin-bottom: 1rem;
}

input,
select {
  width: 100%;
  box-sizing: border-box;
  padding: 0.62rem 0.75rem;
  border-radius: 8px;
  border: 1px solid #cdd8e8;
  font-size: 0.95rem;
  color: #0f172a;
  outline: none;
}

input:focus,
select:focus {
  border-color: #0f5ed7;
  box-shadow: 0 0 0 3px rgba(15, 94, 215, 0.12);
}

.check-field {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #334155;
  font-size: 0.9rem;
  white-space: nowrap;
}

.check-field input {
  width: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
}

.data-table th,
.data-table td {
  text-align: left;
  padding: 0.72rem 0.75rem;
  border-bottom: 1px solid #eef2f7;
}

.data-table th {
  font-size: 0.85rem;
  color: #475569;
  font-weight: 600;
  background: #f8fafc;
}

.actions-cell {
  display: flex;
  gap: 0.45rem;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary,
.btn-danger {
  border: none;
  border-radius: 7px;
  padding: 0.45rem 0.68rem;
  cursor: pointer;
  font-size: 0.87rem;
  font-weight: 600;
}

.btn-primary {
  background: #0f5ed7;
  color: #ffffff;
}

.btn-secondary {
  background: #e2e8f0;
  color: #0f172a;
}

.btn-danger {
  background: #ef4444;
  color: #ffffff;
}

.empty {
  margin: 0;
  color: #64748b;
}

@media (max-width: 980px) {
  .asset-form {
    grid-template-columns: 1fr;
  }
}
</style>