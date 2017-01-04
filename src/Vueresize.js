import resizeSensor from 'resizeSensor'
import throttle from 'lodash.throttle'
import debounce from 'lodash.debounce'

const delay = 250

function getDelay(modifiers){
    if (!modifiers){
        return delay
    }
    const keys = Object.keys(modifiers)
    return (keys.length)? Number(keys[0]) : delay
}

export default {
    inserted (el, {value, arg, modifiers}) {
        let callBack =  () => value(el)
        switch (arg){
            case 'debounce':
                callBack = debounce(()=>value(el), getDelay(modifiers))

            case 'throttle':
                callBack = throttle(()=>value(el), getDelay(modifiers))
        }
        resizeSensor(el, callBack)
    }
}