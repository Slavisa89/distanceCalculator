import { CityState, IParams } from "../app/pages/Home/homeSlice";


/**
 * Create params from data after form has been passed
 * @param {params} CityState
 */
export const createParamsFromForm = (state: CityState) => {
  const intermediateCityParam = state.intermediateCities.map(
    (item) => item.name
  );
  let params = `?origin=${state.originCity.name}&destination=${state.destinationCity.name}&passengers=${state.count.value}&travel_date=${state.date}`;

  if (intermediateCityParam.length) {
    params += `&intermediate=${intermediateCityParam.join(",")}`;
  }

  return params;
};

/**
 * Collect data from params
 * @param {params} URLSearchParams
 */
export const getStateFromParams = (params: URLSearchParams) => {
  let paramsData: IParams = {};
  if (params.get("origin")) {
    paramsData.origin = params.get("origin")!;
  }

  if (params.get("destination")) {
    paramsData.destination = params.get("destination")!;
  }

  if (params.get("passengers")) {
    paramsData.passengers = params.get("passengers")!;
  }

  if (params.get("travel_date")) {
    paramsData.travel_date = params.get("travel_date")!;
  }

  if (params.get("intermediate")) {
    const intermediateArray = params.get("intermediate")?.split(",");
    paramsData.intermediate = intermediateArray;
  }

  return paramsData;
};
