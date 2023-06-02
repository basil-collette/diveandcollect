import React, { useEffect,useState,useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import continents from '../../continents';


const MapComponent: React.FC = () => {
  interface Oceans {
    lat: number;
    lon: number;
    name: string;
  }
  const [oceans, setOceans] = useState<Oceans[]>([]);

  const getOceans = () =>  {
    const oceanList: Oceans[] = [
      { lat: 0, lon: 0, name: 'Atlantic Ocean' },
      { lat: 0, lon: 180, name: 'Pacific Ocean' },
      { lat: 0, lon: 60, name: 'Indian Ocean' },
      { lat: -30, lon: -40, name: 'Southern Ocean' },
      { lat: 30, lon: -70, name: 'Caribbean Sea' },
      { lat: 20, lon: 120, name: 'South China Sea' },
    ];
    setOceans(oceanList);
  }

  useEffect(() => {
    // let map = L.map('map').setView([0, 0], 2);
    // const map = L.map(mapContainerRef.current);
    // L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png', {
    //   minZoom :3, if(map != null)
    //   maxZoom: 5,
    //   attribution: 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors, Tiles &copy; <a href="https://carto.com/attributions">CARTO</a>',
    //   }).addTo(map);
    if(oceans.length == 0){
      getOceans();
    }
    

    const map = L.map('map',{
      zoom:2,
      minZoom:2,
      maxZoom:5,
      center: [0, 0]
    });

    L.geoJSON(continents).addTo(map);

    let oceanList = oceans;
    
    oceanList.forEach((label) => {
      L.marker([label.lat, label.lon], {
        icon: L.divIcon({
          className: "relative",
          html:`<span class="absolute top-0 left-0 text-white text-sm">${label.name}</span>`,
        }),
        
      }).addTo(map);
      
      L.circle(L.latLng(label.lat,label.lon), {
        radius: 2000000, 
        fillOpacity: 0.7,
        bubblingMouseEvents:true
      }).on("click", function (event) {
        const latLng:L.LatLng = L.latLng(event.latlng.lat,event.latlng.lng);
        map.fitBounds(L.latLngBounds(latLng,latLng));
    }).addTo(map);
  
    });
    return(() => {
      map.remove();
    })

  }, [oceans]);
  
  // return <div id="map" style={{ height: '100vh' }}></div>;
  return(

    <div id = "map" style={{ height: '100vh' }} />
  );
};

export default MapComponent;