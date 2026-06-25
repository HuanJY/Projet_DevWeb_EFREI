import { defineStore } from "pinia";
import { getCompany, updateCompany } from "../services/companyService";
import { getAssets, createAsset, updateAsset, deleteAsset } from "../services/assetService";
import { getVulnerabilities, createVulnerability, deleteVulnerability } from "../services/vulnerabilityService";
import { calculateRisk } from "../services/riskService";

export const useCyberStore = defineStore("cyber", {
  state: () => ({
    company: {},
    assets: [],
    vulnerabilities: [],
    risk: null
  }),
  getters: {
    totalAssets: (s) => s.assets.length,
    totalVulnerabilities: (s) => s.vulnerabilities.length
  },
  actions: {
    async fetchCompany() {
      this.company = await getCompany();
    },
    async saveCompany(data) {
      this.company = await updateCompany(data);
    },
    async fetchAssets() {
      this.assets = await getAssets();
    },
    async addAsset(data) {
      const asset = await createAsset(data);
      this.assets.push(asset);
    },
    async editAsset(id, data) {
      const updated = await updateAsset(id, data);
      const idx = this.assets.findIndex((a) => a.id === id);
      if (idx !== -1) this.assets[idx] = updated;
    },
    async removeAsset(id) {
      await deleteAsset(id);
      this.assets = this.assets.filter((a) => a.id !== id);
    },
    async fetchVulnerabilities() {
      this.vulnerabilities = await getVulnerabilities();
    },
    async addVulnerability(data) {
      const v = await createVulnerability(data);
      this.vulnerabilities.push(v);
    },
    async removeVulnerability(id) {
      await deleteVulnerability(id);
      this.vulnerabilities = this.vulnerabilities.filter((v) => v.id !== id);
    },
    async fetchRisk() {
      this.risk = await calculateRisk();
    }
  }
});