import { useState, useRef } from 'react'

import { utilService } from '../services/util.service.js'
import { useEffectUpdate } from '../hooks/useEffectUpdate.js'

export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const onSetFilterDebounce = useRef(utilService.debounce(onSetFilter, 300))

    useEffectUpdate(() => {
        onSetFilterDebounce.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return (
        <section className="toy-filter">
            <form onSubmit={ev => ev.preventDefault()}>
                <label htmlFor="txt">Name:</label>
                <input type="text"
                    id="txt"
                    name="txt"
                    placeholder="Search by name"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />
            </form>
        </section>
    )
}
