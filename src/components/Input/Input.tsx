import { ChangeEvent, useState } from 'react';
import './Input.scss';
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export type TInput = {
    value: string,
    onChange: (value: string, fieldName: string) => void,
    name: string,
    placeholder?: string,
    error?: string
}
export const Input = ({ value, onChange, name, placeholder = '',error }: TInput) => {
    const [isFocused, setFocus] = useState(false);
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value, event.target.name);
    };

    return (
        <div>
            <input
                className="input"
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                placeholder={!isFocused ? placeholder : ''}
                name={name || ''}
                value={value}
                onChange={handleInputChange}
            />
            {error && <p className="error">{error}</p>}
        </div>
    );
};
