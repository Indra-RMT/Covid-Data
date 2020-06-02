class SinggleData extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({
      mode: 'open',
    });

    this.numberWithCommas = (number) => {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
  }

  set data(covid) {
    this._country = covid.country;
    this._confirmed = covid.confirmed.value;
    this._active = covid.active;
    this._recovered = covid.recovered.value;
    this._deaths = covid.deaths.value;
    this._percentageActive = covid.percentageActive;
    this._percentageRecovered = covid.percentageRecovered;
    this._percentageDeaths = covid.percentageDeaths;
    this._lastUpdate = covid.lastUpdate.slice(0, 10);
    this._chart = {
      datasets: [{
        data: [
          covid.percentageActive,
          covid.percentageRecovered,
          covid.percentageDeaths,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 2,
      }],
      labels: [
        'Active',
        'Recovered',
        'Deaths',
      ],
    };
    this.render();
  }

  renderError(message) {
    console.log(message);
  }

  render() {
    this.shadowDOM.innerHTML = `
      <style>
       #container {
        display: flex;
        flex-flow: column;
        box-shadow: 0px 4px 5px 1px rgba(151, 149, 149, 0.4);
        padding: 0px 0px 10px 0px;
        margin-bottom: 10px
      }
  
      #heading {
        width: 100%;
        background-color: #ffffff;
        border-left: 6px solid #004a7c;
        border-top: 2px solid #004a7c;
        border-right: 6px solid #004a7c;
        border-bottom: 2px solid #004a7c;
        border-radius: 5px 5px 5px 5px;
        margin-left: -5px;
        padding-right: 20px;
        padding: 10px 0px 10px 0px;
        color: #005691;
        font-weight: 700;
        text-align: center;
        display: inline-block;
      }

      .singgle-country {
        font-size: 30px;
      }

      #country-info {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
        position: static;
        margin: 30px 35px 25px 35px;
        font-size: 18px;
      }

      .accumulation-text {
        font-size: 19px;
      }

      .box {
        flex-basis: 50%;
        line-height: 2;
      }

      .box-2 {
        flex-basis: 50%;
      }

      #pie-chart {
        width: 100%;
      }

      .padding-colon {
        padding: 0px 10px;
      }

      #last-update {
        text-align: right;
        margin: 20px 0px -5px 0px;
        border-top: 1px solid #e8f1f5;
        color: #979595;
        margin-right: 5px;
      }

      .percentage {
        color: #808080;
      }

      table {
        margin-top: 10px;
      }

      @media screen and (max-width: 750px) {
        #country-info {
          flex-direction: column;
          position: static;
          margin: 10px 0px 5px 0px;
        }

        .box {
          flex-basis: 100%;
        }

        .box-2 {
          flex-basis: 100%;
          margin-top: 30px;  
        }

        #pie-chart {
          width: 100%;
          margin: 0px;
          padding: 0px;
        }
      }
      </style>
      
      <div id="container">
        <div id="heading"><b class="singgle-country">${this._country}</b></div>
        <div id="country-info">
          <div class="box">
            <b><span class="accumulation-text">Accumulation of cases :</span>
            </b>
            <table>
              <tr>
                <td>Confirmed</td>
                <td class="padding-colon"> : </td>
                <td>${this.numberWithCommas(this._confirmed)}</td>
              </tr>
              <tr>
                <td>Active</td>
                <td class="padding-colon"> : </td>
                <td>${this.numberWithCommas(this._active)} 
                  <span class="percentage">
                    (${this._percentageActive.toFixed(2)}%)
                  </span>
                </td>
              </tr>
              <tr>
                <td>Recovered</td>
                <td class="padding-colon"> : </td>
                <td>${this.numberWithCommas(this._recovered)}
                  <span class="percentage">
                    (${this._percentageRecovered.toFixed(2)}%)
                  </span>
                </td>
              </tr>
              <tr>
                <td>Deaths</td>
                <td class="padding-colon"> : </td>
                <td>${this.numberWithCommas(this._deaths)}
                  <span class="percentage">
                    (${this._percentageDeaths.toFixed(2)}%)
                  </span>
                </td>
              </tr>
            </table>
          </div>
          <div class="box-2">
            <canvas id="pie-chart"></canvas>
          </div>
        </div>
        <div id="last-update">
          <small>Last Update : ${this._lastUpdate}</small>
        </div>
      </div>
    `;

    const pieChartElement = this.shadowDOM.getElementById('pie-chart');

    this._pieChart = new Chart(pieChartElement, {
      type: 'pie',
      data: this._chart,
      options: {
        backgroundColor: 'rgba(251, 85, 85, 0.4)',
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              const percentage =
                (data.datasets[tooltipItem.datasetIndex]
                    .data[tooltipItem.index]).toFixed(2);
              return `${percentage}%`;
            },
          },
        },
      },
    });
  }
}

customElements.define('singgle-data', SinggleData);
