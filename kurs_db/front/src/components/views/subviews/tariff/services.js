import Table from "../../../common/Table"
import React, { useEffect, useContext, useState } from "react"
import { TokenContext } from "../../../../context/context"
import { useHistory } from "react-router-dom"
import service from "../service/service"

const columns = [
    {title: 'ID Услуги', field: 'id_service', editable: 'never'},
    {title: 'Название', field: 'name'},
    {title: 'Описание', field: 'description'}
]

const services = (props) => {
    const {tariff, isEdit, onServiceSetChange} = props
    
    const token = useContext(TokenContext)

    const {services, id_tariff, name} = tariff

    const [state, setState] = useState({columns, data: []})

    const history = useHistory()

    console.log(isEdit)

    useEffect(() => {
        ;(async () => {
            if (!isEdit)
                services.forEach(async x => {
                    let url = new URL(`services/${x}`, 'http://localhost:8080')
                    url.search = new URLSearchParams({key: token})
                    let req = await fetch(url, {method: 'GET'})
                    const {service} = await req.json()
                    setState(oldState => {
                        return {
                            ...oldState,
                            data: [...oldState.data, service]
                        }
                    })
                });
            else {
                let url = new URL(`services`, 'http://localhost:8080')
                url.search = new URLSearchParams({key: token})
                let req = await fetch(url, {method: 'GET'})
                const {services} = await req.json()
                services.forEach(async x => {
                    let url = new URL(`services/${x}`, 'http://localhost:8080')
                    url.search = new URLSearchParams({key: token})
                    let req = await fetch(url, {method: 'GET'})
                    const {service} = await req.json()
                    setState(oldState => {
                        return {
                            ...oldState,
                            data: [...oldState.data, service]
                        }
                    })
                })
            }
        })()
        
        return () => {
            setState(oldState => {
                return {...oldState, data: []}
            })
        }
    }, [isEdit])

    return (
        <Table
            title={`Тариф: ${name}`}
            columns={state.columns}
            data={state.data}
            options={{
                selection: isEdit
            }}
            onSelectionChange={rows => onServiceSetChange(rows.map(x => x.id_service)) }
            //editable={editable}
            onRowClick={(event, rowData) => history.push(`/services/${rowData.id_service}`) }
        />
    )
}

export default services