import React, { useContext, useEffect, useState } from "react"
import { TokenContext } from "../../../../context/context"
import Table from "../../../common/Table"



const columns = [
    {title: 'Название', field: 'name'},
    {title: 'Платеж', field: 'payment'},
    {title: 'Период', field: 'period'}
]

const HistoryTable = (props) => {
    const {tariff, onSelect} = props
    const {id_tariff} = tariff
    const token = useContext(TokenContext)

    const [state, setState] = useState({columns, data: []})

    const fillData = async () => {
        let url = new URL(`tariffs/history/${id_tariff}`, 'http://localhost:8080')
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
            title={`История изменений тарифа: id ${tariff.name}`}
            columns={state.columns}
            data={state.data}
            onRowClick={(event, rowData) => onSelect(rowData)}
        />
    )
}

export default HistoryTable