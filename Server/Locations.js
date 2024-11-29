const axios = require('axios');

const fetchPlacesFromOSM = async (city) => {
  try {
    const response = await axios.get(
      `https://overpass-api.de/api/interpreter`,
      {
        params: {
          data: `[out:json];
          area[name="${city}"];
          node["tourism"="attraction"](area);
          out;`
        }
      }
    );

    const places = response.data.elements;
    if (places.length === 0) {
      console.log(`No places found for ${city}`);
      return;
    }

    places.forEach(place => {
      console.log({
        name: place.tags.name || 'Unknown',
        lat: place.lat,
        lon: place.lon,
        type: place.tags.tourism
      });
    });
  } catch (err) {
    console.error(`Error fetching places for ${city}:`, err.message);
  }
};

fetchPlacesFromOSM('London');
