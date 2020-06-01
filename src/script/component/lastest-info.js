class LastestInfo extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({
      mode: "open"
    });

    this.render();
  }

  renderError(message) {
    console.log(message);
  }

  render() {
    this.shadowDOM.innerHTML = `
      <style>
      article {
        display: flex;
        flex-flow: row;
        box-shadow: 0px 4px 5px 1px rgba(151, 149, 149, 0.4);
        margin: 70px 0px 0px 0px;
        padding: 17px 35px 17px 35px;
      }

      .box {
        flex-basis: 70%;
      }

      .box-2 {
        flex-basis: 27%;
        text-align: right;
        margin-left: auto;
      }

      .line-1 {
        margin-bottom: 10px;
      }

      button {
        padding: 13px;
        text-align: center;
        display: inline-block;
        background-color: white;
        border-radius: 2px;
        font-size: 17px;
        margin-left: auto;
        border: 2px solid #F66283;
        font-family : inherit;
      }

      @media screen and (max-width: 820px) {
        article {
          padding: 14px 21px 14px 21px;
        }
        
        .box {
          flex-basis: 70%;
        }
  
        .box-2 {
          flex-basis: 27%;
          margin-left: auto;
        }
      }

      @media screen and (max-width: 452px) {
        article {
          flex-flow: column;
          padding: 14px 15px 14px 15px;
        }

        .box {
          width: 100%;
        }
  
        .box-2 {
          margin-top: 20px;
          width: 100%;
          background-color: blue;
          text-align: center;
        }

        button {
          display: block;
          width: 100%;
        }
      }

      @media screen and (max-width: 452px) {
        article {
          margin: 20px 0px -10px 0px;
        }
      }
      </style>
      
      <article>
        <div class="box">
          <div class="line-1">COVID-19</div>
          <div class="line-2">Get the lastest information from the WHO about coronavirus.</div>
        </div>
        <div class="box-2">
          <button onclick="location.href='https://www.who.int/emergencies/diseases/novel-coronavirus-2019'">Go to Web WHO</button>
        </div>
      </article>
    `;
  }
}

customElements.define("lastest-info", LastestInfo);