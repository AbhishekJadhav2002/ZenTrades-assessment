"use client";

import {
  Autocomplete,
  DirectionsRenderer,
  GoogleMap,
  Libraries,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useRef, useState } from "react";

const mapContainerStyle = {
  width: "100%",
  height: "600px",
};

const libraries = ["places"] as Libraries;

export default function Task_2(): JSX.Element {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    authReferrerPolicy: "origin",
    libraries,
  });

  const [searchResult, setSearchResult] = useState<
    google.maps.places.Autocomplete | undefined
  >(undefined);
  const [directions, setDirections] = useState<
    google.maps.DirectionsResult | undefined
  >(undefined);
  const [markers, setMarkers] = useState<
    { label: string; position: google.maps.LatLng }[]
  >([]);

  const searchRef = useRef<HTMLInputElement>(null);

  function onLoad(autocomplete: google.maps.places.Autocomplete) {
    setSearchResult(autocomplete);
  }

  const handleAddMarker = () => {
    if (!searchResult) {
      console.error("Search result is not available");
      return;
    }
    const place = searchResult.getPlace();
    const address = place.formatted_address || place.name || "";
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results) {
        const marker = {
          position: results[0].geometry.location,
          label: address,
        };
        setMarkers([...markers, marker]);
        searchRef.current!.value = "";
      } else {
        console.error("Error geocoding address:", address);
      }
    });
  };

  const handleDirections = () => {
    if (markers.length < 2) {
      console.error(
        "Please add at least two markers before calculating directions."
      );
      return;
    }

    try {
      const directionsService = new google.maps.DirectionsService();
      const waypoints = markers.slice(1, -1).map((marker) => ({
        location: marker.position,
        stopover: true,
      }));

      directionsService.route(
        {
          origin: markers[0].position,
          destination: markers[markers.length - 1].position,
          waypoints,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        async (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            setDirections(result);
            setMarkers([]);
            const res = await fetch("/api/plan", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                markers: markers.map((marker) => ({
                  address: marker.label,
                  lat: marker.position.lat(),
                  long: marker.position.lng(),
                })),
              }),
            });
            const data = await res.json();
            if (!res.ok) {
              console.error("Error planning route:", data);
            }
            console.log("Route planned:", data);
          } else {
            console.error("Error calculating directions:", status);
          }
        }
      );
    } catch (error: any) {
      console.error("Error calculating directions:", error);
    }
  };

  if (loadError) {
    return <main className="flex min-h-screen max-w-screen overflow-hidden flex-col items-center justify-between p-16 lg:p-24 text-white">Error loading Google Maps</main>;
  }

  if (!isLoaded) {
    return <main className="flex min-h-screen max-w-screen overflow-hidden flex-col items-center justify-between p-16 lg:p-24 text-white">Loading Google Maps...</main>;
  }

  return (
    <main className="flex min-h-screen max-w-screen overflow-hidden flex-col items-center justify-between p-16 lg:p-24 text-white">
      <Autocomplete
        onPlaceChanged={handleAddMarker}
        onLoad={onLoad}
        className="w-full rounded-md shadow-md transition duration-300 ease-in-out"
      >
        <input
          type="text"
          placeholder="Search for Location"
          className="text-ellipsis w-full text-black p-4 rounded-md shadow-md outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
          ref={searchRef}
        />
      </Autocomplete>
      <div className="flex flex-col justify-center w-full mt-4">
        <h2 className="text-lg font-bold">Stops</h2>
        <ol className="w-full mt-4 list-decimal pl-4">
          {markers.map((mark, index) => (
            <li key={index} className="text-lg">
              {mark.label}
            </li>
          ))}
        </ol>
      </div>
      <button
        onClick={handleDirections}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Plan Route
      </button>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={
          markers.length > 0
            ? markers[0].position
            : { lat: 18.516726, lng: 73.856255 }
        }
        onLoad={(map) => {}}
        mapContainerClassName="w-full h-96 rounded-3 shadow-md mt-4"
      >
        {markers.map((marker) => (
          <Marker
            key={marker.label}
            position={marker.position}
            label={marker.label}
          />
        ))}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </main>
  );
}
