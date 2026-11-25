
    const apiKey = mapToken // Replace with your Geoapify API key

    // Initialize the map
    const map = L.map('map').setView([28.0229, 73.3119], 13); // Replace with your desired coordinates

    // Add Geoapify tiles
    L.tileLayer(`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${apiKey}`, {
      
      maxZoom: 30,
    }).addTo(map);
 
