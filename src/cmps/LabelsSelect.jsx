import { TextField, MenuItem, Checkbox, ListItemText, Chip } from '@mui/material'

import { toyService } from '../services/toy.service.js'

// MUI multiselect for toy labels: selected labels show as chips, options have checkboxes.
// Any other TextField prop (name, onChange, size, error, helperText...) passes straight through.
export function LabelsSelect({ value, ...props }) {
    const labels = toyService.getLabels()

    return (
        <TextField select
            label="Labels"
            value={value}
            {...props}
            slotProps={{
                select: {
                    multiple: true,
                    renderValue: selected => (
                        <div className="label-chips">
                            {selected.map(label => <Chip key={label} label={label} size="small" />)}
                        </div>
                    ),
                },
            }}
        >
            {labels.map(label => (
                <MenuItem key={label} value={label}>
                    <Checkbox size="small" checked={value.includes(label)} />
                    <ListItemText primary={label} />
                </MenuItem>
            ))}
        </TextField>
    )
}
