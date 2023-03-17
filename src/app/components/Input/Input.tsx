import { useState } from 'react';
import { fetchCityList } from '../../pages/Home/homeApi';
import './Input.scss';

import { AutoComplete } from 'primereact/autocomplete';
import { useAppDispatch } from '../../store/hooks';
import { CitiInfo, setCitiesInfo, CityType, setIntermediaCities } from '../../pages/Home/homeSlice';
import { Button } from 'primereact/button';

interface InputType {
    item: CitiInfo,
    label: string;
    index?: number;
}

export const Input = ({ item, label, index }: InputType) => {
    const dispatch = useAppDispatch();

    const handleRemoveIntermediaCities = () => {
        const hasError = !!item.error;

        dispatch(setIntermediaCities({ index: index!, hasError }));
    }


    const [cityList, setCityList] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState();
    const [error, setError] = useState<string>("");

    const handleInputChange = async (event: any) => {
        const cityList = await fetchCityList(event.query);
        setCityList(cityList.results);
        setError(cityList.error);
    }

    const onSelect = (e: any) => {
        dispatch(setCitiesInfo({ index, type: item.type, name: e.value }));
        setCityList([]);;
    }

    const handleRemoveActiveValue = () => {
        dispatch(setCitiesInfo({ index, type: item.type, name: "" }));
    }

    return (
        <div className="form-controll">
            <div className="flex-item">
                <label>
                    {label}
                </label>
                <AutoComplete
                    className={(error || item.error) && "p-invalid"}
                    suggestions={cityList}
                    disabled={!!item.name}
                    value={item.name || inputValue}
                    onSelect={onSelect}
                    completeMethod={handleInputChange}
                    onChange={(e) => setInputValue(e.value)}
                />
                {
                    item.type === CityType.INTERMEDIATE && <Button onClick={handleRemoveIntermediaCities} size="small" className="removeButton" icon="pi pi-times" rounded text severity="danger" aria-label="Cancel" />
                }

                {
                    !!item.name && <Button onClick={handleRemoveActiveValue} size="small" className="removeButton removeActivated" icon="pi pi-times" rounded text severity="danger" aria-label="Cancel" />
                }
            </div>
            {
                (error || item.error) && <div className="error">{error || item.error}</div>
            }
        </div>
    )
}