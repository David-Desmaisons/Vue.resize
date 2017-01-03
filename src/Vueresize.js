import resizeSensor from 'resizeSensor'

export default {
    inserted (el, {value}) {
        resizeSensor(el, () => value(el))
    }
}