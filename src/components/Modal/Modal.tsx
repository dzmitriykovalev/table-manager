import { createPortal } from "react-dom";
import { ReactElement } from "react";

import './Modal.scss';
import {CloseIcon} from "../СloseIcon/CloseIcon";
import {Button} from "../Button";

export type TModal = {
    isOpen: boolean,
    onClose: () => void
    children: ReactElement
}

export const Modal = ({ isOpen, onClose, children }: TModal) => {
    if (!isOpen) return null;

    const handleCloseModal = () => {
        onClose();
    };

    return createPortal(
        <div className="modal-container">
            <div className="modal-content">
                <div className="close-btn">
                    <Button variant="text" onClick={handleCloseModal}><CloseIcon/></Button>
                </div>
                {children}
            </div>
        </div>,
        document.body
    );
};
