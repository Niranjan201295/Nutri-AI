const axios = require('axios');
const dotenv= require('dotenv');
dotenv.config({ path: '../api_keys.env' });

// To read from JSON file: 
const fs = require('fs').promises;

const getTypeaheadLocationId = async (locationName) => {

    // Typeahead API Call
    try {
      apiKey= process.env.RAPID_API_KEY;
      if (!apiKey) {
        console.error({ message: "API key is missing" });
      }
      const encodedParams = new URLSearchParams();
      encodedParams.set('q', locationName);
      encodedParams.set('language', 'en_US');
      
      const options = {
        method: 'POST',
        url: 'https://restaurants222.p.rapidapi.com/typeahead',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'restaurants222.p.rapidapi.com'
        },
        data: encodedParams,
      };
      const response = await axios.request(options);
      typeahead_res= response.data;
      location_id= typeahead_res.results.data[0].result_object.location_id;
      return location_id;
    }
    catch (error) {
        console.error("Error getting location ID", error);
        throw error;
    }

    // Read Typeahead response from JSON File

    // try {
    // const data = await fs.readFile('src/data/typeahead_output.json', 'utf8');
    // const jsonData = JSON.parse(data);
    // const location_id = jsonData.results.data[0].result_object.location_id;
    // return location_id;
    // }
    // catch(error) {
    //     console.error("Error getting location ID", error);
    //     throw error;
    // }
};

module.exports = { getTypeaheadLocationId };
