<template>
  <section class="page">
    <h1 class="page-title">Rapport Final</h1>

    <div class="panel">
      <h3>Entreprise</h3>
      <p><strong>{{ store.company.name }}</strong> — {{ store.company.sector }}</p>
      <p>{{ store.company.employees }} employes | {{ store.company.servers }} serveurs | {{ store.company.clientWorkstations }} postes</p>
      <p>Services exposes : {{ store.company.exposedServices || "Aucun" }}</p>
    </div>

    <div class="panel">
      <h3>Inventaire des actifs ({{ store.totalAssets }})</h3>
      <ul class="list">
        <li v-for="a in store.assets" :key="a.id">
          {{ a.name }} — {{ a.type }} <span v-if="a.exposedToInternet">(expose Internet)</span>
        </li>
      </ul>
    </div>

    <div class="panel">
      <h3>Vulnerabilites detectees ({{ store.totalVulnerabilities }})</h3>
      <ul class="list">
        <li v-for="v in store.vulnerabilities" :key="v.id">
          {{ v.name }} — criticite : {{ v.criticality }}
          <span v-if="v.Asset"> ({{ v.Asset.name }})</span>
        </li>
      </ul>
    </div>

    <div v-if="store.risk" class="panel">
      <h3>Niveau de risque</h3>
      <p>Score : {{ store.risk.score }} | Niveau : <strong class="risk-level" :class="store.risk.level">{{ store.risk.level }}</strong></p>
      <h3>Recommandations</h3>
      <ul class="list">
        <li v-for="r in store.risk.recommendations" :key="r">{{ r }}</li>
      </ul>
    </div>
    <p v-else class="fallback">Calcule le risque depuis le dashboard d'abord.</p>
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import { useCyberStore } from "../stores/cyberStore";

const store = useCyberStore();

onMounted(async () => {
  await Promise.all([
    store.fetchCompany(),
    store.fetchAssets(),
    store.fetchVulnerabilities()
  ]);
  await store.fetchRisk();
});
</script>

<style scoped>
.page {
  border: 1px solid #dbe4f0;
  background: #ffffff;
  border-radius: 14px;
  padding: 1.2rem;
  display: grid;
  gap: 0.9rem;
}

.page-title {
  margin: 0;
  color: #0f172a;
  font-size: 1.75rem;
  line-height: 1.2;
}

.panel {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 0.9rem;
}

.panel h3 {
  margin: 0 0 0.5rem;
  color: #0f172a;
}

.panel p {
  margin: 0.3rem 0 0;
  color: #334155;
}

.list {
  margin: 0;
  padding-left: 1rem;
  color: #334155;
}

.list li + li {
  margin-top: 0.35rem;
}

.risk-level {
  text-transform: capitalize;
}

.faible {
  color: #166534;
}

.moyen {
  color: #92400e;
}

.élevé {
  color: #991b1b;
}

.fallback {
  margin: 0;
  color: #64748b;
}
</style>