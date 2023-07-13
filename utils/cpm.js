/**
 * Critical Path Method (CPM) is set to determine the minimum time needed to complete a
 * project based on the ideal start date, capacity, and complexity.
 * 
 * @param {*} tasks 
 * @returns 
 */

function cpm(tasks) {
    console.log(tasks);
    // Create a mapping of tasks to their dependencies
    const dependencies = {};
    tasks.forEach((task) => {
      dependencies[task.name] = task.dependencies;
    });
  
    // Calculate the earliest start time and the earliest finish time for each task
    const earliestStartTimes = {};
    const earliestFinishTimes = {};
    tasks.forEach((task) => {
      const dependencyFinishTimes = task.dependencies.map((dependency) => earliestFinishTimes[dependency]);
      const startTime = Math.max(...dependencyFinishTimes);
      const finishTime = startTime + task.duration;
      earliestStartTimes[task.name] = startTime;
      earliestFinishTimes[task.name] = finishTime;
    });
  
    // Calculate the latest start time and the latest finish time for each task
    const latestStartTimes = {};
    const latestFinishTimes = {};
    const projectFinishTime = Math.max(...Object.values(earliestFinishTimes));
    tasks.forEach((task) => {
      const dependencyStartTimes = task.dependencies.map((dependency) => latestStartTimes[dependency]);
      const finishTime = projectFinishTime - (task.duration - earliestFinishTimes[task.name]);
      const startTime = finishTime - task.duration;
      latestStartTimes[task.name] = startTime;
      latestFinishTimes[task.name] = finishTime;
    });
  
    // Calculate the slack time for each task
    const slackTimes = {};
    tasks.forEach((task) => {
      const slackTime = latestStartTimes[task.name] - earliestStartTimes[task.name];
      slackTimes[task.name] = slackTime;
    });
  
    // Find the critical path
    const criticalPath = [];
    tasks.forEach((task) => {
      if (slackTimes[task.name] === 0) {
        criticalPath.push(task.name);
      }
    });
  
    // Calculate the minimum time needed to complete the project
    const minimumTime = Math.max(...Object.values(latestFinishTimes));
  
    return minimumTime;
  }

  module.exports = cpm;
