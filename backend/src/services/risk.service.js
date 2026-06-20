function calculateRisk(assets, vulnerabilities) {
  const totalAssets = assets.length;
  const totalVulns = vulnerabilities.length;

  const criticalityWeights = { faible: 1, moyenne: 2, 'élevée': 3 };

  const vulnScore = vulnerabilities.reduce((sum, v) => {
    return sum + (criticalityWeights[v.criticality] || 1);
  }, 0);

  const exposedAssetsCount = assets.filter(a => a.exposedToInternet).length;
  const exposureScore = exposedAssetsCount * 2;

  const rawScore = vulnScore + exposureScore + totalAssets * 0.5;

  let level = 'faible';
  if (rawScore > 15) level = 'élevé';
  else if (rawScore > 7) level = 'moyen';

  const recommendations = [];
  if (vulnerabilities.some(v => v.name?.toLowerCase().includes('mot de passe'))) {
    recommendations.push('Renforcer la politique de mots de passe et activer le MFA.');
  }
  if (vulnerabilities.some(v => v.name?.toLowerCase().includes('obsolète'))) {
    recommendations.push('Mettre à jour les logiciels obsolètes.');
  }
  if (exposedAssetsCount > 0) {
    recommendations.push("Restreindre les services exposés sur Internet au strict nécessaire.");
  }
  if (recommendations.length === 0) {
    recommendations.push('Maintenir une veille de sécurité régulière.');
  }

  return { score: rawScore, level, totalAssets, totalVulns, exposedAssetsCount, recommendations };
}

module.exports = { calculateRisk };