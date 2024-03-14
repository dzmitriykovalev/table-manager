import React, {memo} from "react";
import {TTableData} from "../Table";
import {TCity} from "../../../const";

import './TableItem.scss';
import {Button} from "../../Button";

export type TTableItem = {
    id: string,
    name: string,
    surname: string
    age: number,
    city: TCity,
    tableId: string,
    deleteRow: (tableId: string, rowId: string) => void,
    editRow: (action: 'create' | 'update', tableId: string, data: TTableData) => void,
}

export const TableItem = memo(({id, name, surname, age, city, deleteRow, tableId, editRow}: TTableItem) => {
    return (
        <tr key={id} className="tr">
            <td className="td" data-label="Name">{name}</td>
            <td className="td" data-label="Surname">{surname}</td>
            <td className="td" data-label="Age">{age}</td>
            <td className="td" data-label="City">{city.label || ''}</td>
            <td>
                <div className="btn-table-row">
                    <Button variant="text" color="main"
                            onClick={() => editRow('update', tableId, {id, name, surname, age, city})}>
                        edit
                    </Button>
                    <Button variant="text" color="error" onClick={() => deleteRow(tableId, id)}>delete</Button>
                </div>
            </td>
        </tr>
    )
});
