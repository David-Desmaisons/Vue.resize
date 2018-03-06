import ResizeSensor from 'resizeSensor'
import lodashDebounce from 'lodash.debounce'

const { debounce = lodashDebounce } = lodashDebounce
const delay = 150

function getDelay (modifiers) {
    if (!modifiers){
        return delay
    }
    const keys = Object.keys(modifiers)
    return (keys.length) ? Number(keys[0]) : delay
}

export default {
    inserted (el, {value, arg, modifiers}) {
        let callBack = () => value(el)
        switch (arg) {
            case 'debounce':
                callBack = debounce(()=>value(el), getDelay(modifiers))
                break

            case 'throttle':
                const delay = getDelay(modifiers)
                callBack = debounce(()=>value(el), delay, {leading: true, trailing: true, maxWait: delay})
                break
        }
        const resizeSensor = new ResizeSensor(el, callBack)
    }
}
