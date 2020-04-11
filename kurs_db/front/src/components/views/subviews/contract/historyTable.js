import React, { useContext, useEffect, useState } from "react"
import { TokenContext } from "../../../../context/context"
import Table from "../../../common/Table"



const columns = [
    {title: 'ID тарифа', field: 'id_tariff'},
    {title: 'Адрес', field: 'address'},
    {title: 'Тип контракта', field: 'contract_type'},
]

const HistoryTable = (props) => {
    const {contract, onSelect} = props
    const {id_contract} = contract
    const token = useContext(TokenContext)

    const [state, setState] = useState({columns, data: []})

    const fillData = async () => {
        let url = new URL(`contracts/history/${id_contract}`, 'http://localhost:8080')
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
            title={`История изменений контракта: id ${id_contract}`}
            columns={state.columns}
            data={state.data}
            onRowClick={(event, rowData) => onSelect(rowData)}
        />
    )
}

export default HistoryTable