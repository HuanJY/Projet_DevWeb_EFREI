<template>
  <section class="page">
    <h1 class="page-title">Dashboard</h1>
    <div class="cards">
      <div class="card">
        <h3>Actifs</h3>
        <p class="big">{{ store.totalAssets }}</p>
      </div>
      <div class="card">
        <h3>Vulnerabilites</h3>
        <p class="big">{{ store.totalVulnerabilities }}</p>
      </div>
      <div class="card" v-if="store.risk">
        <h3>Score de risque</h3>
        <p class="big">{{ store.risk.score }}</p>
      </div>
      <div class="card" v-if="store.risk">
        <h3>Niveau</h3>
        <p class="badge" :class="store.risk.level">{{ store.risk.level }}</p>
      </div>
    </div>

    <div v-if="store.risk" class="panel">
      <h3>Recommandations</h3>
      <ul class="recommendations">
        <li v-for="r in store.risk.recommendations" :key="r">{{ r }}</li>
      </ul>
    </div>

    <div class="panel">
      <h3>Repartition des actifs par type</h3>
      <p class="chart-help">Visualisation obligatoire pour le dashboard.</p>
      <div class="chart-wrap">
        <Bar :data="assetTypeChartData" :options="chartOptions" />
      </div>
    </div>

    <button class="btn-primary" @click="refreshRisk">Calculer le risque</button>
  </section>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from "chart.js";
import { useCyberStore } from "../stores/cyberStore";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const store = useCyberStore();

const assetTypes = [
  "Serveur Web",
  "Base de données",
  "Poste utilisateur",
  "Routeur",
  "Pare-feu",
  "Application métier"
];

const assetTypeChartData = computed(() => {
  const counts = assetTypes.map((type) =>
    store.assets.filter((asset) => asset.type === type).length
  );

  return {
    labels: assetTypes,
    datasets: [
      {
        label: "Nombre d'actifs",
        data: counts,
        backgroundColor: ["#0f5ed7", "#0ea5e9", "#22c55e", "#f59e0b", "#ef4444", "#6366f1"],
        borderRadius: 6
      }
    ]
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    title: { display: false }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: { precision: 0 }
    }
  }
};

onMounted(async () => {
  await Promise.all([store.fetchAssets(), store.fetchVulnerabilities()]);
});

const refreshRisk = () => store.fetchRisk();
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

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 0.95rem;
}

.card h3 {
  margin: 0;
  color: #475569;
  font-size: 0.9rem;
  font-weight: 600;
}

.big {
  font-size: 1.9rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0.32rem 0 0;
}

.badge {
  display: inline-flex;
  margin: 0.32rem 0 0;
  border-radius: 999px;
  padding: 0.28rem 0.68rem;
  font-size: 0.92rem;
  font-weight: 700;
  text-transform: capitalize;
}

.moyen {
  color: #92400e;
  background: #fef3c7;
}

.élevé {
  color: #991b1b;
  background: #fee2e2;
}

.faible {
  color: #166534;
  background: #dcfce7;
}

.panel {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 0.9rem;
}

.panel h3 {
  margin: 0 0 0.65rem;
  color: #0f172a;
}

.chart-help {
  margin: 0 0 0.5rem;
  color: #64748b;
  font-size: 0.88rem;
}

.chart-wrap {
  height: 280px;
}

.recommendations {
  margin: 0;
  padding-left: 1rem;
  color: #334155;
}

.recommendations li + li {
  margin-top: 0.42rem;
}

.btn-primary {
  margin-top: 1rem;
  border: none;
  border-radius: 8px;
  padding: 0.68rem 0.95rem;
  background: #0f5ed7;
  color: #ffffff;
  cursor: pointer;
  font-weight: 600;
}
</style>