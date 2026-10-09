import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToyOptimistic } from '../store/actions/toy.actions.js'

import { ToyList } from '../cmps/ToyList.jsx'

export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        loadToys()
            .catch(() => {
                showErrorMsg('Cannot load toys!')
            })
    }, [filterBy])

    function onRemoveToy(toyId) {
        removeToyOptimistic(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(() => {
                showErrorMsg('Cannot remove toy')
            })
    }

    return (
        <section className="toy-index">
            <h2>Our Toys</h2>
            <Link to="/toy/edit" className="add-btn">Add Toy</Link>
            {!isLoading
                ? <ToyList toys={toys} onRemoveToy={onRemoveToy} />
                : <div>Loading...</div>
            }
        </section>
    )
}
