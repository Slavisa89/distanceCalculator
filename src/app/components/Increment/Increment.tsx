import "./Increment.scss";
import { useAppDispatch } from '../../store/hooks';
import { increamentDeacrement } from "../../pages/Home/homeSlice";
import { Button } from "primereact/button"

interface IIncrement {
    value: number;
    errors?: boolean;
}

export const Increment = ({ value = 0, errors }: IIncrement) => {
    const dispatch = useAppDispatch();
    const handleClick = (direction: string) => {
        dispatch(increamentDeacrement(direction))
    }

    return (
        <>
            <div className={"increment" + (errors ? " error" : "")} >
                <Button className="pi pi-minus" size="small" onClick={() => handleClick("down")} />
                <div className="value">{value}</div>
                <Button className="pi pi-plus" size="small" onClick={() => handleClick("up")} />
            </div>
            {
                errors && <div className="error-text">Select passengers</div>
            }
        </>
    )
}