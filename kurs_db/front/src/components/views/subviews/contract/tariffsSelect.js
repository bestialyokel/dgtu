import React from "react"
import { useContext } from "react"
import { TokenContext } from "../../../../context/context"
import { useState } from "react"
import { useEffect } from "react"
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core"

const tariffsSelect = (props) => {
    const token = useContext(TokenContext)

    const {value, disabled, onSelect} = props


    const [state, setState] = useState({})

    const fillTariffs = async () => {
        let url = new URL(`tariffs`, 'http://localhost:8080')
        url.search = new URLSearchParams({key: token})
        const req = await fetch(url, {method: "GET"})
        const {tariffs} = await req.json()
        tariffs.forEach(async (x) => {
            let url = new URL(`tariffs/${x}`, 'http://localhost:8080')
            url.search = new URLSearchParams({key: token})
            const req = await fetch(url, {method: "GET"})
            const {tariff} = await req.json()
            setState(oldState => {
                let newState = {...oldState}
                newState[tariff.id_tariff] = tariff
                return newState
            })
        })
    }

    useEffect(() => {
        fillTariffs()
    }, [])

    return (
        <FormControl 
            //className={"none"} 
            disabled={disabled}
            autoWidth
        >
        <InputLabel shrink id="tariff-label">
            Тариф
        </InputLabel>
                <Select
                    fullWidth
                    labelId="tariff-label"
                    id="tariff-select"
                    value={state[value] ? value : 0}
                    onChange={(event) => onSelect(event.target.value)}
                >
                    {Object.keys(state).map(x => {
                        const {id_tariff, name} = state[x]
                        return (<MenuItem value={id_tariff}>{name}</MenuItem>)
                    })}
                    <MenuItem value={0}>
                        Без тарифа 
                    </MenuItem>
                </Select>
        </FormControl>
    )


}

export default tariffsSelect

