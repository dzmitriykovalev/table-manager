import React, {useCallback, useState} from 'react';
import './App.css';
import {Table, TTableData} from "./components";
import {Form} from "./components/Form";

export type TTableState = {
    id: string,
    isMainTable: boolean,
    data: TTableData[]
}

export type TFormState = {
    isOpen: boolean,
    action: 'create' | 'update',
    tableId: string,
    data: TTableData | null
}

function App() {
    const [tables, setTables] = useState<TTableState[]>([{
        id: 'table-1',
        isMainTable: true,
        data: []
    }]);
    const [formData, setFormData] = useState<TFormState>({ isOpen: false, action: 'create', tableId: '', data: null});

    const getTableId = (tableId: string) => `table-${Number(tableId.split('-')[1]) + 1}`;

    const getRowId = (rowId: string) => `row-${Number(rowId.split('-')[1]) + 1}`;

    const handleCopyTable = (tableId: string) => {
      setTables((prevState) => {
        const tableById = prevState.find(({id}) => id === tableId);

        if(tableById) {
            const newTable = {...tableById, isMainTable: false, id: getTableId(prevState[prevState.length-1].id)};
            const newArr = [...prevState];
            newArr.push(newTable);

            return newArr;
        }
        return prevState;
      });
    };

    const handleDeleteTable = (tableId: string, isMainTable: boolean) => {
        if(!isMainTable) {
            setTables(prevState => prevState.filter(({id, isMainTable}) => tableId !== id));
        }
    };

    const deleteRow = useCallback((tableId: string, rowId: string) => {
        setTables((prevState) => {
            const tableIndex = prevState.findIndex(({id}) => id === tableId);

            if(tableIndex >= 0) {
                const newArr = [...prevState];
                const tableByIndex = newArr[tableIndex];
                newArr[tableIndex] = {...tableByIndex, data: tableByIndex.data.filter(({id}) => id !== rowId)};

                return newArr;
            }
            return prevState;
        });
    },[]);

    const openForm = (action: 'create' | 'update', tableId: string, data?: TTableData) => {
        setFormData({isOpen: true, action, tableId, data: data ? data : null});
    }

    const handleCloseForm = () => {
        setFormData({isOpen: false, action: 'create', tableId: '', data: null});
    }

    const handleCreateRow = (tableId: string, data: Omit<TTableData, 'id'>) => {
        setTables((prevState) => {
            const tableIndex = prevState.findIndex(({id}) => id === tableId);

            if(tableIndex >= 0) {
                const newArr = [...prevState];
                const tableByIndex = newArr[tableIndex];
                const newTableData = [...tableByIndex.data];
                const lastRow = newTableData[newTableData.length-1];
                newTableData.push({...data, id: lastRow ? getRowId(lastRow.id) : 'row-1'});
                newArr[tableIndex] = {...tableByIndex, data: newTableData};

                return newArr;
            }
            return prevState;
        });
        handleCloseForm();
    }

    const handleUpdateRow = useCallback((tableId: string, data: TTableData) => {
        setTables((prevState) => {
            const tableIndex = prevState.findIndex(({id}) => id === tableId);

            if(tableIndex >= 0) {
                const newArr = [...prevState];
                const tableByIndex = newArr[tableIndex];
                const newTableData = [...tableByIndex.data];
                const rowIndex = newTableData.findIndex(({id}) => id === data.id);

                if(rowIndex >= 0) {
                    newTableData[rowIndex] = data;
                    newArr[tableIndex] = {...tableByIndex, data: newTableData};

                    return newArr;
                }

                return prevState;
            }
            return prevState;
        });
        handleCloseForm();
    },[]);

    return (
        <div className="App">
            {tables.map(({id, data, isMainTable}) => (
                <Table
                    key={id}
                    tableId={id}
                    data={data}
                    isMainTable={isMainTable}
                    onCopy={handleCopyTable}
                    onDelete={handleDeleteTable}
                    onDeleteRow={deleteRow}
                    openForm={openForm}
                />
            ))}
            <Form actionType={formData.action}
                  isOpen={formData.isOpen}
                  data={formData.data}
                  onClose={handleCloseForm}
                  onCreate={handleCreateRow}
                  onUpdate={handleUpdateRow}
                  tableId={formData.tableId}
            />
        </div>
    );
}

export default App;
