import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToyOptimistic, setFilterBy } from '../store/actions/toy.actions.js'

import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'

export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        // The effect itself can't be async (React expects nothing or a cleanup back), so define and call one
        async function onLoadToys() {
            try {
                await loadToys()
            } catch {
                showErrorMsg('Cannot load toys!')
            }
        }
        onLoadToys()
    }, [filterBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    async function onRemoveToy(toyId) {
        try {
            await removeToyOptimistic(toyId)
            showSuccessMsg('Toy removed')
        } catch {
            showErrorMsg('Cannot remove toy')
        }
    }

    return (
        <section className="toy-index">
            <h2>Our Toys</h2>
            <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <Link to="/toy/edit" className="btn add-btn">+ Add Toy</Link>
            {!isLoading
                ? <ToyList toys={toys} onRemoveToy={onRemoveToy} />
                : <div>Loading...</div>
            }
        </section>
    )
}
