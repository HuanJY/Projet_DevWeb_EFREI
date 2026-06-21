<template>
  <div class="layout">
    <aside class="sidebar">
      <h2>CyberTwin</h2>
      <nav>
        <RouterLink to="/">Accueil</RouterLink>
        <RouterLink to="/entreprise">Entreprise</RouterLink>
        <RouterLink to="/actifs">Actifs</RouterLink>
        <RouterLink to="/vulnerabilites">Vulnerabilites</RouterLink>
        <RouterLink to="/dashboard">Dashboard</RouterLink>
        <RouterLink to="/rapport">Rapport</RouterLink>
      </nav>
    </aside>
    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 260px 1fr;
}
.sidebar {
  background: linear-gradient(180deg, #0f172a, #1e293b);
  color: #fff;
  padding: 24px;
}
.sidebar nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 18px;
}
.sidebar a {
  color: #cbd5e1;
  text-decoration: none;
}
.sidebar a.router-link-active {
  color: #fff;
  font-weight: 700;
}
.content {
  padding: 24px;
  background: #f8fafc;
}
@media (max-width: 900px) {
  .layout { grid-template-columns: 1fr; }
}
</style>