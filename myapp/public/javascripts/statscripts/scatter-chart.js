
		var color = Chart.helpers.color;
		function generateData() {
			var data = [];
			for (var i = 0; i < 7; i++) {
				data.push({
					x: randomScalingFactor(),
					y: randomScalingFactor()
				});
			}
			return data;
		}

		var scatterChartData = {
			datasets: [{
				label: 'First dataset',
				//borderColor: window.chartColors.red,
				backgroundColor: color(window.chartColors.red).alpha(0.2).rgbString(),
        pointBorderColor: window.chartColors.red,
        borderColor: "rgba(0,0,0,0)",
        fill: false,
        data: generateData()
			}, {
				label: 'Second dataset',
				//borderColor: window.chartColors.blue,
        backgroundColor: color(window.chartColors.blue).alpha(0.2).rgbString(),
        pointBorderColor: window.chartColors.blue,
        borderColor: "rgba(0,0,0,0)",
        fill: false,
        data: generateData()
			}]
		};

		window.onload = function() {
			var ctx = document.getElementById('scatter-chart').getContext('2d');
			window.myScatter = Chart.Scatter(ctx, {
				data: scatterChartData,
				options: {
					title: {
						display: true,
						//text: 'Scatter Chart'
					},
				}
			});
		};

		document.getElementById('randomizeData').addEventListener('click', function() {
			scatterChartData.datasets.forEach(function(dataset) {
				dataset.data = dataset.data.map(function() {
					return {
						x: randomScalingFactor(),
						y: randomScalingFactor()
					};
				});
			});
			window.myScatter.update();
		});
	