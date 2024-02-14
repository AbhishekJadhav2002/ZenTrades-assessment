"use client";

import { getUserJobs } from "@/api";
import { UserJobs } from "@/types/api.types";
import {
  DirectionsRenderer,
  GoogleMap,
  Libraries,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const mapContainerStyle = {
  width: "100%",
  height: "800px",
};

const libraries = ["places"] as Libraries;

export default function UserPlan(): JSX.Element {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    authReferrerPolicy: "origin",
    libraries,
  });

  const [directions, setDirections] = useState<
    google.maps.DirectionsResult | undefined
  >(undefined);
  const [markers, setMarkers] = useState<UserJobs[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      setLoading(true);
      getUserJobs().then((res) => {
        if (res instanceof Error) {
          return;
        }
        setMarkers(res);
      });
    } catch (error) {
      toast.error("Error getting user jobs: " + error);
      setMarkers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handleDirections = () => {
      if (markers.length < 2) {
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
            } else {
              toast.error("Error getting directions: " + status);
            }
          }
        );
      } catch (error: any) {
        toast.error("Error getting directions: " + error);
      }
    };

    if (isLoaded) {
      handleDirections();
    }
  }, [isLoaded, markers]);

  if (loadError) {
    return (
      <main className="flex min-h-screen max-w-screen overflow-hidden flex-col items-center justify-between p-16 lg:p-24 text-white">
        Error loading Google Maps
      </main>
    );
  }

  if (!isLoaded) {
    return (
      <main className="flex min-h-screen max-w-screen overflow-hidden flex-col items-center justify-between p-16 lg:p-24 text-white">
        Loading Google Maps...
      </main>
    );
  }

  return (
    <main className="flex min-h-screen max-w-screen overflow-hidden flex-col items-center justify-between p-16 lg:p-24 pt-1 lg:pt-4 text-white">
      <div className="flex flex-col justify-center w-full mt-4">
        <h2 className="text-lg font-bold">Stops</h2>
        {!loading ? (
          <ol className="w-full mt-4 list-decimal pl-4">
            {markers.length === 0 ? (
              <li className="text-lg">No stops added yet.</li>
            ) : (
              markers.map((mark, index) => (
                <li key={index} className="text-lg">
                  {mark.address}
                </li>
              ))
            )}
          </ol>
        ) : (
          <p className="text-lg">Loading...</p>
        )}
      </div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={
          markers.length > 0
            ? markers[0].position
            : { lat: 18.516726, lng: 73.856255 }
        }
        mapContainerClassName="w-full h-96 rounded-md shadow-md mt-4"
      >
        {markers.map((marker) => (
          <Marker
            key={marker.address}
            position={marker.position}
            label={marker.address}
          />
        ))}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </main>
  );
}
