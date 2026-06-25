<template>
  <section class="page">
    <h1 class="page-title">Vulnerabilites</h1>
    <p v-if="error" class="error">{{ error }}</p>

    <form @submit.prevent="add" class="vuln-form">
      <input v-model="name" placeholder="Ex: Mot de passe faible" required />
      <select v-model="assetId" required>
        <option disabled value="">Actif associe</option>
        <option v-for="a in store.assets" :key="a.id" :value="a.id">{{ a.name }}</option>
      </select>
      <select v-model="criticality" required>
        <option disabled value="">Criticite</option>
        <option value="faible">Faible</option>
        <option value="moyenne">Moyenne</option>
        <option value="élevée">Elevee</option>
      </select>
      <button type="submit" class="btn-primary">Ajouter</button>
    </form>

    <ul class="list">
      <li v-for="v in store.vulnerabilities" :key="v.id">
        <div class="item-main">
          <div>
            <strong>{{ v.name }}</strong>
            <span class="meta" v-if="v.Asset"> sur {{ v.Asset.name }}</span>
          </div>
          <span class="badge" :class="v.criticality">{{ v.criticality }}</span>
        </div>
        <button type="button" class="btn-danger" @click="remove(v.id)">Supprimer</button>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCyberStore } from "../stores/cyberStore";

const store = useCyberStore();
const name = ref("");
const assetId = ref("");
const criticality = ref("");
const error = ref(null);

onMounted(async () => {
  try {
    await Promise.all([store.fetchAssets(), store.fetchVulnerabilities()]);
  } catch (e) {
    error.value = "Impossible de charger les donnees.";
  }
});

const add = async () => {
  try {
    await store.addVulnerability({ name: name.value, assetId: assetId.value, criticality: criticality.value });
    name.value = "";
    assetId.value = "";
    criticality.value = "";
  } catch (e) {
    error.value = "Erreur lors de l'ajout.";
  }
};

const remove = async (id) => {
  try {
    await store.removeVulnerability(id);
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

.vuln-form {
  display: grid;
  grid-template-columns: 2fr 1.6fr 1.2fr auto;
  gap: 0.7rem;
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

.btn-primary {
  border: none;
  border-radius: 8px;
  padding: 0.65rem 0.9rem;
  background: #0f5ed7;
  color: #ffffff;
  cursor: pointer;
  font-weight: 600;
}

.list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.55rem;
}

.list li {
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 0.68rem 0.78rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.7rem;
}

.item-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.7rem;
  width: 100%;
}

.meta {
  color: #64748b;
  margin-left: 0.28rem;
}

.badge {
  border-radius: 999px;
  padding: 0.22rem 0.56rem;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: capitalize;
}

.faible {
  background: #dcfce7;
  color: #166534;
}

.moyenne {
  background: #fef3c7;
  color: #92400e;
}

.élevée {
  background: #fee2e2;
  color: #991b1b;
}

.btn-danger {
  border: none;
  border-radius: 7px;
  padding: 0.45rem 0.68rem;
  cursor: pointer;
  font-size: 0.84rem;
  font-weight: 600;
  background: #ef4444;
  color: #ffffff;
  white-space: nowrap;
}

@media (max-width: 980px) {
  .vuln-form {
    grid-template-columns: 1fr;
  }

  .list li {
    flex-direction: column;
    align-items: flex-start;
  }

  .item-main {
    width: 100%;
  }
}
</style>