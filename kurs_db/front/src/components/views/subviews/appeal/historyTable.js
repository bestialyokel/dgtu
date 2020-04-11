import React, { useContext, useEffect, useState } from "react"
import { TokenContext } from "../../../../context/context"
import Table from "../../../common/Table"



const columns = [
    {title: 'Описание', field: 'description'},
    {title: 'Статус', field: 'status'}
]

const HistoryTable = (props) => {
    const {appeal, onSelect} = props
    const {id_appeal} = appeal
    const token = useContext(TokenContext)

    const [state, setState] = useState({columns, data: []})

    const fillData = async () => {
        let url = new URL(`appeals/history/${id_appeal}`, 'http://localhost:8080')
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
            title={`История изменений контракта: id ${id_appeal}`}
            columns={state.columns}
            data={state.data}
            onRowClick={(event, rowData) => onSelect(rowData)}
        />
    )
}

export default HistoryTable