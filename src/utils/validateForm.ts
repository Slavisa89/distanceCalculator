import { CityState } from "../app/pages/Home/homeSlice";

/**
 * Validate form from home page
  * @param {params} CityState
 */
export const validateForm = (formData: CityState) => {
    if( !formData.destinationCity.name ){
        formData.destinationCity.error = "You must choose the city of destination";
        formData.errorCount++;
    }

    if(!formData.originCity.name){
        formData.originCity.error = "You must choose the city of origin";
        formData.errorCount++;
    }

    if( formData.intermediateCities.length ){
        formData.intermediateCities.map((city, index) => {
            if( !city.name ) {
                city.error = "You must choose the city of destination";
                formData.errorCount++;
            }
        })
    }

    if( !formData.count.value ){
        formData.count.error = true;
        formData.errorCount++;
    }

    return formData;
}