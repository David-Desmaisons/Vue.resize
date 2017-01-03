import {ResizeSensor} from 'css-element-queries'

export default {
    inserted (el, {value}) {
        ResizeSensor(el, () => value(el))
    }
}