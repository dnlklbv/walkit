import {getDistance} from 'geolib';

export const getRegionByWaypoints = (waypoints) => {
  if (!waypoints.length) {
    return null;
  }

  const waypointsCount = waypoints.length;
  const centralWaypoint = waypoints[Math.round(waypointsCount / 2)];
  const latitudeDelta = Math.abs(
    (waypoints[0].latitude - waypoints[waypointsCount - 1].latitude) * 2,
  );
  const longitudeDelta = Math.abs(
    (waypoints[0].longitude - waypoints[waypointsCount - 1].longitude) * 2,
  );

  return {
    latitude: centralWaypoint.latitude,
    longitude: centralWaypoint.longitude,
    latitudeDelta,
    longitudeDelta,
  };
};

export const getTrackDistance = (waypoints = []) => {
  console.log('CC: ', waypoints[0], waypoints[1]);
  console.log('D: ', getDistance(waypoints[0], waypoints[1]));
  return waypoints.reduce(
    (distance, wp, idx) =>
      waypoints[idx + 1]
        ? distance +
          getDistance(
            {
              latitude: waypoints[idx].latitude,
              longitude: waypoints[idx].longitude,
            },
            {
              latitude: waypoints[idx + 1].latitude,
              longitude: waypoints[idx + 1].longitude,
            },
          )
        : distance,
    0,
  );
};

export const humanizeDistance = (distance = 0) =>
  distance < 1000
    ? `${distance} Метров`
    : `${Math.round(distance / 10) / 100} км`;
