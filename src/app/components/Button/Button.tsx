import "./Button.scss";
import {Button as RButton} from "primereact/button";

interface IButton {
    text: string;
    handleClick: () => void;
    disabled?: boolean
}

export const Button = ({ handleClick, text, disabled }: IButton) => {
    return (
        <div className={"main_button" + (disabled ? " disabled" : "")}>
            <RButton disabled={disabled} label={text} onClick={handleClick} />
        </div>
    )
}