import {ChangeEvent, useEffect, useState} from 'react';
import './Select.scss';

export type TOption = {
    label: string,
    value: string
};

export type TSelect = {
    options: TOption[],
    onSelect: (obj: TOption, fieldName: string) => void,
    name: string,
    defaultValue?: TOption | null
}
export const Select = ({options, onSelect, name, defaultValue = null}: TSelect) => {
    const [selectedOption, setSelectedOption] = useState<TOption | null>(null);
    const [isFocused, setFocus] = useState(false);

    useEffect(() => {
        if(defaultValue) {
            setSelectedOption(defaultValue);
        }
    }, [defaultValue]);

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        const selected = options.find(option => option.value === selectedValue);

        if (selected) {
            setSelectedOption(selected);
            onSelect(selected, event.target.name);
        }
    };

    return (
        <div>
            <select className={`select ${selectedOption ? 'selected' : ''}`} onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    name={name}
                    defaultValue=""
                    value={selectedOption ? selectedOption.value : ''}
                    onChange={handleSelectChange}
            >
                {(!isFocused && !selectedOption) ? <option className="placeholder" value="" disabled hidden>Choose City</option> :
                    <option value="" disabled hidden></option>
                }
                {options.map((option, index) => (
                    <option className="option" key={option.value + index} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );
};
