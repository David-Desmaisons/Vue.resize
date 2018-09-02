import ResizeSensor from 'resizeSensor'
import lodashDebounce from 'lodash.debounce'

const { debounce = lodashDebounce } = lodashDebounce;
const defaultDelay = 150;

function getOptions(modifiers) {
  if (!modifiers) {
    return { delay: defaultDelay, initial: false }
  }
  const { initial = false } = modifiers;
  let delay = Object.keys(modifiers).map(k => parseInt(k)).find(v => !isNaN(v));
  delay = delay || defaultDelay;
  return { delay, initial }
}

function getDisplay(element) {
  const { display } = element.style;
  if (display) {
    return display;
  }
  const style = element.currentStyle
    ? element.currentStyle
    : getComputedStyle(element, null);
  return style.display;
}

function createResizeSensor(el, { value, arg, modifiers }) {
  if (el.resizeSensor) {
    return;
  }
  if (getDisplay(el) === 'none') {
    return;
  }
  let callBack = () => value(el);
  const options = getOptions(modifiers);
  switch (arg) {
    case 'debounce':
      callBack = debounce(() => value(el), options.delay);
      break;

    case 'throttle':
      callBack = debounce(() => value(el), options.delay, { leading: true, trailing: true, maxWait: options.delay });
      break;
  }

  const res = new ResizeSensor(el, callBack);
  if (options.initial) {
    value(el);
  }
  return res;
}

export default {
  inserted(el, { value, arg, modifiers }) {
    if (!value || typeof value !== 'function') {
      console.warn('v-resize should received a function as value');
      return;
    }
    createResizeSensor(el, { value, arg, modifiers });
  },
  componentUpdated(el, { value, arg, modifiers }) {
    createResizeSensor(el, { value, arg, modifiers });
  }
}
