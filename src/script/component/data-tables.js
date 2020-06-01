class DataTables extends HTMLElement {
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
       #container {
        display: flex;
        flex-flow: column;
        box-shadow: 0px 4px 5px 1px rgba(151, 149, 149, 0.4);
        padding: 0px 0px 10px 0px;
        margin-bottom: 10px
      }

      </style>
      

    `;


  }
}

customElements.define("data-tables", DataTables);