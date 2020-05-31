class AppBar extends HTMLElement {

  constructor() {
    super();
    this.shadowDOM = this.attachShadow({
      mode: "open"
    });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `
    <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :host {
      display: block;
      width: 100%;
      background-color: #fafafa;
      color: #005691;
      box-shadow: 0px 2px 5px 1px rgba(151, 149, 149, 0,2);
      border-bottom: 6px solid #004a7c;
      position: fixed;
      top: 0;
    }

    .header h2 {
      float: left;
      text-align: center;
      text-decoration: none;
      line-height: 25px;
    }
    
    .header-right {
      float: right;
    }

    h2 {
      margin: 0px 20px;
      padding: 16px;
    }

    .right {
      font-size: 18px; 
    }
    
    @media screen and (max-width: 640px) {
      .header h2 {
        float: none;
        display: block;
        text-align: center;
      }
      
      .header-right {
        float: none;
        padding-top: 0px;
      }

      .right {
        margin: 0px 20px;
        padding: 6px 16px;
        margin-top: -15px;
        font-size: 16px;
      }
    }

    @media screen and (max-width: 350px) {
      .right {
        font-size: 15px;
      }
    }

    @media screen and (max-width: 332px) {
      .right {
        font-size: 14px;
      }
    }
    </style>
    <div class="header">
      <h2 class="logo">Covid Data</h2>
      <div class="header-right">
        <h2 class="right">"Be productive and stay healthy at home".</h2>
      </div>
    </div>
    `;
  }
}

customElements.define("app-bar", AppBar);