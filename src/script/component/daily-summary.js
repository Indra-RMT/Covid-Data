class DailySummary extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({
      mode: "open"
    });
  }

  set data(covid) {
    this._lastUpdate = covid.lastUpdate;
    this._confirmed = covid.confirmed;
    this._recovered = covid.recovered;
    this._deaths = covid.deaths;
    this.render();
  }

  renderError(message) {
    console.log(message);
  }

  render() {
    this.shadowDOM.innerHTML = `
      <style>
        #container {
          box-shadow: 0px 4px 5px 1px rgba(151, 149, 149, 0.4);
          padding: 10px 0px 10px 0px;
          margin-bottom: 10px
        }

        #summary-info {
          margin: 20px 35px 20px 35px;
        }

        .chart {
          margin: 10px 35px 5px 35px;
        }

        .daily-text {
          font-size: 19px;
        }

        #lineChart {
          width: 100%;
        }

        #lineChart{
          position: relative;
          width: 100% !important;
        }
        
        canvas {
          width: 100% !important;
        }

        @media screen and (max-width: 750px) {

          .daily-text {
            text-align: center;
            margin: 0px 0px 0px 0px;
          }

          .chart {
            margin: 20px 0px 5px 0px;
          }
        }
      </style>
      
      <div id="container">
        <div id="summary-info">
          <b><div class="daily-text">Daily Summary (Last 30 days) :</div></b>
        </div>
        <div class="chart">
          <canvas id="lineChart" ></canvas>
        </div>
      </div>
    `;

    const lineChartElement = this.shadowDOM.querySelector('#lineChart');

    const chart = new Chart(lineChartElement, {
      // The type of chart we want to create
      type: 'line',
      responsive: true,

      // The data for our dataset
      data: {
        labels: this._lastUpdate,
        datasets: [{
          label: 'Deaths',
          backgroundColor: 'rgb(255,206,85)',
          borderColor: 'rgb(255,206,85)',
          data: this._deaths
        }, {
          label: 'Recovered',
          backgroundColor: 'rgb(54,162,235)',
          borderColor: 'rgb(54,162,235)',
          data: this._recovered
        }, {
          label: 'Confirmed',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: this._confirmed
        }],
      },

      // Configuration options go here
      options: {
        legend: {
          reverse: true,
        },
        maintainAspectRatio: false,
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              var value = data.datasets[0].data[tooltipItem.index];
              if (parseInt(value) >= 1000) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
              } else {
                return value;
              }
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function (value, index, values) {
                if (parseInt(value) >= 1000) {
                  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                } else {
                  return value;
                }
              }
            }
          }]
        }
      }
    });
  }
}

customElements.define("daily-summary", DailySummary);