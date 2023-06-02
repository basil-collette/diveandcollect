import React, { useEffect,useState,useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import continents from '../../continents';
import OverlayModal from '../../components/Layouts/OverlayModal';

const MapComponent: React.FC = () => {
  interface Oceans {
    lat: number;
    lon: number;
    name: string;
  }
  const [oceans, setOceans] = useState<Oceans[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

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

    const showSpecies = (event: any) => {
      const latLng:L.LatLng = L.latLng(event.latlng.lat,event.latlng.lng);
      map.fitBounds(L.latLngBounds(latLng,latLng));
      setShowModal(true);
    }
    
    oceanList.forEach((label) => {
      L.marker([label.lat, label.lon], {        
        icon: L.divIcon({
          className: "relative !flex flex-col justify-center items-center",
          iconSize: [100, 100],
          html:`<p class="h-auto uppercase text-white text-center text-md">${label.name}</p>`,
        })
      }).on("click", (event) => { showSpecies(event);
      }).addTo(map);
      
      L.circle(L.latLng(label.lat,label.lon), {
        radius: 2000000, 
        fillOpacity: 0.7,
        bubblingMouseEvents:true
      }).on("click", (event) => { showSpecies(event);
      }).addTo(map);
  
    });
    return(() => {
      map.remove();
    })

  }, [oceans]);
  
  // return <div id="map" style={{ height: '100vh' }}></div>;
  return(

    <div id = "map" style={{ height: '100vh' }}>
{ showModal &&
                <OverlayModal hideModal={() => {setShowModal(false)}} >
                    <h1 className="text-center text-white">Liste des especes</h1>
                  <div className="flex justify-center gap-5 overflow-y-auto flex-wrap">
                    <div className="text-white flex bg-white w-fit h-fit rounded-md overflow-hidden">
                      <img className ="" src ="data:image/jpeg;base64,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"></img>
                        <div className ="flex flex-col gap-7">
                          <h1 className="text-center text-black">Poisson</h1>
                          <p className="text-center text-black max-w-xs self-center">Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</p>
                        </div>
                    </div>
                    <div className="text-white flex bg-white w-fit h-fit rounded-md overflow-hidden">
                      <img className ="" src ="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhAVFhUVFRUVFRUWFRUVFRUVFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NDg0NDisZFRktKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQMEBQYCBwj/xABCEAACAQIEAwUEBwUFCQAAAAAAAQIDEQQFITEGEkFRYXGBkRMiobEHMpPB0eHwFlJVYpIjQlRycxQVJDM0RIKDsv/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAARAf/aAAwDAQACEQMRAD8A9mAAIyAbA5YBzBzHLEbA7uFxu4twHLiXOLi3A6uLc4uFwO7iXObhcDq4tzgVMDoU5uLcBQETABQAAAAAAAAAAAAAAAAAAAQRis5YHLOWdSG2wFC5zcW4HVxUzm4XA6uAgoCgIKACiBcBTq5yAHQogAdAIKAAxGwAUBAuAoCCgAAAAAAAM4bFmyJVrAOykNSmRp4gZniAJ3OheYrViByOIAnqQvMQ41jv2wEu5ScS8V4bAxvWmnN/VpRa9pLvs3ou9mC46+keScsNgJLmWlTE7xh2xp9r/m9O1eVVZK7lKo5zbvKbleTfa3JO7Ksep5j9Mc7P2OFpp9HOcpad6Sjr5lMvpdx7esaCXdTenrJnn05vpLykvlJDMp62krPt7fBhXpEvpOx09q6h4UqdvO6bLbLvpWxMGliKNKpH96F4Pz3V/I8kUnHfVPr9zLbLq11yvVdPwA96yL6QcFiWoOUqU3olVSUW3taorx9Wn3GsTPmeOF5JJrZ7fevDuPQuCOMp0nGjWfNSb5Yt6ypvpZ9YdLPZ91rEeroUZp1U1dO6ezHLkR0FxExQAVCAgFAVCACFEFAAAAA5lMWTIeIqAcYmuQKtYSvMh1JgdVKwzKuNVJjEpgSlWOlXIDqCe0AtI4g8/wDpP4rlD/hYVHFNJ1HH6zve0L9F1t18N9VWxahGU3tFOT8Ers8Kz2vOvVlVqfWm3Ky6X/BWXkFxEq5g/qxsl2ar5MZcebx9UXOT5JKr7z26aF/R4dgiqw8KclsvFEqnQbW2m9vnbsZt6fDkGTaXCsX1YGHo4NtWeqa0f3Ml4DBS17pfPb4o3GF4cs7dP1sWkOEo7p7/ABCVj8RK9JaWkrteKeqfz8x3DSjKastNL+ln+u41dXhS0e3uFocLytpC3aBs+F8S3Ts3f6vr+kjRIxfDslh5uNaVr25ex91+hs4y7CI6FEQoCghAuB2IcioBRQAAAAA4qsrsRIn1itxIECtIhVZEqsQqoDVRkechyoyPOQA5COY25HDkBWcW4vkw07P61o+Teq9Ezy7CUPaVNdr+pveO3ehH/Olb/wAWZrKMOk1pcqtFgqahTUUlsSIsZixyEgJuHLbDIqsOu5lpg7EE+lDUsqKIVuqJ2HegRJpRJlKIxQJcQKjP6F6bkl70FzLvS3Q5wtm6klSk+l4Pu6x8V8vAnYqN4yXczJZFS5cVCK25vR2evw+IHogoIUBAYqFA5OkIKgFAAAAAAG6qK7FIsasiuxLArK5Bqk6uiDViBEqMizZJqoizQDbY3KQsmNVJWAz/ABk7wpr+dv0i/wASvyuhZcxYcRNTjBp/Vk9Ouq/IYwatC3iVT6EeLhF2bK3FOc3y35Yrs6+Z3h8hpzXvTl62QGhwOMjKzTTNDhVFq6PNMVkUqT5qdSUfNmh4bzComoznfoBs5qyHaVUjqpdJC1Z8iTZEXOFncmxuYt8UODtHD1H32+4tsv4khU3i490tGBf7qxQ5Lh7Yx9yb+Fvw9C8pTT1TuN5Jh17StP8AmUV94F2hQQAKACgIKAgCgIKAAAAR67K+tIn4grawEKsyFVZLrMhVGBGqEWqSpkaoBFkVHEjaw83FtP3bW33RdNEDO42oTdtkmvFNWYVnJreDetl1V20tWOX5YIpMBHmq+1k/qfFvRL5+he4gorMXVkvqptlPicTi4rmW99rc2n67jSRj2nUY8oFRgMbXrUZOrZOKX1qfspPfSElL3tr6xQxgMylF3T6/q5b4yrOSsm/BWKyOFd7t+QHoXCGN9r9bqaTOa1OjG83oYzhSNmteqNPxTl3t6aTu0tdG0/huQZypxzh1U5Hp32NTl+Io10pJqV9mn162a6mLhwdTqzUpzmmmndPsVjX4fhajpKNWopq3vJ2vbZz/AHn3sC7wdBwlo/de6ZY5J/y32uTb82RcOmotSabs9dr6FrhqajFJdgQ+hQQAKAAAgAACpAIgQCgAARsQVtctK6KzEAV1cg1SdXIVUCLIalEfkjjlAZ5BKmHUk4taNWZIUB2FMDzbMsJ7KdrKLV4tJfWfSXyZIqSNXnXDMq8uaFRQb0fNFy20urNdOhksbDlfLe9m1fw0uVRTXePclyLSkSoTAZxUlFaEGgrsdza9roYw1eEIxbauwNRw4rTR6LCN4+R53wvUjOppI9JsuWyetiCqq0E9tCTgqbW41RleWpaUYJBDeM5lTk4q7tol3lpl6l7OPNvbUaoxuyagFFEFAAAABgCC4AhRAAUAABmsysxBZVkV2JiBW1iHUJdYi1AI0kIgkEQO4xJNKmN0okuCAIq2r6Hk+Mq80m+1t+rPXFC+namjyDER5ZOL3i2n4p2KojoSaLW7ZHEqYZzWnTbpr4gdYrFw7fIocRQjUkoqN03s9vQRVqabVRtO+zuXWT4vDqas7hWg4OySVOak5WSWi1v4G6pqm5c93zbbu3psUGHx1OpKM4SSWia+6xc08NCWtOav2ERKo07SuW0Y6GbwuJkq3I3fTVLp3/kaiOwQ/hIaXJBxRVkjsBRRBUAAFhQOQFAAABQAQUAOZorsXEsJsgYgCmxBDmywxKK+qgGZISISZy5gS6TJMSvp1STTrATU7anjeOqe+5drbfm7nrGLxHLTnLshJ+kWeR4h7lUvtCZSre6U/NYm4apdAcV6EZbocy7LU5L3Yy18H6krC003ZlxgcGm7RVu8CVgsmptpKLSsr2k1r6mqwmS01bey722/Mr8HlkotSTv5l5RutCCvy/JI0q0qkVZN3saiirtIg0YlvQppLvYQ6KIKgFAQVAKIAoCWAUAAAQAAAADc0Q66J0yvxLArsSisrlnXK3EAQqkiPUqi4mZXV6wEyGIJVLFGFzPiqlSfJD359z91eL+5GUzHjHEzajGpyLVv2a5Xbscrt/IK9Uz3PKMISoupH2lSLUYX956auy2Vr6swtTUoeHI89apVk3JpJczbbcp3u23voviXpRGqwaG4VuV36dSbNDUqCegE3CYuLs0zbZUkqfOYfC8PTetOVu57GtwOW4rl5LRta17sDW5RWTVyxck9iiyvKq8ElJxXg2y7pUeRb3fayIfpotIlXAp8ZmM8G3V1nQcv7SDd5Uru3tKbf92+8fNAa5C3K2jnWHla1aCbtZSai3fa19yxA6FEBAKxRBQBgAACAAAAAAOahX14lk0R6tMClxBVYuRdY2nYymbZnCnfmeq6dSqrs5x9OjFyqSUV8X4LqeeZ/wASSrR5KacYy0vf3mvLRCcR4yVRzqSd7uy7El0XcZuviHGKt2d33gEJXqS7ov8AAi1I2l6DmAu3Jt6tfeN1n7wVc8LTs6q/yP8A+vyNHAyPDtW1Vr96LXmrfmaynII6qoMPLtH3HQiNWA22QtNI2GBsedcL4u0mnrpoej4JcsVfd6sgsoDdR6jEsSNPEBE29tTOcVY+Kw9VPrCS9UyTmWY8kXqeX8Q5zKrJxT0+YU3mGY80FG+qilr4Fxw1xri6CUfaRnT092o07LsT3RisRXVr9bBhoc0lq7dUUfSmT5tTxEFOnLdXa6r8V3lijyjh/HSpQi4OzW33q3Ya7LuMqbsq0eR/vLbzT1XxIjVCjWFqxqJShJSi+qd0POICXAGgAAAAAAABJSsRsTX5Vc6xDK3MJ7r9bAQsyx2mh5nnUdZP8zb4+WjMVnsdGVWFzrE3vEoMZPaxY5zo2Ukp3YVOy/RnGMVpNdny/VhzLnqtgx8f7Zro0vigGcPUcZKS3T9bbo2uHqqUVJbOzMVKNrrs36al/wAPYtOLhfWO6+bQGqwXvKwzXw7T2OckrXlYt8dFRdwhnI8PKNRS6dUbhY/Tcw0M3pw66jlLPFPtsBtaeLv1OauNS6mUqZyktCsxGbSabu/13AT+Ks40cYvV7+BiXezk9LrT8bD1eu5u7vqN1G+vTdaW6eIVAdTW8r2Vm/LYmZfWU22rpRa66vyGqkLQem/np0VyLlc/fa20d/uA3uW5ipRUW2nby8Cc13rxTMdRrpPXYt6VXmWjt3fmEafLM4q4Z3pVGr7rdPxRuMm42pTjasnCfatYvv12PJI1eXX0HqeKctNgPeaVZTV07p7Nap+Y5LQ8p4bzqvh37kuaPWEtY+Pc/A2mDz2VZXkrPsWxBf8AOdJkGlVuSoSCHRAEAZrorMRC7fey5nG5HdLXYDOYnBNrYyOf5c0noer08On0XoMYvLINW5YvxSYV8ocQy95rvKTkd/ifVsuCMHOV6uFoz7nTj+A6uA8r/h+H+zRSvlvBvVeKO86VqkZdy+B9RLgTK/4dh/s0dT4Hyx75fh301prYFfLuOStGa/vKz8V1INKs4SUovVP9I+r/ANhcstb/AHdh7f6aE/YPK/4dh/s0CvnrJ8xvJSjs91fWL7GaDMqjcb3Z7NDgbLE7rL8On2qmkSZcKYF74Ol/SB85yi2yZCsoLVpeJ74+Dsv/AMFR/oGpcC5Y98vw78aaA8EeYR6Lmb2fT8xipXcr3a8Oi26ep9CLgnLf8BQ13/s0KuCstV2sBQu9/cWt97gr5zqS5dev4dnl+u3mOIinaWreq7NduurPo18E5a98Bh/s113OP2Fyz+HYf7NAr5mzbGtWguy4xlU25362Z9Qz4Gyxu7y/Dt/6aCPAuWLVZfh1/wCtAr53hPT9eg/Qxbjv6P5H0J+xWW/4Ch/QhFwTlq/7Ch9mgV4Licy0vYYo5klbXfXXqe+4jgbLpK3+w0P6EU9X6OsFf/pKfd7vQDA5Ljua1j0DJ4OyJOC4Iw1PWFGMfBWLmjlyjokQdYZE6mN06Nh+EQjoDqwAAMAAWIgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAByAAB0gAAAAA//2Q=="></img>
                        <div className ="flex flex-col gap-7">
                          <h1 className="text-center text-black">Poisson</h1>
                          <p className="text-center text-black max-w-xs self-center">Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</p>
                        </div>
                    </div>
                    <div className="text-white flex bg-white w-fit h-fit rounded-md overflow-hidden">
                      <img className ="" src ="data:image/jpeg;base64,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"></img>
                        <div className ="flex flex-col gap-7">
                          <h1 className="text-center text-black">Poisson</h1>
                          <p className="text-center text-black max-w-xs self-center">Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</p>
                        </div>
                    </div>
                  </div>

                </OverlayModal>
            }
    </div>
  );
};

export default MapComponent;