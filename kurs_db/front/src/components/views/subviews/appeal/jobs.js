import Table from "../../../common/Table"
import React, { useEffect, useContext, useState } from "react"
import { TokenContext } from "../../../../context/context"
import { useHistory } from "react-router-dom"

const columns = [
    {title: 'ID работы', field: 'id_job', editable: 'never'},
    {title: 'Описание', field: 'description'},
    {title: 'Статус', field: 'status', 
        lookup: {'o' : 'Открыт', 'c': 'Закрыт', 'p': 'Ведутся работы'}
    }
]

const jobs = (props) => {
    const {appeal} = props
    
    const token = useContext(TokenContext)

    const {jobs, id_appeal} = appeal

    const [state, setState] = useState({columns, data: []})

    const history = useHistory()

    useEffect(() => {
        ;(async () => {
            jobs.forEach(async x => {
                let url = new URL(`jobs/${x}`, 'http://localhost:8080')
                url.search = new URLSearchParams({key: token})
                let req = await fetch(url, {method: 'GET'})
                const {job} = await req.json()
                setState(oldState => {
                    return {
                        ...oldState,
                        data: [...oldState.data, job]
                    }
                })
            });
        })()
    }, [])

    const addJob = async (newData) => {
        let url = new URL(`jobs`, 'http://localhost:8080')
        url.search = new URLSearchParams({ key: token, ...newData, id_appeal})
        try {
            let req = await fetch(url, {method: 'POST'})
            const {id} = await req.json()
            url = new URL(`jobs/${id}`, 'http://localhost:8080')
            url.search = new URLSearchParams({key: token})
            req = await fetch(url, {method: 'GET'})
            const {job} = await req.json()
            setState(oldState => {
                return {
                    ...oldState,
                    data: [...state.data, job]
                }
            })
        } catch(error) {
            console.log(error)
        }
    }

    const editable = {
        onRowAdd: addJob
    }

    return (
        <Table
            title={`Обращение : id ${id_appeal}`}
            columns={state.columns}
            data={state.data}
            editable={editable}
            onRowClick={(event, rowData) => history.push(`/jobs/${rowData.id_job}`) }
        />
    )
}

export default jobs