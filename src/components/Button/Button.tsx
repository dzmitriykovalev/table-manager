import {ReactElement} from "react";
import './Button.scss';

export type TButton = {
    onClick: () => void,
    children: ReactElement | string,
    variant?: 'filled' | 'text';
    color?: 'main' | 'error';
    disabled?: boolean;
}

export const Button = ({ onClick, children, variant = 'filled', color = 'main', disabled = false }: TButton) => {

    const getType = () => {
        switch (variant) {
            case 'filled':
                return 'filled-main';
            case 'text':
                switch (color) {
                    case 'main':
                        return  'text-main';
                    case 'error':
                        return 'text-error';
                };
            default:
                return 'filled-main';
        }
    }

    return (
        <button disabled={disabled} onClick={onClick} className={`button ${getType()}`}>
            {children}
        </button>
    );
};
