import React, { useEffect, useRef } from "react";

/**
 * Benchmarking Tasks
 * @typedef {Object} Task
 * @property {string} title
 * 
 * Industry benchmark time proportions for these tasks:
 * - Build: 40% of total time
 * - Evaluation: 30% of total time
 * - Optimization: 20% of total time
 * - Launch: 10% of total time
 */

const PHASES = {
    "Build": 0.4,
    "Evaluation": 0.3,
    "Optimization": 0.2,
    "Launch": 0.1
};

const convertTaskToChartData = (task, idPrefix = "", startDate = new Date()) => {
    let chartData = [];
    let currentDate = new Date(startDate.getTime());

    Object.entries(PHASES).forEach(([phase, proportion], index) => {
        const phaseDuration = task.totalTime * proportion;
        const phaseEnd = new Date(currentDate.getTime() + phaseDuration);

        chartData.push({
            id: idPrefix + task.title + index,
            name: task.title + " - " + phase,
            start: new Date(currentDate.getTime()),
            end: new Date(phaseEnd.getTime()),
            parent: idPrefix
        });

        currentDate = new Date(phaseEnd.getTime());
    });

    task.subtasks.forEach((subtask, index) => {
        const subtaskStartDate = new Date(currentDate.getTime());
        const subtaskChartData = convertTaskToChartData(subtask, idPrefix + task.title + index, subtaskStartDate);
        chartData = [...chartData, ...subtaskChartData];
    });

    return chartData;
};

const GoogleGanttChart = ({ tasks }) => {
    const chartElement = useRef(null);

    useEffect(() => {
        const google = window.google;
        google.charts.load('current', {'packages':['gantt']});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            let data = new google.visualization.DataTable();
            data.addColumn('string', 'Task ID');
            data.addColumn('string', 'Task Name');
            data.addColumn('date', 'Start Date');
            data.addColumn('date', 'End Date');
            data.addColumn('number', 'Duration');
            data.addColumn('number', 'Percent Complete');
            data.addColumn('string', 'Dependencies');

            let chartData = [];
            tasks.forEach((task, index) => {
                const taskChartData = convertTaskToChartData(task, "task" + index);
                chartData = [...chartData, ...taskChartData];
            });

            data.addRows(chartData);

            let chart = new google.visualization.Gantt(chartElement.current);

            chart.draw(data);
        }
    }, [tasks]);

    return <div ref={chartElement} />;
};

export default GoogleGanttChart;
