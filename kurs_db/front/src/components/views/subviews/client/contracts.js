import Table from "../../../common/Table"
import React, { useEffect, useContext, useState } from "react"
import { TokenContext } from "../../../../context/context"
import { useHistory } from "react-router-dom"

const columns = [
    {title: 'ID контракта', field: 'id_contract', editable: 'never'},
    {title: 'Тариф', field: 'id_tariff', editable: 'never',},
    {title: 'Адрес', field: 'address'},
    {title: 'Тип контракта', field: 'contract_type', 
        lookup: {'ф' : 'физ. лицо', 'ю': 'юр. лицо'}
    }
]

const contracts = (props) => {
    const {client} = props
    
    const token = useContext(TokenContext)

    const {contracts, id_client} = client

    const [state, setState] = useState({columns, data: []})

    const history = useHistory()

    useEffect(() => {
        ;(async () => {
            contracts.forEach(async x => {
                let url = new URL(`contracts/${x}`, 'http://localhost:8080')
                url.search = new URLSearchParams({key: token})
                let req = await fetch(url, {method: 'GET'})
                const {contract} = await req.json()
                setState(oldState => {
                    return {
                        ...oldState,
                        data: [...oldState.data, contract]
                    }
                })
            });
        })()
    }, [])

    const addContract = async (newData) => {
        let url = new URL(`contracts`, 'http://localhost:8080')
        url.search = new URLSearchParams({ key: token, ...newData, id_client})
        try {
            let req = await fetch(url, {method: 'POST'})
            const {id} = await req.json()
            url = new URL(`contracts/${id}`, 'http://localhost:8080')
            url.search = new URLSearchParams({key: token})
            req = await fetch(url, {method: 'GET'})
            const {contract} = await req.json()
            setState(oldState => {
                return {
                    ...oldState,
                    data: [...state.data, contract]
                }
            })
        } catch(error) {
            console.log(error)
        }
    }

    const editable = {
        onRowAdd: addContract
    }

    return (
        <Table
            title={`Клиент: ${[client.name, client.surname, client.patronymic].join(' ')}`}
            columns={state.columns}
            data={state.data}
            editable={editable}
            onRowClick={(event, rowData) => history.push(`/contracts/${rowData.id_contract}`) }
        />
    )
}

export default contracts