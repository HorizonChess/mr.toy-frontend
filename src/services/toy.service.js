import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'toyDB'

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getLabels,
}

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                toys = toys.filter(toy => regExp.test(toy.name))
            }
            if (filterBy.inStock !== undefined) {
                toys = toys.filter(toy => toy.inStock === filterBy.inStock)
            }
            if (filterBy.labels && filterBy.labels.length) {
                toys = toys.filter(toy => filterBy.labels.every(label => toy.labels.includes(label)))
            }
            if (filterBy.sortBy) _sortToys(toys, filterBy.sortBy)
            return toys
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        toy.createdAt = Date.now()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: [],
        inStock: true,
        imgUrl: '',
    }
}

function getDefaultFilter() {
    return { txt: '', inStock: undefined, labels: [], sortBy: '' }
}

function getLabels() {
    return [...labels]
}

function _sortToys(toys, sortBy) {
    if (sortBy === 'name') toys.sort((t1, t2) => t1.name.localeCompare(t2.name))
    else if (sortBy === 'price') toys.sort((t1, t2) => t1.price - t2.price)
    else if (sortBy === 'createdAt') toys.sort((t1, t2) => t2.createdAt - t1.createdAt)
}

function _createToys() {
    var toys = utilService.loadFromStorage(STORAGE_KEY)
    if (toys && toys.length > 0) return

    const names = ['Talking Doll', 'Race Car', 'Rubik Cube', 'Teddy Bear', 'Paint Set', 'Kite',
        'Lego Castle', 'Baby Rattle', 'Robot Dog', 'Jigsaw Puzzle', 'Monopoly', 'Water Gun']

    toys = names.map(name => _createToy(name))
    utilService.saveToStorage(STORAGE_KEY, toys)
}

function _createToy(name) {
    const toyLabels = labels.filter(() => Math.random() > 0.7)
    return {
        _id: utilService.makeId(),
        name,
        imgUrl: `https://robohash.org/${encodeURIComponent(name)}?set=set4`,
        price: utilService.getRandomIntInclusive(20, 300),
        labels: toyLabels.length ? toyLabels : [labels[utilService.getRandomIntInclusive(0, labels.length - 1)]],
        createdAt: Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24 * 365),
        inStock: Math.random() > 0.3,
    }
}
