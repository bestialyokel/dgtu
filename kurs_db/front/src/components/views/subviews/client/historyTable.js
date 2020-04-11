import React, { useContext, useEffect, useState } from "react"
import { TokenContext } from "../../../../context/context"
import Table from "../../../common/Table"



const columns = [
    {title: 'Имя', field: 'name'},
    {title: 'Фамилия', field: 'surname'},
    {title: 'Отчество', field: 'patronymic'},
    {title: 'Номер тел.', field: 'phone_number'}
]

const HistoryTable = (props) => {
    const {client, onSelect} = props
    const {id_client} = client
    const token = useContext(TokenContext)

    const [state, setState] = useState({columns, data: []})

    const fillData = async () => {
        let url = new URL(`clients/history/${id_client}`, 'http://localhost:8080')
        url.search = new URLSearchParams({ key: token })
        try {
            const req = await fetch(url, {method: 'GET'})
            const {history} = await req.json()

            setState(oldState => {
                return {
                    ...oldState,
                    data: history
                }
            })
        
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        ;(async () => {
            fillData()
        })()
    }, [])


    return (
        <Table
            title={`История изменений клиента: ${[client.name, client.surname, client.patronymic].join(' ')}`}
            columns={state.columns}
            data={state.data}
            onRowClick={(event, rowData) => onSelect(rowData)}
        />
    )
}

export default HistoryTable