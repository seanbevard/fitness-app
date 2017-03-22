// Create dataset for chart from variables

var data = {
	labels:["01-02-17", "01-03-17","01-05-17","01-07-17"],
	// Need an array returned of each date weight was logged. i.e. 
		   // ["01-02-07", "01-03-17"]
	datasets: [
		{
			data:["120","118","115","114"],
			// Need array of weights that were input
			fill: false,
			backgroundColor: "gold",
			pointBorderColor: "purple",
			pointHoverBorderWidth: 2,
			tension: 0.1,

		}
	]
			

};
// Different optons to adjust chart created
var options = {

		title:{
			display: true,
			text: "Your Weight Loss Over Time",
		},
		legend:{
			display: false,
		},
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }


// Initialize chart
var ctx = document.getElementById("myChart");

// Create line chart
var myChart = new Chart(ctx, {
	type: 'line',
    data: data,
    options: options
});