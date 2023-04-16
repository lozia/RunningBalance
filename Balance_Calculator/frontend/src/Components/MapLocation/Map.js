import { GoogleMap, MarkerF } from '@react-google-maps/api';
import Geocode from "react-geocode";
import React, { useEffect,useState } from 'react';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import './Map.scss';

function Map() {
    const {incomes, expenses, getIncomes, getExpenses } = useGlobalContext()

    useEffect(() => {
        getIncomes()
        getExpenses()
    }, [])

    Geocode.setApiKey("AIzaSyB_27lWXeJoFzJPhiUVMGSNaNMXke2Mpjo");
    Geocode.setLanguage("en");
    Geocode.setLocationType("GEOMETRIC_CENTER");

    const getPosition = (location) => {
        const lo = Geocode.fromAddress(location).then((response) => {return response.results[0].geometry.location})
        return lo
    }

    const center = {lat: 42.3600825, lng: -71.0588801}

    const[map, setMap] = useState(/** @type google.maps.Map */ (null));

  return (
    <div className="map-container">
      <InnerLayout>
        <div className='map'>
            <GoogleMap center={center} zoom={15} mapContainerStyle={{width:'100%', height:'100%'}} onLoad={(map) =>setMap(map)}>
                <MarkerF position={center} visible={true} center={center} />
                {expenses.map((income) => {
                    const {_id, title, amount, date, category, description, type, location} = income;
                    return <MarkerF
                        key ={_id}
                        center={getPosition(location)}
                    />
                })}
                {incomes.map((income) => {
                    const {_id, title, amount, date, category, description, type, location} = income;
                    return <MarkerF
                        key ={_id}
                        center={getPosition(location)}
                    />
                })}
            </GoogleMap>
        </div>
      </InnerLayout>
    </div>
  );
}

export default Map;