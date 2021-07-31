import React from 'react';
import { SortedData } from '../helpclasses/types';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

interface Props {
  sortedData: SortedData[];
}

const containerStyle = {
  width: '400px',
  height: '400px',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const Nap = ({ sortedData }: Props) => {
  sortedData = [
    {
      address: 'budziszyńska 15',
      zip: '3-322',
      city: 'Wroc?Bw',
      state: 'dolny?lask',
      category: 'kanapki',
    },
    {
      address: 'waleczna 5',
      zip: '44-434',
      city: 'Warszawa',
      state: 'mazowieckie',
      category: 'fryzjerzy',
    },
    {
      address: 'Jan Paw?B 32',
      zip: '22-333',
      city: 'wroc?Bw',
      state: 'dolny?l?sk',
      category: 'sklepy spozywcze',
    },
    {
      address: 'Krzywoustego 1',
      zip: '53-545',
      city: 'wroc?Bw',
      state: 'dolny?l?sk',
      category: 'biblioteka',
    },
  ];

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDNCPqKEjZH4Idg4krifTWlQDz5bTGnHRA',
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds();
    // map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Nap;
