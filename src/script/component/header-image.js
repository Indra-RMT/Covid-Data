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
          margin: 58px 0px 60px; 0px;
          height: 450px;
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
          margin-top: 25px;
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
          margin: 19px 0px;
          border-top: 2px solid #ffffff;
          border-bottom: 2px solid #ffffff;
          border-left: 8px solid #ffffff;
          color: #ffffff;
          font-size: 27px;
          border-radius: 5px 0px 0px 5px;
        }

        .info-text {
          color: #ffffff;
          border-bottom: 1px solid #ffffff;
          border-left: 5px solid #ffffff;
          margin: -20px 0px 0px 20px;
          font-size: 15px;
          padding: 3px 3px 3px 10px;
          background-color: #14213C;
          border-radius: 0px 0px 0px 4px;
        }

        h1 {
          font-size: 55px;
          color: white;
        }        

        .centerize-world-data {
          display: none;
        }

        input[name="searchElement"] {
          padding: 13px;
          border: 0;
          border-bottom: 1px solid #14213C;
          font-weight: bold;
          font-size: 17px;
          display: inline;
          border-radius: 2px;
          width: 71%;
          font-family : inherit;
          margin-left: auto;
        }

        input[list] {
          font-family : inherit;
        }

        #checkButtonElement {
          padding: 13px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          background-color: white;
          border: 0;
          border-radius: 2px;
          font-weight: bold;
          font-size: 17px;
          width: 23%;
          background-color: #F66283;
          margin-left: auto;
        }

        .select-country {
          margin-top: 40px;
          max-width: 800px;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
          padding: 5px;
          border-radius: 5px;
          display: flex;
          top: 10px;
          background-color: white;
          -webkit-box-shadow: 6px 5px 5px 3px rgba(0,0,0,0.25);
          -moz-box-shadow: 6px 5px 5px 3px rgba(0,0,0,0.25);
          box-shadow: 6px 5px 5px 3px rgba(0,0,0,0.25);
        }
        
        input:focus {
          outline: 0;
          border-bottom: 2px solid #14213C;
        }
        
        input:focus::placeholder {
          font-weight: bold;
        }

        .block-choose {
          background-color: #281E3C;
          position: absolute;
          margin-top: -26px;
          padding: 4px 5px;
          color: white;
          border-radius: 3px;
          font-size: 15px;
          z-index: 2;
          -webkit-box-shadow: 4px 3px 4px 3px rgba(0,0,0,0.25);
          -moz-box-shadow: 4px 3px 4px 3px rgba(0,0,0,0.25);
          box-shadow: 4px 3px 4px 3px rgba(0,0,0,0.25);
        }
        
        @media screen and (max-width: 1317px) {  
          .select-country {
            margin-top: -29px;
          }
        }

        @media screen and (max-width: 1060px) {  
          .box {
            flex-basis: 50%;
          }
  
          .box-2 {
            flex-basis: 50%;
          }
        }

        @media screen and (max-width: 1020px) {  
          .main-text {
            margin-left: 4%;
          }
        }

        @media screen and (max-width: 880px) {  
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
            font-size: 47px;
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
            padding: 4px 2px;
            border-radius: 5px;
            margin: 2px;
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
          .box {
            flex-basis: 100%;
          }
  
          .box-2 {
            flex-basis: 100%;
          }

          .main-text {
            margin: -10px 25px 10px 25px;
          }

          .select-country {
            margin-top: 70px;
          }
        }
        
        @media screen and (max-width: 667px) {
          #container {
            margin-top: 68px;
          }

          .centerize-world-data {
            display: flex;
            flex-flow: column;
            text-align: center;
            font-size: 20px;
            color: white;
            margin-top: -20px;
          }
          
          .box-world {
            flex-basis: 33%;
            border-top: 1px solid #ffffff;
            border-bottom: 1px solid #ffffff;
            border-left: 3px solid #ffffff;
            border-right: 3px solid #ffffff;
          }

          .main-text {
            margin: 0px 25px 0px 25px;
          }

          h1 {
            font-size: 39px;
          }

          .select-country {
            margin-top: 40px;
          }
        }

        @media screen and (max-width: 522px) {
          .select-country {
            -webkit-box-shadow: 4px 2px 5px 3px rgba(0,0,0,0.25);
            -moz-box-shadow: 4px 2px 5px 3px rgba(0,0,0,0.25);
            box-shadow: 4px 2px 5px 3px rgba(0,0,0,0.25);
          }
        }

        @media screen and (max-width: 399px) {
          #container {
            margin-top: 110px;
          }

          #checkButtonElement {
            padding: 2px;
          }
        }

        @media screen and (max-width: 382px) {
          h1 {
            font-size: 35px;
          }

          .select-country {
            margin-top: 60px;
          }
        }

        @media screen and (max-width: 348px) {
          #container {
            margin-top: 100px;
          }

          h1 {
            font-size: 32px;
            margin-bottom: 40px;
          }
        }

        @media screen and (max-width: 324px) {
          h1 {
            font-size: 30px;
            margin-bottom: 47px;
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
            <div class="block-choose">Choose Country</div>
            <input value="Indonesia" list="country-list" id="searchElement" name="searchElement" placeholder="">
            <datalist id="country-list">
              ${this._arrCountry}
            </datalist>
            <button id="checkButtonElement">check</button>
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