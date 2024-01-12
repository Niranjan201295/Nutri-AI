const express = require('express');
const axios = require('axios');
const dotenv= require('dotenv');
dotenv.config({ path: './api_keys.env' });
const { getTypeaheadLocationId } = require('./api/typeahead');
const { searchWithLocationId } = require ('./api/search');
const { getDetailsForLocation } = require('./api/detail');


// To read from JSON file: 
const fs = require('fs');


const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Nutri-AI!'));

// get location_id of place from Typeahead API: 

typeahead_res={};

// fs.readFile('typeahead_output.json', 'utf8', (err, data) => {
//   console.log("Inside read file");
//   if (err) {
//     console.log("Error reading file");
//   }
//   try {
//     const jsonData = JSON.parse(data);
//     typeahead_res= jsonData;
//     console.log(typeahead_res.results.data[0].result_object.location_id);
//   } catch (parseError) {
//     typeahead_res= {"error": "Error parsing JSON"}
//   }
// });

app.get('/getLocationDetails/:locationName', async (req, res) => {
    try {
      // apiKey= process.env.RAPID_API_KEY;
      // if (!apiKey) {
      //   return res.status(401).json({ message: "API key is missing" });
      // }
      // const encodedParams = new URLSearchParams();
      // encodedParams.set('q', req.params.locationName);
      // encodedParams.set('language', 'en_US');
      
      // const options = {
      //   method: 'POST',
      //   url: 'https://restaurants222.p.rapidapi.com/typeahead',
      //   headers: {
      //     'content-type': 'application/x-www-form-urlencoded',
      //     'X-RapidAPI-Key': apiKey,
      //     'X-RapidAPI-Host': 'restaurants222.p.rapidapi.com'
      //   },
      //   data: encodedParams,
      // };
      // const response = await axios.request(options);
      // res.setHeader('Content-Type', 'application/json');
      // res.json(response.data);
      // typeahead_res= response.data;
      // location_id= typeahead_res.results.data[0].result_object.location_id;
      // console.log(location_id);

      const locationName= req.params.locationName;
      const locationId= await getTypeaheadLocationId(locationName);
      const searchResponse= await searchWithLocationId(locationId);
      const locationIds= searchResponse.map(item=> item.location_id);
      const detailResponsePromises= locationIds.map(id => getDetailsForLocation(id));
      const detailsResponse= await Promise.all(detailResponsePromises);
      res.json(detailsResponse);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

app.listen(port, () => console.log(`Server running on port ${port}`));
