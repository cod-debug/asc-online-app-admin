import { createApp, withDirectives } from "vue";
const app = createApp({});

app.directive('uppercase', {
    twoWay: true,
    bind(el, binding, vnode) {
        const changeValue = (e) => {
        var uppcaseValue = e?.target?.value?.toUpperCase() || null;
            vnode.componentInstance.$emit('input', uppcaseValue)
        }
        el.addEventListener('input', async function(e) {
            changeValue(e)
        });
    },
    unbind(el) {
        el.removeEventListener('input');
    },
    update(el, binding, vnode) {
        let value = vnode?.data?.model?.value || null;
        if (typeof value === 'string') {
            value = value.toUpperCase();
        }
        vnode.componentInstance.$emit('input', value)
    }
});