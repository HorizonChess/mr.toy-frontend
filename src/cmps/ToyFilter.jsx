import { useState, useRef } from 'react'
import { TextField, MenuItem } from '@mui/material'

import { utilService } from '../services/util.service.js'
import { useEffectUpdate } from '../hooks/useEffectUpdate.js'

import { LabelsSelect } from './LabelsSelect.jsx'

// Shared by all filter fields - sizing comes from the grid in ToyFilter.css, colors from mui.css
const fieldProps = { size: 'small', fullWidth: true }
// Keeps the label floating so an empty value can show its "All" / "None" option
const emptyOptionSlotProps = { select: { displayEmpty: true }, inputLabel: { shrink: true } }

export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const onSetFilterDebounce = useRef(utilService.debounce(onSetFilter, 300))

    useEffectUpdate(() => {
        onSetFilterDebounce.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        if (field === 'inStock') value = value === '' ? undefined : value === 'true'
        // MUI Select gives an array, or a comma-separated string on browser autofill
        if (field === 'labels' && typeof value === 'string') value = value.split(',')
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return (
        <section className="toy-filter">
            <form onSubmit={ev => ev.preventDefault()}>
                <TextField {...fieldProps}
                    label="Name"
                    name="txt"
                    placeholder="Search by name"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />

                <TextField select {...fieldProps}
                    label="Stock"
                    name="inStock"
                    value={filterByToEdit.inStock === undefined ? '' : String(filterByToEdit.inStock)}
                    onChange={handleChange}
                    slotProps={emptyOptionSlotProps}
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="true">In stock</MenuItem>
                    <MenuItem value="false">Out of stock</MenuItem>
                </TextField>

                <LabelsSelect {...fieldProps}
                    name="labels"
                    value={filterByToEdit.labels}
                    onChange={handleChange}
                />

                <TextField select {...fieldProps}
                    label="Sort by"
                    name="sortBy"
                    value={filterByToEdit.sortBy}
                    onChange={handleChange}
                    slotProps={emptyOptionSlotProps}
                >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="name">Name</MenuItem>
                    <MenuItem value="price">Price</MenuItem>
                    <MenuItem value="createdAt">Newest</MenuItem>
                </TextField>
            </form>
        </section>
    )
}
