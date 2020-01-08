import React, { Component, useState, useEffect } from "react";

import MaterialTable from 'material-table';

const Clients = (props) => {
    const [isLoading, setLoading] = useState(true)
    const [state, setState] = useState({
        columns: [
            {title: 'ID клиента', field: 'idclient'},
            {title: 'Имя', field: 'name'},
            {title: 'Фамилия', field: 'surname'},
            {title: 'Отчество', field: 'patronymic'},
            {title: 'Номер тел.', field: 'phonenumber'}
        ],
        data: []
    })

    let editable = {
        onRowAdd: () => {},
        onRowUpdate: () => {},
        onRowDelete: () => {}
    }


    return (
        <MaterialTable
            title="Clients"
            columns={state.columns}
            data={state.data}
            editable={editable}
        />
    )




}

export default Clients