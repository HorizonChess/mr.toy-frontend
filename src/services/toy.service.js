import { httpService } from './http.service.js'

const BASE_URL = 'toy/'

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getLabels,
    getStats,
}

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL + toy._id, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

function getStats() {
    return httpService.get(BASE_URL + 'stats')
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
