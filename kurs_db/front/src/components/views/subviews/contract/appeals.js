import Table from "../../../common/Table"
import React, { useEffect, useContext, useState } from "react"
import { TokenContext } from "../../../../context/context"
import { useHistory } from "react-router-dom"

const columns = [
    {title: 'ID обращения', field: 'id_appeal', editable: 'never'},
    {title: 'Описание', field: 'description'},
    {title: 'Статус', field: 'status', 
        lookup: {'o' : 'Открыт', 'c': 'Закрыт', 'p': 'Ведутся работы'}
    }
]

const appeals = (props) => {
    const {contract} = props
    
    const token = useContext(TokenContext)

    const {appeals, id_contract} = contract

    const [state, setState] = useState({columns, data: []})

    const history = useHistory()

    useEffect(() => {
        ;(async () => {
            appeals.forEach(async x => {
                let url = new URL(`appeals/${x}`, 'http://localhost:8080')
                url.search = new URLSearchParams({key: token})
                let req = await fetch(url, {method: 'GET'})
                const {appeal} = await req.json()
                setState(oldState => {
                    return {
                        ...oldState,
                        data: [...oldState.data, appeal]
                    }
                })
            });
        })()
    }, [])

    const addAppeal = async (newData) => {
        let url = new URL(`appeals`, 'http://localhost:8080')
        url.search = new URLSearchParams({ key: token, ...newData, id_contract})
        try {
            let req = await fetch(url, {method: 'POST'})
            const {id} = await req.json()
            url = new URL(`appeals/${id}`, 'http://localhost:8080')
            url.search = new URLSearchParams({key: token})
            req = await fetch(url, {method: 'GET'})
            const {appeal} = await req.json()
            setState(oldState => {
                return {
                    ...oldState,
                    data: [...state.data, appeal]
                }
            })
        } catch(error) {
            console.log(error)
        }
    }

    const editable = {
        onRowAdd: addAppeal
    }

    return (
        <Table
            title={`Контракт: ${id_contract}`}
            columns={state.columns}
            data={state.data}
            editable={editable}
            onRowClick={(event, rowData) => history.push(`/appeals/${rowData.id_appeal}`) }
        />
    )
}

export default appeals