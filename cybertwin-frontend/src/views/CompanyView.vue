<template>
  <section class="page">
    <h1 class="page-title">Entreprise</h1>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">{{ success }}</p>

    <form @submit.prevent="submit" class="form-grid">
      <div class="field">
        <label>Nom de l'entreprise</label>
        <input v-model="form.name" placeholder="Ex: TechNova SARL" required />
      </div>
      <div class="field">
        <label>Secteur d'activite</label>
        <input v-model="form.sector" placeholder="Ex: E-commerce, Santé, Finance" required />
      </div>
      <div class="field">
        <label>Nombre d'employes</label>
        <input v-model.number="form.employees" type="number" min="0" placeholder="Ex: 25" required />
      </div>
      <div class="field">
        <label>Nombre de serveurs</label>
        <input v-model.number="form.servers" type="number" min="0" placeholder="Ex: 4" required />
      </div>
      <div class="field">
        <label>Nombre de postes clients</label>
        <input v-model.number="form.clientWorkstations" type="number" min="0" placeholder="Ex: 20" required />
      </div>
      <div class="field">
        <label>Services exposes sur Internet</label>
        <input v-model="form.exposedServices" placeholder="Ex: Site web, API de paiement, Webmail" />
      </div>
      <button type="submit" class="btn-primary">Enregistrer</button>
    </form>
  </section>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useCyberStore } from "../stores/cyberStore";

const store = useCyberStore();
const error = ref(null);
const form = reactive({
  name: "", sector: "", employees: 0,
  servers: 0, clientWorkstations: 0, exposedServices: ""
});

onMounted(async () => {
  try {
    await store.fetchCompany();
    Object.assign(form, store.company);
  } catch (e) {
    error.value = "Impossible de charger l'entreprise.";
  }
});

const success = ref(null);

const submit = async () => {
  try {
    await store.saveCompany({ ...form });
    error.value = null;
    success.value = "Entreprise enregistree avec succes !";
    setTimeout(() => (success.value = null), 3000);
    Object.assign(form, { name: "", sector: "", employees: 0, servers: 0, clientWorkstations: 0, exposedServices: "" });
  } catch (e) {
    error.value = "Erreur lors de l'enregistrement.";
  }
};
</script>

<style scoped>

.page {
  max-width: 760px;
  padding: 1.4rem;
  border-radius: 14px;
  border: 1px solid #dbe4f0;
  background: #ffffff;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 1.25rem;
  color: #0f172a;
}

.form-grid { display: grid; gap: 0.95rem; }

.field { display: flex; flex-direction: column; gap: 6px; }
.field label { font-size: 0.84rem; font-weight: 600; color: #334155; }
.field input {
  padding: 0.66rem 0.8rem;
  border-radius: 8px;
  border: 1px solid #cdd8e8;
  background: #fff;
  color: #0f172a;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.field input:focus {
  border-color: #0f5ed7;
  box-shadow: 0 0 0 3px rgba(15, 94, 215, 0.12);
}

.btn-primary {
  margin-top: 8px;
  padding: 0.72rem 1rem;
  border-radius: 8px;
  border: none;
  background: #0f5ed7;
  color: #fff;
  font-size: 0.96rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}
.btn-primary:hover {
  background: #0d4fb6;
  transform: translateY(-1px);
}

.error,
.success {
  margin: 0 0 0.85rem;
  padding: 0.6rem 0.7rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
}

.error {
  color: #b91c1c;
  background: #fef2f2;
  border: 1px solid #fecaca;
}

.success {
  color: #166534;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
}

@media (max-width: 768px) {
  .page {
    padding: 1rem;
  }
}
</style>