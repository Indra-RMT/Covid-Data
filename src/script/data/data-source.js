class DataSource {
  static async worldData() {
    try {
      const response = await fetch(`https://covid19.mathdro.id/api`);
      const responseJson = await response.json();
      return Promise.resolve(responseJson);
    } catch (message) {
      return Promise.reject(message);
    }
  }

  static async searchCountry(keyword) {
    try {
      const response = await fetch(`https://covid19.mathdro.id/api/countries/${keyword}`);
      const responseJson = await response.json();
      return Promise.resolve(responseJson);
    } catch (message) {
      return Promise.reject(message);
    }
  }

  static async getAllCountryByDate(date) {
    try {
      const response = await fetch(`https://covid19.mathdro.id/api/daily/${date}`);
      const responseJson = await response.json();
      return Promise.resolve(responseJson);
    } catch (message) {
      console.log(message);
      return Promise.reject(message);
    }
  }

  static async getAllCountryName() {
    try {
      const response = await fetch(`https://covid19.mathdro.id/api/countries`);
      const responseJson = await response.json();
      return Promise.resolve(responseJson);
    } catch (message) {
      return Promise.reject(message);
    }
  }

  static async getAllCountry() {
    try {
      const response = await fetch(`https://covid19.mathdro.id/api/countries`);
      const responseJson = await response.json();
      return Promise.resolve(responseJson);
    } catch (message) {
      return Promise.reject(message);
    }
  }
}

export default DataSource;
