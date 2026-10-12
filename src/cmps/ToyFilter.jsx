import { useState, useRef } from 'react'

import { utilService } from '../services/util.service.js'
import { toyService } from '../services/toy.service.js'
import { useEffectUpdate } from '../hooks/useEffectUpdate.js'

export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const onSetFilterDebounce = useRef(utilService.debounce(onSetFilter, 300))
    const labels = toyService.getLabels()

    useEffectUpdate(() => {
        onSetFilterDebounce.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        if (field === 'inStock') value = value === '' ? undefined : value === 'true'
        if (type === 'select-multiple') value = [...target.selectedOptions].map(option => option.value)
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

                <label htmlFor="inStock">Stock:</label>
                <select
                    id="inStock"
                    name="inStock"
                    value={filterByToEdit.inStock === undefined ? '' : String(filterByToEdit.inStock)}
                    onChange={handleChange}
                >
                    <option value="">All</option>
                    <option value="true">In stock</option>
                    <option value="false">Out of stock</option>
                </select>

                <label htmlFor="labels">Labels:</label>
                <select multiple
                    id="labels"
                    name="labels"
                    value={filterByToEdit.labels}
                    onChange={handleChange}
                >
                    {labels.map(label => <option key={label} value={label}>{label}</option>)}
                </select>

                <label htmlFor="sortBy">Sort by:</label>
                <select
                    id="sortBy"
                    name="sortBy"
                    value={filterByToEdit.sortBy}
                    onChange={handleChange}
                >
                    <option value="">None</option>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="createdAt">Newest</option>
                </select>
            </form>
        </section>
    )
}
