import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { fetchCityList } from "./homeApi";
import moment from "moment";

interface IIntermediate {
  [key: string]: string;
}

export enum CityType {
  "ORIGIN",
  "DESTINATION",
  "INTERMEDIATE",
}

export interface IParams {
  origin?: string;
  destination?: string;
  passengers?: string;
  travel_date?: string;
  intermediate?: string[];
}

export type TError = {
  destination?: string;
  origin?: string;
  intermedia?: IIntermediate;
  count?: boolean;
};

export type CitiInfo = {
  name: string | undefined;
  error?: string;
  type: CityType;
  distance?: string;
};

export interface CityState {
  originCity: CitiInfo;
  destinationCity: CitiInfo;
  intermediateCities: CitiInfo[];
  count: Count;
  date: string;
  errorCount: number;
}

type Count = {
  value: number;
  error: boolean;
};

type CitiesPartialInfo = Partial<CitiInfo> & { index?: number };

const initialState: CityState = {
  originCity: { name: undefined, type: CityType.ORIGIN },
  destinationCity: { name: undefined, type: CityType.DESTINATION },
  intermediateCities: [],
  count: { value: 0, error: false },
  date: moment().format("l"),
  errorCount: 0,
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    addIntermediaCities: (state) => {
      state.intermediateCities.push({
        name: "",
        type: CityType.INTERMEDIATE,
      });
    },
    setIntermediaCities: (
      state,
      action: PayloadAction<{ index: number; hasError: boolean }>
    ) => {
      if (action.payload.hasError) state.errorCount && state.errorCount--;
      state.intermediateCities = state.intermediateCities.filter(
        (_, indx) => indx !== action.payload.index - 1
      );
    },
    setCitiesInfo: (state, action: PayloadAction<CitiesPartialInfo>) => {
      if (action.payload.type === CityType.ORIGIN) {

        state.originCity.name = action.payload.name;
        state.originCity.error = "";
        state.errorCount && state.errorCount--;

      } else if (action.payload.type === CityType.DESTINATION) {

        state.destinationCity.name = action.payload.name;
        state.destinationCity.error = "";
        state.errorCount && state.errorCount--;

      } else if (action.payload.index !== undefined) {

        state.intermediateCities[action.payload.index - 1].name =
          action.payload.name;
        state.intermediateCities[action.payload.index - 1].error = "";
        state.errorCount && state.errorCount--;

      }
    },
    increamentDeacrement: (state, action: PayloadAction<string>) => {
      if (action.payload === "down") {
        const newValue = state.count.value - 1;
        state.count.value = newValue < 0 ? 0 : newValue;
      } else {
        const newValue = state.count.value + 1;
        state.count.value = newValue;
        state.count.error = false;
        state.errorCount && state.errorCount--;
      }
    },
    setErrors: (state, action: PayloadAction<CityState>) => {
      return action.payload;
    },
    resetState: (state) => {
      state.originCity = { name: undefined, type: CityType.ORIGIN };
      state.destinationCity = { name: undefined, type: CityType.DESTINATION };
      state.intermediateCities = [];
      state.errorCount = 0;
      state.count.value = 0;
    },
    extractParams: (state, action: PayloadAction<IParams>) => {
      const params = action.payload;
      state.originCity.name = params.origin;
      state.destinationCity.name = params.destination;
      if (params.passengers) state.count.value = +params.passengers;
      if (params.travel_date)
        state.date = moment(params.travel_date).format("l");
      if (params.intermediate) {
        state.intermediateCities = params.intermediate.map((city) => {
          return {
            name: city,
            type: CityType.INTERMEDIATE,
          };
        });
      }
    },
  },
});

export const cityListAsync = createAsyncThunk(
  "home/fetchCityList",
  async (keyword: string) => {
    const response = await fetchCityList(keyword);
    return response.results;
  }
);

export const selectCityState = (state: RootState) => state.home;

export const {
  setIntermediaCities,
  addIntermediaCities,
  resetState,
  increamentDeacrement,
  setErrors,
  setCitiesInfo,
  extractParams,
} = homeSlice.actions;

export default homeSlice.reducer;
