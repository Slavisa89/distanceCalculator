
import { Timeline } from 'primereact/timeline';
import { Card } from 'primereact/card';
import './Timeline.scss';
import { CitiInfo, CityState, CityType } from '../../pages/Home/homeSlice';
import { useEffect, useState } from 'react';
import { Input } from '../Input/Input';
import { Increment } from '../Increment/Increment';
import { Calendar } from 'primereact/calendar';
import moment from "moment";
import { Message } from "primereact/message";

interface ITimeline {
    state: CityState | CitiInfo[];
    isResult?: boolean
}

const minDate = new Date();

const imageType = {
    [CityType.DESTINATION]: "pi-map-marker",
    [CityType.ORIGIN]: "pi-circle",
    [CityType.INTERMEDIATE]: "pi-circle",
}

const imageColor = {
    [CityType.DESTINATION]: "#ff0000",
    [CityType.ORIGIN]: "#708090",
    [CityType.INTERMEDIATE]: "#708090",
}

const inputLabelsFromType = {
    [CityType.DESTINATION]: "City of destination",
    [CityType.ORIGIN]: "City of origin",
    [CityType.INTERMEDIATE]: "City of destination",
}

export const TimelineComponent = ({ state, isResult }: ITimeline) => {
    const [events, setEvents] = useState<(CityState | CitiInfo)[]>([]);

    useEffect(() => {
        if (!isResult) {
            setEvents([(state as CityState).originCity, ...(state as CityState).intermediateCities, (state as CityState).destinationCity]);
        } else {
            setEvents((state as CitiInfo[]));
        }
    }, [state]);

    const customizedMarker = (item: CitiInfo) => {
        return (
            <span className="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-1" >
                <i className={"pi " + imageType[item.type]} style={{ color: imageColor[item.type] }}></i>
            </span>
        );
    };

    const customizedContent = (item: CitiInfo, index: number) => {
        return (
            <Card className="card">
                <Input item={item} label={inputLabelsFromType[item.type]} index={index} />
            </Card>
        );
    };

    const resultContent = (item: CitiInfo) => {
        return (
            <div className="result_info">{item.name}</div>
        );
    }

    const opositeTwoTemplates = (_: CitiInfo, index: number) => {
        if (index === 0) {
            return (
                <div className="increment_date_template">
                    <div className="increment_holder">
                        <label>Number of passengers</label>
                        <Increment 
                            errors={(state as CityState).count.error} 
                            value={(state as CityState).count.value} 
                        />
                    </div>
                </div>
            )
        }
        if (index === 1) {
            return (
                <div className="increment_date_template">
                    <div className="calendar_holder">
                        <label>Travel date</label>
                        <Calendar 
                            minDate={minDate} 
                            value={new Date(moment((state as CityState).date).format())} />
                    </div>
                </div>
            )
        }
    }

    const opositeTemplate = (item: CitiInfo) => {
        if (item.distance) {
            return (
                <Message 
                    severity="success" 
                    text={`${item.distance} km`} 
                    className="kilometers-result" 
                />
            )
        }
    }

    return (
        <div className="card">
            <Timeline 
                opposite={!isResult ? opositeTwoTemplates : opositeTemplate} 
                value={events} 
                align="left" 
                className="customized-timeline" 
                marker={customizedMarker} 
                content={!isResult ? customizedContent : resultContent}
            />
        </div>
    )
}
