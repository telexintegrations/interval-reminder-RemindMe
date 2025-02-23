const { waterBenefits } = require("./db")

const getRandomWaterBenefit = () => {
  return waterBenefits[Math.floor(Math.random() * waterBenefits.length)];
};

module.exports = { getRandomWaterBenefit }