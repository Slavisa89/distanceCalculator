import "./Result.scss";
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { CitiInfo, CityState, extractParams, resetState, selectCityState } from "../Home/homeSlice";
import { calculateChoosenCities } from "./resultApi";
import { Button } from "../../components/Button/Button";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner';
import { TimelineComponent } from "../../components/Timeline/Timeline";
import { getStateFromParams } from "../../../utils/routeParams";

export interface IResult {
    totalDistance: number;
    results: CitiInfo[] | CityState,
    error?: boolean
}

export const Result = () => {
    const dispatch = useAppDispatch();
    const cityState = useAppSelector(selectCityState);
    const [results, setResults] = useState<IResult>();
    const [error, setError] = useState<boolean>(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        if (!cityState.originCity.name) {
            dispatch(extractParams(getStateFromParams(searchParams)));
        }
    }, []);

    useEffect(() => {
        if (cityState.originCity.name) {
            setLoading(true);

            calculateChoosenCities(cityState).then((result: IResult) => {
                setResults(result);
                setError(false);
                setLoading(false);
            }).catch((err) => {
                setError(true);
                setLoading(false);
            });
            
        }
    }, [cityState]);

    const handleClick = () => {
        dispatch(resetState());
        navigate("/");
    }

    if (loading) {
        return (
            <ProgressSpinner />
        )
    }

    return (
        <div className="result_holder">
            {
                !!error ?
                    <div className="something_wrong">Oops! Something went wrong!</div>
                    :
                    <>
                        {
                            results && <TimelineComponent state={results.results} isResult={true} />
                        }

                        <div className="info">
                            <span>{results?.totalDistance.toFixed(2)}km</span> is total distance.
                        </div>
                        <div className="info">
                            <span>{cityState.count.value}</span> passengers.
                        </div>
                        <div className="info">
                            Travel date <span>{cityState.date}</span>
                        </div>
                    </>
            }

            <Button handleClick={handleClick} text="Back" />
        </div>
    )

}