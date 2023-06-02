import React, { useEffect,useState,useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import continents from '../../continents';
import OverlayModal from '../../components/Layouts/OverlayModal';
import { init } from 'i18next';

interface Oceans {
  id: number,
  lat: number;
  lon: number;
  name: string;
}

interface Species {
  id: number,
  url: string,
  name: string,
  location: string
}

const MapComponent: React.FC = () => {
  
  const [state, setState] = useState<{species: Species[], oceans: Oceans[], showModal: boolean, showedSpecies: Species[]}>({
    species: [],
    oceans: [],
    showModal: false,
    showedSpecies: []
  });

  const init = () => {
    fetch('http://127.0.0.1:8000/api/species').then((response) => {
      response.json().then((speciesResult: any) => {
        setState((currentStates) => {
          return ({
            ...currentStates,
            species: speciesResult["hydra:member"]
          });
        });

        console.log(speciesResult["hydra:member"]);

        setState((currentStates: any) => {
          return ({
            ...currentStates,
            oceans: [
              { id: 1, lat: 0, lon: 0, name: 'Atlantic Ocean' },
              { id: 2, lat: 0, lon: 180, name: 'Pacific Ocean' },
              { id: 3, lat: 0, lon: 60, name: 'Indian Ocean' },
              { id: 4, lat: -30, lon: -40, name: 'Southern Ocean' },
              { id: 5, lat: 30, lon: -70, name: 'Caribbean Sea' },
              { id: 6, lat: 20, lon: 120, name: 'South China Sea' },
            ]
          });
        });
      });
    });
  }

  useEffect(() => {
    if (state.oceans.length == 0 && state.species.length == 0) {
      init();
    }    

    const map = L.map('map',{
      zoom:2,
      minZoom:2,
      maxZoom:5,
      center: [0, 0]
    });

    L.geoJSON(continents).addTo(map);

    const showSpecies = (event: Oceans) => {
      const resultSpecies = state.species.filter((specie) => specie.location.includes(event.id.toString()));

      setState((currentState: any) => {
        return({
          ...currentState,
          showedSpecies: resultSpecies
        });
      });

      const latLng:L.LatLng = L.latLng(event.lat, event.lon);
      map.fitBounds(L.latLngBounds(latLng,latLng));
      setState((currentState: any) => {
        return({
          ...currentState,
          showModal: true
        });
      });
    }
    
    state.oceans.forEach((ocean) => {
      L.marker([ocean.lat, ocean.lon], {        
        icon: L.divIcon({
          className: "relative !flex flex-col justify-center items-center",
          iconSize: [100, 100],
          html:`<p class="h-auto uppercase text-white text-center text-md">${ocean.name}</p>`,
        })
      }).on("click", (event) => { showSpecies(ocean);
      }).addTo(map);
      
      L.circle(L.latLng(ocean.lat,ocean.lon), {
        radius: 2000000, 
        fillOpacity: 0.7,
        bubblingMouseEvents:true
      }).on("click", (event) => { showSpecies(event);
      }).addTo(map);
  
    });

    return(() => {
      map.remove();
    })

  }, [state.oceans, state.species]);
  
  // return <div id="map" style={{ height: '100vh' }}></div>;
  return(

    <div id = "map" style={{ height: '100vh' }}>
      { state.showModal &&
                <OverlayModal hideModal={() => {setState((currentState: any) => {
                  return({
                    ...currentState,
                    showModal: false
                  });
                });}}
                >
                  <h1 className="text-center text-white">Liste des especes</h1>
                  <div className="flex justify-center gap-5 overflow-y-auto flex-wrap">

                    {state.showedSpecies.map((specie, index) => {
                      return (
                        <div key={specie.id} className="text-white flex bg-white w-fit h-fit rounded-md overflow-hidden">
                          <img className="w-40 h-40 bg-gray-300" src={specie.url}></img>
                          <div className="flex flex-col gap-7">
                            <h1 className="text-center text-black">{specie.name}</h1>
                            <p className="text-center text-black max-w-xs self-center">Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </OverlayModal>
            }
    </div>
  );
};

export default MapComponent;