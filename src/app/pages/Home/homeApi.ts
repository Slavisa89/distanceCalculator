import { SEARCH_CITIES } from "../../../cities";

// A mock function to mimic making an async request for data
export function fetchCityList(keyword: string) {
  return new Promise<{ results: string[], error: string }>((resolve) =>
    setTimeout(() => {
      resolve(getCityListByKeyWord(keyword));
    }, 1500)
  );
}

const getCityListByKeyWord = (keyword: string) => {
  if( keyword.toLowerCase().includes("fail") ) return { results: [], error: "Oops! Failed to search with this keyword. " }
  if (!keyword) return { results: [], error: "" };
  const filteredCities = SEARCH_CITIES.filter((item) => {
    if ((item[0] as string).includes(keyword)) {
      return item;
    }
  }).map((item) => item[0] as string);

  return { results: filteredCities, error: "" };
};
