<script>

let handleClick;

export default {
    name: 'outside',
    bind: function(el, binding) { // function(el, binding, vnode)
        if (typeof binding.arg == 'function') {
            handleClick = (event) => {
                if (!el.contains(event.target)) binding.arg(); 
            }
        }
        else handleClick = () => {console.log("argument isn't callback-function")}
        document.addEventListener('click', handleClick);
    },
    unbind: function() { //function(el, binding, vnode)
        document.removeEventListener('click', handleClick);
    }
}


</script>