class HeaderImage extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({
      mode: "open"
    });
  }

  set data(covid) {
    const numberWithCommas = number => {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const percentageRecovered = covid.recovered.value / covid.confirmed.value * 100;
    const percentageDeaths = covid.deaths.value / covid.confirmed.value * 100;

    this._confirmed = numberWithCommas(covid.confirmed.value);
    this._recovered = numberWithCommas(covid.recovered.value);
    this._deaths = numberWithCommas(covid.deaths.value);
    this._percentageRecovered = percentageRecovered;
    this._percentageDeaths = percentageDeaths;

    this.render();
  }

  set allCountry(allCountry) {

    this._arrCountry = allCountry.countries.map(r => {
      return `<option id="${r.name}">${r.name}</option>`;
    }).join();

    this.render();
  }

  renderError(message) {
    console.log(message);
  }

  set clickEvent(event) {
    this._clickEvent = event;
  }

  set refreshInput(e) {
    this._clickEventRefresh = e;
  }

  set refresh(e) {
    this.shadowDOM.querySelector("#searchElement").value = e;
  }

  get value() {
    return this.shadowDOM.querySelector("#searchElement").value;
  }

  render() {
    this.shadowDOM.innerHTML = `
      <style>
        #container {
          display: flex;
          flex-flow: column;
          box-shadow: 0px 1px 5px 1px rgba(151, 149, 149, 0.2);
          padding: 10px 0px 10px 0px;
          margin-bottom: 60px;
          margin-top: 58px;
          height: 400px;
          flex-direction: row;
          background-image: url("./src/images/header-image.jpg");
          background-size: cover;
          background-position: center;
        }

        .box {
          flex-basis: 55%;
        }

        .box-2 {
          flex-basis: 45%;
        }

        .main-text {
          display: flex;
          flex-direction: column;
          margin-left: 8%;
          margin-top: 30px;
        }

        .accumulation {
          display: flex;
          justify-content: center;
          flex-direction: column;
          margin-left: 40%;
          margin-top: 50px;
        }

        .accumulation-text {
          padding: 11px 15px;
          margin: 15px 0px;
          border-top: 2px solid #ffffff;
          border-bottom: 2px solid #ffffff;
          border-left: 8px solid #ffffff;
          color: #ffffff;
          font-size: 27px;
        }

        .info-text {
          color: #ffffff;
          border-bottom: 1px solid #ffffff;
          border-left: 5px solid #ffffff;
          margin: -15px 0px 0px 20px;
          font-size: 15px;
          padding: 3px 3px 3px 10px;
          background-color: #10306C;
        }

        h1 {
          font-size: 50px;
          color: white;
        }

        .select-country {
          font-size: 30px;
          color: white;
          margin-top: 40px;
        }

        #checkButtonElement {
          border: none;
          padding: 0px 5px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          margin: 4px 2px;
          transition-duration: 0.4s;
          cursor: pointer;
          background-color: white;
          color: black;
          border: 2px solid #555555;
          border-radius: 4px;
        }

        .input-area {
          display: inline;
        }

        .centerize-world-data {
          display: none;
        }

        @media screen and (max-width: 1060px) {
          #container {
            display: flex;
            flex-flow: row;
            box-shadow: 0px 1px 5px 1px rgba(151, 149, 149, 0.2);
            padding: 10px 0px 10px 0px;
            margin-bottom: 20px;
            height: 400px;
            flex-direction: row;
          }
  
          .box {
            flex-basis: 50%;
          }
  
          .box-2 {
            flex-basis: 50%;
          }

          .select-country {
            margin-top: 20px;
          }
        }

        @media screen and (max-width: 1015px) {
          #container {
            display: flex;
            flex-flow: row;
            box-shadow: 0px 1px 5px 1px rgba(151, 149, 149, 0.2);
            padding: 10px 0px 10px 0px;
            margin-bottom: 20px;
            height: 400px;
          }
  
          .box {
            flex-basis: 100%;
          }
  
          .box-2 {
            display: none;
          }

          .main-text {
            margin: -10px 35px 10px 35px;
          }

          h1 {
            font-size: 42px;
          }

          .centerize-world-data {
            display: flex;
            flex-flow: row;
            text-align: center;
            font-size: 25px;
            color: white;
          }
          
          .box-wold {
            flex-basis: 33%;
            border-top: 1px solid #ffffff;
            border-bottom: 1px solid #ffffff;
            border-left: 3px solid #ffffff;
            border-right: 3px solid #ffffff;
            padding: 4px 0px;
          }

          .box-wold-text {
            font-size: 20px;
          }
          
          .select-country {
            margin-top: 50px;
            font-size: 25px;
          } 
        }
        
        @media screen and (max-width: 750px) {
          #container {
            display: flex;
            flex-flow: row;
            box-shadow: 0px 1px 5px 1px rgba(151, 149, 149, 0.2);
            padding: 10px 0px 10px 0px;
            margin-bottom: 20px;
            height: 400px;
            flex-direction: column;
          }
  
          .box {
            flex-basis: 100%;
          }
  
          .box-2 {
            flex-basis: 100%;
          }

          .main-text {
            margin: -10px 25px 10px 25px;
          }

          h1 {
            font-size: 40px;
          }
        }
        
        @media screen and (max-width: 660px) {
          #container {
            margin-top: 85px;
          }

          .centerize-world-data {
            display: flex;
            flex-flow: column;
            text-align: center;
            font-size: 20px;
            color: white;
            margin-top: -10px;
          }
          
          .box-world {
            flex-basis: 33%;
            border-top: 1px solid #ffffff;
            border-bottom: 1px solid #ffffff;
            border-left: 3px solid #ffffff;
            border-right: 3px solid #ffffff;
          }

          .main-text {
            margin: -20px 25px 0px 25px;
          }

          h1 {
            font-size: 30px;
          }

          .select-country {
            margin-top: 20px;
            font-size: 25px;
          }
        }

        @media screen and (max-width: 414px) {
          #container {
            margin-top: 110px;
          }
        }
      </style>
      
      <div id="container">
        <div class="bg-image"></div>
        <div class="box main-text">
          <h1>Updates on cases and deaths around the world.</h1>
          <br>
          <div class="centerize-world-data">
            <div class="box-wold">
              <b>${this._confirmed} <br> <span class="box-wold-text">Confirmed</span></b>
            </div>
            <div class="box-wold">
              <b>${this._recovered} <br> <span class="box-wold-text">Recovered (${this._percentageRecovered.toFixed(2)}%)</span></b>
            </div>
            <div class="box-wold">
              <b>${this._deaths} <br> <span class="box-wold-text">Deaths (${this._percentageDeaths.toFixed(2)}%)</span></b>
            </div>
          </div>
          <div class="select-country">
            <label for="searchElement"><b><u>Select country</u> :</b></label>
            <div class="input-area">
              <input value="Indonesia" list="country-list" id="searchElement" name="searchElement" />
              <datalist id="country-list">
                ${this._arrCountry}
              </datalist>
              <button id="checkButtonElement">check</button>
            </div>
          </div>
        </div>
        <div class="box-2">
          <div class="accumulation">
            <div class="accumulation-text"><b>${this._confirmed} Confirmed</b></div>
            <div class="accumulation-text"><b>${this._recovered} Recovered</b></div>
            <div class="info-text"><b>Recovery Rate ${this._percentageRecovered.toFixed(2)}%</b></div>
            <div class="accumulation-text"><b>${this._deaths} Deaths</b></div>
            <div class="info-text"><b>Fatality Rate ${this._percentageDeaths.toFixed(2)}%</b></div>
          </div>
        </div>
      </div>
    `;

    this.shadowDOM.querySelector("#checkButtonElement").addEventListener("click", this._clickEvent);
    this.shadowDOM.querySelector("#searchElement").addEventListener("click", this._clickEventRefresh);
  }
}

customElements.define("header-image", HeaderImage);