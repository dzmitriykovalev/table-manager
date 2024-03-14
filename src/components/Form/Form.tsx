import {Modal} from "../Modal";

import './Form.scss';
import {Input} from "../Input";
import {useEffect, useState} from "react";
import {cities, TCity} from "../../const";
import {Select} from "../Select/Select";
import {TTableData} from "../Table";
import {Button} from "../Button";

export type TForm = {
    actionType: 'create' | 'update';
    isOpen: boolean,
    data: TTableData | null,
    onClose: () => void,
    onCreate: (tableId: string, data: Omit<TTableData, 'id'>) => void,
    onUpdate: (tableId: string, data: TTableData) => void,
    tableId: string
}

type TFormData = {
    name: { value: string, error: string },
    surname: { value: string, error: string },
    age: { value: number | '', error: string },
    city: { value: TCity | '', error: string }
}

const VALIDATION = {
    name: /^\s*$/,
    surname: /^\s*$/,
    age: /\D/
};

export const Form = ({actionType, isOpen = false, data, onClose, onCreate, onUpdate, tableId}: TForm) => {
    const [formData, setFormData] = useState<TFormData | null>(null);

    useEffect(() => {
        if (data) {
            setFormData({
                name: {value: data.name, error: ''},
                surname: {value: data.surname, error: ''},
                age: {value: data.age, error: ''},
                city: {value: data.city, error: ''}
            })
        } else {
            setFormData({
                name: {value: '', error: ''},
                surname: {value: '', error: ''},
                age: {value: '', error: ''},
                city: {value: '', error: ''}
            });
        }
    }, [data]);

    const handleChangeForm = (value: string | { label: string, value: string }, fieldName: string) => {
        if (typeof value === 'string') {
            console.log(fieldName);
            if(VALIDATION[fieldName as 'name' | 'surname' | 'age'].test(value)) {
                console.log(fieldName);
                setFormData(prev => {
                    return {...(prev as TFormData), [fieldName]: {value, error: 'Please enter valid value'}};
                });
            } else {
                setFormData(prev => {
                    return {...(prev as TFormData), [fieldName]: {value, error: ''}};
                });
            }
        } else {
            setFormData(prev => {
                return {...(prev as TFormData), [fieldName]: {value: value, error: ''}};
            });
        }
    }

    const handleClick = () => {
        if (actionType === 'create') {
            onCreate(tableId, {
                name: formData?.name.value || '',
                city: formData?.city.value as TCity || '',
                age: formData?.age.value || 0,
                surname: formData?.surname.value || ''
            });
        } else {
            onUpdate(tableId, {
                id: data?.id || '',
                name: formData?.name.value || '',
                city: formData?.city.value as TCity || '',
                age: formData?.age.value || 0,
                surname: formData?.surname.value || ''
            })
        }

        setFormData({
            name: {value: '', error: ''},
            surname: {value: '', error: ''},
            age: {value: '', error: ''},
            city: {value: '', error: ''}
        });
    }

    const getDisabled = () => {
        return Boolean(formData?.name.error ||
            formData?.age.error ||
            formData?.surname.error ||
            !formData?.name.value ||
            !formData?.surname.value ||
            !formData?.age.value ||
            !formData?.city.value);
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="form-container">
                <Input error={formData?.name.error} value={formData?.name.value || ''} onChange={handleChangeForm} name="name"
                       placeholder="Enter Name"/>
                <Input error={formData?.surname.error} value={formData?.surname.value || ''} onChange={handleChangeForm} name="surname"
                       placeholder="Enter Surname"/>
                <Input error={formData?.age.error} value={formData?.age.value.toString() || ''} onChange={handleChangeForm} name="age"
                       placeholder="Enter Age"/>
                <Select name="city"
                        options={cities}
                        defaultValue={formData?.city.value || null}
                        onSelect={handleChangeForm}
                />
                <Button disabled={getDisabled()} onClick={handleClick}>{actionType === 'create' ? 'Add' : 'Edit'}</Button>
            </div>
        </Modal>
    )
};
