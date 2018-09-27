import ResizeSensor from 'resizeSensor'
import lodashDebounce from 'lodash.debounce'
require('./findPolyfill');
require('intersection-observer');

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

function listenToVisible(element, callback) {
  const options = {
    root: document.documentElement
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback();
        observer.disconnect();
      }
    });
  }, options);

  observer.observe(element);
  return observer;
}

function createResizeSensor(el, { value, arg, modifiers }) {
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
    if (el.offsetParent) {
      createResizeSensor(el, { value, arg, modifiers });
      return;
    }
    el.__visibility__listener__ = listenToVisible(el, () => createResizeSensor(el, { value, arg, modifiers }))
  },
  unbind(el) {
    if (el.__visibility__listener__) {
      el.__visibility__listener__.disconnect();
    }
    if (!el.resizeSensor) {
      return;
    }
    ResizeSensor.detach(el);
  }
}
