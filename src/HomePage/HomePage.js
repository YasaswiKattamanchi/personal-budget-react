import React,{useEffect , useRef} from 'react';
import axios from 'axios';
import * as d3 from 'd3';
import Chart from 'chart.js/auto'
import '../App.scss';
//import axios,chart.js,d3js
function HomePage() {

    const chartRef = useRef(null);
    let data_p = {
        data: [],
        backgroundColor: [
            '#ffcd56',
            '#ff6384',
            '#36a2eb',
            '#fd6b19',
            "#000080", "#800080", "#808080", "#a52a2a"
        ],
        labels: []
    };
    useEffect(() => {
      // Function to create a D3 chart
      function createD3Chart(data) {
        // Clear the previous chart if it exists
        if (chartRef.current) {
          d3.select(chartRef.current).select('svg').remove();
        }
  
        var width = 330;
        var height = 330;
        var radius = Math.min(width, height) / 2;
  
        var svg = d3.select(chartRef.current)
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
  
        var color = d3.scaleOrdinal()
          .range(['#FFA07A', '#FF0000', '#FFC0CB', '#fd6b19', '#000080', '#FF00FF', '#008000', '#AFEEEE']);
  
        var pie = d3.pie()
          .value(function (d) {
            return d.budget;
          });
  
        var arc = d3.arc()
          .innerRadius(0)
          .outerRadius(radius);
  
        var arcs = svg.selectAll('arc')
          .data(pie(data))
          .enter()
          .append('g');
  
        arcs.append('path')
          .attr('d', arc)
          .attr('fill', function (d) {
            return color(d.data.title);
          });
  
        arcs.append('text')
          .attr('transform', function (d) {
            return 'translate(' + arc.centroid(d) + ')';
          })
          .attr('text-anchor', 'middle')
          .text(function (d) {
            return d.data.title;
          });
      }
  
     


  
  function createChart() {
      var ctx = document.getElementById('myChart').getContext('2d');
      const prevChart = Chart.getChart(ctx);
      if(prevChart) prevChart.destroy();
      new Chart(ctx, {
          type: 'doughnut',
          data: {
              labels: data_p.labels,
              datasets: [{
                  label: 'Budget Data',
                  data: data_p.data,
                  backgroundColor: data_p.backgroundColor,
              }]
          }
      });
  }

  // Chart.js data
  function getBudget() {
      axios.get('http://localhost:2000/budget')
          .then((res) => {
              for (var i = 0; i < res.data.myBudget.length; i++) {
                  data_p.data.push(res.data.myBudget[i].budget);
                  data_p.labels.push(res.data.myBudget[i].title);
              }
              createChart(); 
              createD3Chart(res.data.myBudget);
          })
  };
  getBudget();

  })
  return (
    <div>
          <div className="container center">

<div className="page-area">

<div className="text-box">         
<section className="text-box">
    <h1>Stay on track</h1>
    <p>
        Do you know where you are spending your money? If you really stop to track it down,
        you would get surprised! Proper budget management depends on real data... and this
        app will help you with that!
    </p>
</section>
</div>

<div className="text-box">
    <h1>Alerts</h1>
    <p>
        What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
    </p>
</div>

<div className="text-box">
    <h1>Results</h1>
    <p>
        People who stick to a financial plan, budgeting every expense, get out of debt faster!
        Also, they to live happier lives... since they expend without guilt or fear... 
        because they know it is all good and accounted for.
    </p>
</div>

<div className="text-box">
    <h1>Free</h1>
    <p>
        This app is free!!! And you are the only one holding your data!
    </p>
</div>

<div className="text-box">
    <h1>Stay on track</h1>
    <p>
        Do you know where you are spending your money? If you really stop to track it down,
        you would get surprised! Proper budget management depends on real data... and this
        app will help you with that!
    </p>
</div>

<div className="text-box">
    <h1>Alerts</h1>
    <p>
        What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
    </p>
</div>

<div className="text-box">
    <h1>Results</h1>
    <p>
        People who stick to a financial plan, budgeting every expense, get out of debt faster!
        Also, they to live happier lives... since they expend without guilt or fear... 
        because they know it is all good and accounted for.
    </p>
</div>


</div>


</div>
<div className="text-box">
        <h1>Free</h1>
        
       
    </div>
    <div className="graphs_contianer">
        <canvas id="myChart" width="400" height="400"></canvas>
        
    </div>
    <div id="chart" ref={chartRef}></div>
</div>
   
  );
}

export default HomePage;
