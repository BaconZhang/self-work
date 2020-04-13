<template>
    <div class="__virtual-scroll-container">
        <div class="__virtual-scroll-item" v-bind:data-index="index" v-for="(item, index) in list" :key="item">
            <slot :item="item" />
        </div>
    </div>
</template>

<script>
const cache = new Map();
const observer = new IntersectionObserver(
    function(changes) {
        changes.forEach(change => {
            if (change.intersectionRatio <= 0) {
                const index = change.target.attributes.getNamedItem("data-index").value;
                if (change.target && change.target.innerHTML) {
                    const height = change.target.clientHeight;
                    cache.set(index, change.target.innerHTML);
                    change.target.innerHTML = "";
                    change.target.style.height = `${height}px`;
                }
            } else {
                if (change.target && !change.target.innerHTML) {
                    const index = change.target.attributes.getNamedItem("data-index").value;
                    change.target.innerHTML = cache.get(index);
                }  
            }
        })
    }
);
export default {
    props: {
        list: Array
    },
    watch: {
        list(list){
            cache.clear();
            this.$nextTick(() => {
                const items = document.querySelectorAll(".__virtual-scroll-item");
                for (const child of items) {
                    observer.observe(child);
                }
            });
            
        }
    }
}
</script>