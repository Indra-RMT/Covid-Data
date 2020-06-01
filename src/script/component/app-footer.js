class AppFooter extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({
      mode: "open"
    });

    this.render();
  }


  render() {
    this.shadowDOM.innerHTML = `
      <style>
        .footer {
          margin-top: 40px;
          border-top: 2px solid #014A7C;
          border-bottom: 8px solid #014A7C;
          padding: 8px 10px;
          background-color: #FAFAFA;
          text-align: center;
        }

        .link {
          text-decoration: none;
        }
      </style>
      
      <div class="footer">
        <b><a href="https://dicoding.com" target="_blank" class="link">Dicoding Indonesia</a> - Indra Rahmanto - <a href="https://covid19.mathdro.id" target="_blank" class="link">covid19.mathdro.id</a></b>
      </div>
    `;
  }
}

customElements.define("app-footer", AppFooter);