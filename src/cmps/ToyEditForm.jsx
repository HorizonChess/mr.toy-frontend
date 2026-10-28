import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { TextField, FormControlLabel, Checkbox } from '@mui/material'

import { useConfirmTabClose } from '../hooks/useConfirmTabClose.js'

import { LabelsSelect } from './LabelsSelect.jsx'

// Only what the user can get wrong through this form: labels and inStock come from
// fixed options, so they're the backend's job (Postman can still send anything)
const toySchema = Yup.object({
    name: Yup.string()
        .trim()
        .max(20, 'Name too long, up to 20 chars')
        .required('Name is required'),
    price: Yup.number()
        // An empty field should say "required", not "can't contain letters"
        .transform((value, originalValue) => originalValue === '' ? undefined : value)
        .typeError("Price can't contain letters")
        .positive('Price must be more than $0')
        .max(5000, 'Price can be up to $5,000')
        .required('Price is required'),
})

export function ToyEditForm({ toy, onSave }) {
    const setHasChanges = useConfirmTabClose()

    const formik = useFormik({
        initialValues: toy,
        validationSchema: toySchema,
        // Formik keeps the raw input (price is the string "12"), cast gives the clean typed toy
        onSubmit: values => onSave(toySchema.cast(values)),
    })
    const { values, errors, touched, dirty, isSubmitting, handleChange, handleBlur, handleSubmit } = formik

    // Warn on tab close only while the values differ from the loaded toy
    useEffect(() => {
        setHasChanges(dirty)
    }, [dirty, setHasChanges])

    // Show a field's error only after the user left it (or tried to submit).
    // A blank helperText keeps the space reserved, so the form doesn't jump when an error appears
    function getErrorProps(field) {
        const isShown = touched[field] && !!errors[field]
        return { error: isShown, helperText: isShown ? errors[field] : ' ' }
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            <TextField
                label="Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                {...getErrorProps('name')}
            />

            {/* type="text" on purpose: a number input silently drops letters, so our message would never show */}
            <TextField
                label="Price ($)"
                name="price"
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
                slotProps={{ htmlInput: { inputMode: 'decimal' } }}
                {...getErrorProps('price')}
            />

            <LabelsSelect
                name="labels"
                value={values.labels}
                onChange={handleChange}
            />

            <FormControlLabel
                label="In stock"
                control={<Checkbox name="inStock" checked={values.inStock} onChange={handleChange} />}
            />

            <div className="form-actions">
                <button type="submit" disabled={isSubmitting}>{toy._id ? 'Save' : 'Add'}</button>
                <Link to="/toy" className="btn btn-outline btn-secondary">Cancel</Link>
            </div>
        </form>
    )
}
