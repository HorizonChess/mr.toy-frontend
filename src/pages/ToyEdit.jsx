import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { toyService } from '../services/toy.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { saveToy } from '../store/actions/toy.actions.js'

import { ToyEditForm } from '../cmps/ToyEditForm.jsx'

export function ToyEdit() {
    const navigate = useNavigate()
    const { toyId } = useParams()
    // Editing: null until the toy arrives, so the form only mounts with the real values
    const [toyToEdit, setToyToEdit] = useState(toyId ? null : toyService.getEmptyToy())

    useEffect(() => {
        if (toyId) loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToyToEdit(toy))
            .catch(err => {
                console.log('Had issues in toy edit', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }

    // Returns the promise so Formik knows when the submit is over (isSubmitting)
    function onSaveToy(toy) {
        return saveToy(toy)
            .then(() => {
                showSuccessMsg('Toy Saved!')
                navigate('/toy')
            })
            .catch(err => {
                console.log('Had issues in toy edit', err)
                showErrorMsg('Cannot save toy')
            })
    }

    if (!toyToEdit) return <div>Loading...</div>
    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>
            <ToyEditForm toy={toyToEdit} onSave={onSaveToy} />
        </section>
    )
}
