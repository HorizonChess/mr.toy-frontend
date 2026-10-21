import { useState, useRef } from 'react'
import { TextField, MenuItem, Checkbox, ListItemText, Chip, Box } from '@mui/material'

import { utilService } from '../services/util.service.js'
import { toyService } from '../services/toy.service.js'
import { useEffectUpdate } from '../hooks/useEffectUpdate.js'

// Shared by all filter fields
const fieldProps = { size: 'small', sx: { minWidth: 180, bgcolor: 'white' } }
// Keeps the label floating so an empty value can show its "All" / "None" option
const emptyOptionSlotProps = { select: { displayEmpty: true }, inputLabel: { shrink: true } }

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

                <TextField select {...fieldProps}
                    label="Labels"
                    name="labels"
                    value={filterByToEdit.labels}
                    onChange={handleChange}
                    slotProps={{
                        select: {
                            multiple: true,
                            renderValue: selected => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map(label => <Chip key={label} label={label} size="small" />)}
                                </Box>
                            ),
                        },
                    }}
                >
                    {labels.map(label => (
                        <MenuItem key={label} value={label}>
                            <Checkbox size="small" checked={filterByToEdit.labels.includes(label)} />
                            <ListItemText primary={label} />
                        </MenuItem>
                    ))}
                </TextField>

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
