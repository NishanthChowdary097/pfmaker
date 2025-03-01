`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Visitor Graph</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <canvas id="visitorChart" width="400" height="200"></canvas>
    <script src="app.js"></script>
</body>
</html>
`
const dates = ['2025-02-01', '2025-02-02', '2025-02-03'];
const visitors = [120, 150, 110];

// Get the canvas element
const ctx = document.getElementById('visitorChart').getContext('2d');

// Prepare the chart data
const chartData = {
    labels: ['2025-02-01', '2025-02-02', '2025-02-03'], // Dates
    datasets: [{
        label: 'Number of Visitors', // Label for the line
        data: [120, 150, 110], // Visitor numbers
        borderColor: 'rgba(75, 192, 192, 1)', // Line color
        borderWidth: 2,
        fill: false // No fill under the line
    }]
};

// Create the chart
const visitorChart = new Chart(ctx, {
    type: 'line', // Line chart
    data: chartData,
    options: {
        responsive: true,
        scales: {
            x: {
                type: 'category', // Dates on the x-axis
                title: {
                    display: true,
                    text: 'Date'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Number of Visitors'
                }
            }
        }
    }
});
