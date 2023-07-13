import { DateTime } from 'luxon';

/**
 * TODO:
 * Date range: March 15, 2022 - April 12, 2022 (50.00%)
 * Total number of scenarios: 1000
 * Minimum completion time: 10 weeks
 * Maximum completion time: 16 weeks
 * Average completion time: 13 weeks
 * Standard deviation of completion time: 1.5 weeks
 */

/**
 * Monte Carlo simulation is a statistical method that uses random sampling 
 * to simulate the uncertainty in project parameters and estimate project completion. 
 * It generates multiple scenarios based on a range of inputs, such as resource 
 * availability and task duration, and calculates the probability of project completion 
 * within a specified time frame.
 * @param {*} methodology 
 * @param {*} velocity 
 * @param {*} capacity 
 * @param {*} complexity 
 * @param {*} idealStart 
 * @param {*} workHoursPerDay 
 * @param {*} numSimulations 
 * @returns 
 */

function monteCarlo(methodology, capacity, velocity, complexity, idealStart, numSimulations = 100) {
  const maxDays = 14;
  const startDate = DateTime.fromJSDate(idealStart).set({ hour: 8 });
  const probableDates = [];

  function logNormalRandom(mean, stdDev) {
    const mu = Math.log(mean * mean / Math.sqrt(stdDev * stdDev + mean * mean));
    const sigma = Math.sqrt(Math.log(stdDev * stdDev / (mean * mean) + 1));
    return Math.exp(mu + sigma * normalRandom());
  }

  function normalRandom() {
    let u = 0, v = 0;
    while(u === 0) u = Math.random();
    while(v === 0) v = Math.random();
    const normal = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return normal;
  }

  for (let i = 0; i < numSimulations; i++) {
    const projectPoints = Math.max(0, Math.round(logNormalRandom(complexity, complexity * 0.2)));

    if (methodology === 'Agile') {
      const sprintDuration = Math.ceil(projectPoints / velocity);
      const endDate = startDate.plus({ days: sprintDuration - 1 });

      probableDates.push({
        date: endDate.toLocaleString(DateTime.DATE_FULL),
        probability: ((numSimulations - probableDates.length) / numSimulations * 100).toFixed(2),
        mean: sprintDuration,
        stdDev: Math.sqrt(projectPoints) / velocity,
        min: Math.ceil(projectPoints * 0.5 / velocity),
        max: Math.ceil(projectPoints * 1.5 / velocity),
        startDate: startDate.toLocaleString(DateTime.DATE_FULL),
        endDate: endDate.toLocaleString(DateTime.DATE_FULL),
        index: i,
      });

    } else if (methodology === 'Kanban') {
      const leadTime = Math.max(0, Math.round(logNormalRandom(1, 0.2))); // in weeks
      const cycleTime = Math.max(0, Math.round(logNormalRandom(projectPoints / capacity, projectPoints / capacity * 0.2))); // in weeks
      const sprintDuration = Math.ceil((leadTime + cycleTime) * 7 / 5);
      const endDate = startDate.plus({ days: sprintDuration - 1 });

      probableDates.push({
        date: endDate.toLocaleString(DateTime.DATE_FULL),
        probability: ((numSimulations - probableDates.length) / numSimulations * 100).toFixed(2),
        mean: sprintDuration,
        stdDev: Math.sqrt((leadTime + cycleTime) * 7 / 5) * 24,
        min: Math.ceil(((leadTime + cycleTime) * 7 / 5) * 0.5),
        max: Math.ceil(((leadTime + cycleTime) * 7 / 5) * 1.5),
        startDate: startDate.toLocaleString(DateTime.DATE_FULL),
        endDate: endDate.toLocaleString(DateTime.DATE_FULL),
        index: i,
      });
    }

    if (probableDates.length === 3) {
      break;
    }
  }

  console.log(JSON.stringify(probableDates));
  return probableDates;
}

module.exports = monteCarlo;
