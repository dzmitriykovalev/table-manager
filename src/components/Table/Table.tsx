import {TableItem} from "./TableItem";
import {TCity} from "../../const";

import './Table.scss';
import {Button} from "../Button";
import {CloseIcon} from "../СloseIcon";

export type TTableData = {
    id: string,
    name: string,
    surname: string
    age: number,
    city: TCity
}

export type TTable = {
    tableId: string,
    data: TTableData[],
    onCopy: (tableId: string) => void,
    onDelete: (tableId: string, isMainTable: boolean) => void,
    onDeleteRow: (tableId: string, rowId: string) => void,
    openForm: (action: 'create' | 'update', tableId: string) => void
    isMainTable: boolean
}

export const Table = ({
                          tableId,
                          data = [],
                          onCopy,
                          onDelete,
                          isMainTable,
                          onDeleteRow,
                          openForm
                      }: TTable) => {
    return (
        <div className="table-container">
            <div className="btn-row">
                <Button onClick={() => openForm('create', tableId)}>Add New Row</Button>
                <Button onClick={() => onCopy(tableId)}>Copy</Button>
                {!isMainTable && <Button variant="text" onClick={() => onDelete(tableId, isMainTable)}><CloseIcon color="red"/></Button>}
            </div>
            <table className="table" cellSpacing={0} cellPadding={0}>
                <thead className="table-head">
                <tr>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Age</th>
                    <th>City</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {data.map(({id, name, age, city, surname}) => (
                    <TableItem id={id}
                               key={id}
                               name={name}
                               surname={surname}
                               age={age}
                               city={city}
                               deleteRow={onDeleteRow}
                               editRow={openForm}
                               tableId={tableId}/>
                ))}
                </tbody>
            </table>
        </div>
    );
};
