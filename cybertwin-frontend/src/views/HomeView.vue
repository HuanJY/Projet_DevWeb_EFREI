<template>
  <section class="home">
    <div class="home-bg" aria-hidden="true"></div>

    <header class="hero">
      <p class="eyebrow">CyberTwin Platform</p>
      <h1>Simulateur de risque cyber pour PME</h1>
      <p class="subtitle">
        Configure ton entreprise, ajoute les actifs, declare les vulnerabilites
        et obtiens un score de risque clair avec des recommandations actionnables.
      </p>

      <div class="actions">
        <RouterLink to="/entreprise" class="btn btn-primary">
          Demarrer la configuration
        </RouterLink>
        <RouterLink to="/dashboard" class="btn btn-ghost">
          Voir le dashboard
        </RouterLink>
      </div>
    </header>

    <section class="highlights" aria-label="Points forts">
      <article class="card">
        <h2>Inventaire structure</h2>
        <p>
          Centralise tes actifs critiques pour prioriser les zones les plus exposees.
        </p>
      </article>
      <article class="card">
        <h2>Risque calcule</h2>
        <p>
          Evalue automatiquement le niveau de risque: faible, moyen ou eleve.
        </p>
      </article>
      <article class="card">
        <h2>Actions concretes</h2>
        <p>
          Obtiens des recommandations operationnelles pour reduire rapidement ton exposition.
        </p>
      </article>
    </section>
  </section>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<style scoped>
.home {
  position: relative;
  min-height: calc(100vh - 48px);
  padding: clamp(1.25rem, 3vw, 2rem);
  border-radius: 18px;
  overflow: hidden;
  display: grid;
  align-content: center;
  gap: 1.5rem;
  border: 1px solid #dbe4f0;
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
}

.home-bg {
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image:
    linear-gradient(rgba(15, 23, 42, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15, 23, 42, 0.035) 1px, transparent 1px);
  background-size: 32px 32px;
}

.hero {
  max-width: 780px;
  animation: rise 0.6s ease-out both;
}

.eyebrow {
  margin: 0 0 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-weight: 700;
  color: #1d4ed8;
  font-size: 0.78rem;
}

.hero h1 {
  margin: 0;
  color: #0f172a;
  font-size: clamp(2rem, 5vw, 3.1rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.subtitle {
  margin-top: 0.9rem;
  max-width: 66ch;
  color: #334155;
  font-size: clamp(1rem, 2vw, 1.1rem);
  line-height: 1.55;
}

.actions {
  margin-top: 1.2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
}

.btn {
  padding: 0.72rem 1.1rem;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn-primary {
  color: #ffffff;
  background: #0f5ed7;
  box-shadow: 0 8px 18px rgba(15, 94, 215, 0.24);
}

.btn-ghost {
  color: #0f172a;
  border: 1px solid #cdd8e8;
  background: #ffffff;
}

.highlights {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.8rem;
  animation: rise 0.8s ease-out both;
  animation-delay: 0.08s;
}

.card {
  border-radius: 12px;
  padding: 1rem;
  background: #ffffff;
  border: 1px solid #dbe4f0;
}

.card h2 {
  margin: 0;
  font-size: 1rem;
  color: #0f172a;
}

.card p {
  margin-top: 0.46rem;
  line-height: 1.45;
  color: #334155;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1024px) {
  .home {
    min-height: auto;
    border-radius: 14px;
  }

  .highlights {
    grid-template-columns: 1fr;
  }
}
</style>