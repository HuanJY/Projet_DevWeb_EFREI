import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CompanyView from "../views/CompanyView.vue";
import AssetsView from "../views/AssetsView.vue";
import VulnerabilitiesView from "../views/VulnerabilitiesView.vue";
import DashboardView from "../views/DashboardView.vue";
import ReportView from "../views/ReportView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/entreprise", name: "company", component: CompanyView },
  { path: "/actifs", name: "assets", component: AssetsView },
  { path: "/vulnerabilites", name: "vulnerabilities", component: VulnerabilitiesView },
  { path: "/dashboard", name: "dashboard", component: DashboardView },
  { path: "/rapport", name: "report", component: ReportView }
];

export default createRouter({
  history: createWebHistory(),
  routes
});