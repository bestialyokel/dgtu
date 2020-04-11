import React, { useContext, useEffect, useState } from "react"
import { TokenContext } from "../../../../context/context"
import Table from "../../../common/Table"



const columns = [
    {title: 'Описание', field: 'description'},
    {title: 'Статус', field: 'status'}
]

const HistoryTable = (props) => {
    const {job, onSelect} = props
    const {id_job} = job
    const token = useContext(TokenContext)

    const [state, setState] = useState({columns, data: []})

    const fillData = async () => {
        let url = new URL(`jobs/history/${id_job}`, 'http://localhost:8080')
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
            title={`История изменений работы: id ${id_job}`}
            columns={state.columns}
            data={state.data}
            onRowClick={(event, rowData) => onSelect(rowData)}
        />
    )
}

export default HistoryTable