import { SEARCH_CITIES } from "../../../cities";
import { calculateDistance } from "../../../utils/distance";
import { CitiInfo, CityState } from "../Home/homeSlice";
import { IResult } from "./Result";

export const calculateChoosenCities = (state: CityState): Promise<IResult> => {
  return new Promise((resolve, reject) => {
    // Simulate api call
    setTimeout(() => {
      const mergedCityArray = [
        state.originCity,
        ...state.intermediateCities,
        state.destinationCity,
      ];

      const searchedArray = mergedCityArray
        .map((city) => {
          const cityArray = SEARCH_CITIES.find((c) => c[0] === city.name);
          return cityArray;
        })
        .reduce(
          (prev, curr, indx, array) => {
            // Return error if city is "Dijon" or there is some other problem
            if (!curr || curr[0] === "Dijon") reject();
            if (curr && array) {
              const lat1 = curr[1] as number;
              const lon1 = curr[2] as number;

              const nextArray = array[indx + 1];

              if (nextArray) {
                const lat2 = nextArray[1] as number;
                const lon2 = nextArray[2] as number;

                // Find distance between two cities
                const cityDifference = calculateDistance(
                  lat1,
                  lon1,
                  lat2,
                  lon2
                );
                prev.totalDistance += +cityDifference;

                prev.results.push({
                  ...mergedCityArray[indx],
                  distance: cityDifference,
                });
              } else {
                // Add last city in array so we dont need distance
                prev.results.push({
                  ...mergedCityArray[indx],
                  distance: undefined,
                });
              }
            }

            return prev;
          },
          { results: [] as CitiInfo[], totalDistance: 0 }
        );
      resolve(searchedArray);
    }, 1500);
  });
};
