import { ElMessage } from "element-plus";

export default (name) => ({
  mounted(el, { value }) {
    let currentFormEls = [], focusableElements = [];
    el.handleTab = e => {
      if (e.keyCode != 9) return;
      let msg = '';
      if (e.shiftKey) {
        if (document.activeElement === focusableElements[0]) msg = '没有上一个了';
      } else {
        if (document.activeElement === focusableElements[focusableElements.length - 1]) msg = '没有下一个了';
      }
      if (msg) {
        e.preventDefault();
        ElMessage.warning({
          message: msg,
          grouping: true,
        });
        return;
      }
      if (e.shiftKey) {
        if (document.activeElement === currentFormEls[0]) {
          e.preventDefault();
          focusableElements[focusableElements.indexOf(document.activeElement) - 1].focus();
        }
      } else {
        if (document.activeElement === currentFormEls[currentFormEls.length - 1]) {
          e.preventDefault();
          focusableElements[focusableElements.indexOf(document.activeElement) + 1].focus();
        }
      }
    };
    el.addEventListener('keydown', el.handleTab);
    currentFormEls = getFocusableElements(el);
    if (value) {
      const attrName = `${name}-name`;
      el.setAttribute(attrName, value);
      nextTick(() => {
        document.body.querySelectorAll(`[${attrName}="${value}"]`).forEach(ele => {
          focusableElements = focusableElements.concat(getFocusableElements(ele));
        });
      });
    } else {
      focusableElements = currentFormEls;
    }
  },
  beforeUnmount(el) {
    el.removeEventListener('keydown', el.handleTab);
  },
});

function getFocusableElements(container) {
  return Array.from(container.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter(el => !el.disabled);
}
