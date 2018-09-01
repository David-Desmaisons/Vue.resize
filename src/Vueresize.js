import ResizeSensor from 'resizeSensor'
import lodashDebounce from 'lodash.debounce'

const { debounce = lodashDebounce } = lodashDebounce;
const delay = 150;

function getDelay(modifiers) {
  if (!modifiers) {
    return delay;
  }
  const keys = Object.keys(modifiers);
  return (keys.length) ? Number(keys[0]) : delay;
}

function createResizeSensor(el, { value, arg, modifiers }) {
  if (el.resizeSensor) {
    return;
  }
  if (el.style.display === 'none') {
    return;
  }
  let callBack = () => value(el);
  switch (arg) {
    case 'debounce':
      callBack = debounce(() => value(el), getDelay(modifiers));
      break;

    case 'throttle':
      const delay = getDelay(modifiers)
      callBack = debounce(() => value(el), delay, { leading: true, trailing: true, maxWait: delay });
      break;
  }
  return new ResizeSensor(el, callBack);
}

export default {
  inserted(el, { value, arg, modifiers }) {
    if (!value) {
      console.warn('method or v-resize is not implemented as to $el');
    }
    createResizeSensor(el, { value, arg, modifiers });
  },
  componentUpdated(el, { value, arg, modifiers }) {
    createResizeSensor(el, { value, arg, modifiers });
  }
}
