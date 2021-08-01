import React, { useEffect, useState } from 'react';
import { IterableObject, SortedData } from '../helpclasses/types';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { GOOGLE_API_KEY } from '../helpclasses/globalVariables';

interface Props {
  csvData: any[] | null;
  sortedData: SortedData;
}

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 52.21,
  lng: 19.29,
};

let icon = {
  path: 'M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z',
  fillColor: 'red',
  fillOpacity: 0.6,
  strokeWeight: 0,
  scale: 1,
};

const Nap = ({ sortedData, csvData }: Props) => {
  const [fetchedData, setFetchedData] = useState<any>([]);
  const [categoryColors, setCategoryColors] = useState<IterableObject>({});

  useEffect(() => {
    csvData?.forEach(async (row: []) => {
      //creating colors for each category
      if (!categoryColors[row[sortedData.category]]) {
        const randomColor =
          '#' + Math.floor(Math.random() * 16777215).toString(16);

        setCategoryColors((oldColors) => {
          const category = row[sortedData.category];
          return {
            ...oldColors,
            [category]: randomColor,
          };
        });
      }

      //fetching places cordinates
      const link =
        'https://maps.googleapis.com/maps/api/geocode/json?' +
        `address=${row[sortedData.address]},${row[sortedData.city]},${
          row[sortedData.state]
        },${row[sortedData.zip]}, ` +
        `&key=${GOOGLE_API_KEY}`;

      const res = await fetch(link);

      const data = await res.json();
      data.category = row[sortedData.category];

      setFetchedData((oldData: any) => [...oldData, data]);
    });
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_API_KEY,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div className='map-dimentions'>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={6.4}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {fetchedData.map((data: any) => {
          const color = categoryColors[data.category];
          const results = data.results[0];
          if (results) {
            const position = results.geometry.location;
            const title = results.formatted_address;
            icon.fillColor = color;

            //create marker for every place in the file
            return (
              <Marker
                key={title + color}
                onLoad={onLoad}
                position={position}
                icon={icon}
                title={title}
              />
            );
          } else return '';
        })}

        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default Nap;
