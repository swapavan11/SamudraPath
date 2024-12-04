import axios from "axios";

const MAPBOX_API_TOKEN = "your_mapbox_api_token_here";

export const validateWaterBody = async (lat, lng) => {
  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_API_TOKEN}`
    );

    const features = response.data.features;
    if (features && features.length > 0) {
      const isWaterBody = features.some((feature) =>
        ["water", "ocean"].includes(feature.place_type[0])
      );
      return isWaterBody;
    }

    return false; // Not a water body
  } catch (error) {
    console.error("Error validating water body:", error);
    return false;
  }
};
