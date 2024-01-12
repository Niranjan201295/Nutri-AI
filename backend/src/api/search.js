const axios = require('axios');
const dotenv= require('dotenv');
dotenv.config({ path: '../api_keys.env' });

// To read from JSON file: 
const fs = require('fs').promises;

const searchWithLocationId = async (locationId) => {

    // Search API Call
    apiKey= process.env.RAPID_API_KEY;
    if (!apiKey) {
      console.error({ message: "API key is missing" });
    }
    const encodedParams = new URLSearchParams();
    encodedParams.set('location_id', locationId);
    encodedParams.set('language', 'en_US');
    encodedParams.set('currency', 'USD');
    encodedParams.set('offset', '0');

    const options = {
      method: 'POST',
      url: 'https://restaurants222.p.rapidapi.com/search',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'restaurants222.p.rapidapi.com'
      },
      data: encodedParams,
    };

    try {
        const response = await axios.request(options);
        res_data = response.data;
        search_results_arr= res_data.results.data;
        return search_results_arr;
      }
      catch (error) {
          console.error("Error getting search results", error);
          throw error;
      }


    // Search response from JSON File

    // try {
    // const data = await fs.readFile('src/data/los_angeles_output.json', 'utf8');
    // const jsonData = JSON.parse(data);
    // return jsonData.results.data;
    // }
    // catch(error) {
    //     console.error("Error getting search details", error);
    //     throw error;
    // }
};

module.exports = { searchWithLocationId };
