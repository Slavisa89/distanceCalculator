import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "./Home.scss";
import { selectCityState, addIntermediaCities, setErrors, extractParams } from './homeSlice';
import { Button } from '../../components/Button/Button';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { validateForm } from "../../../utils/validateForm";
import { Button as PRButton } from 'primereact/button';
import { TimelineComponent } from "../../components/Timeline/Timeline";
import { createParamsFromForm, getStateFromParams } from "../../../utils/routeParams";
import { useEffect } from 'react';

export const Home = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const cityState = useAppSelector(selectCityState);
    const dispatch = useAppDispatch();

    const handleAddIntermediate = () => {
        dispatch(addIntermediaCities());
    }

    useEffect(() => {
        dispatch(extractParams(getStateFromParams(searchParams)));
    }, []);

    const handleClick = () => {
        const oldState = JSON.parse(JSON.stringify(cityState));;
        const newStateWithErrors = validateForm(oldState);
    
        if (newStateWithErrors.errorCount) {
            dispatch(setErrors(newStateWithErrors));
        } else {
            const params = createParamsFromForm(newStateWithErrors);
            navigate(`/result${params}`);
        }
    }

    return (
        <>
            <div className="timeline_right">
                <TimelineComponent state={cityState} />
            </div>
            <div className="item add_item">
                <div className="add-button" onClick={handleAddIntermediate}>
                    <PRButton size="small" className="add_new_button" raised rounded outlined icon="pi pi-plus" />
                    <div className="add_new">Add destination</div>
                </div>

            </div>

            <Button disabled={cityState.errorCount > 0} handleClick={handleClick} text="Submit" />
        </>
    )
}