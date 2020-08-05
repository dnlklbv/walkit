export const getRegionByWaypoints = (waypoints) => {
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
