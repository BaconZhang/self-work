<template>
    <div>
        <div v-if="resolved">
            <slot name="resolved" :value="value"></slot>
        </div>
        <div v-else-if="rejected">
            <slot name="rejected" :error="error"></slot>
        </div>
        <div v-else>
            <slot></slot>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        promise: {
            validator: p => p && typeof p.then === 'function' && typeof p.catch === 'function'
        }
    },
    data: () => ({
        resolved: false,
        rejected: false,
        value: null,
        error: null
    }),
    watch: {
        promise: {
            handler(promise) {
                this.reset();
                promise.then(data => {
                    this.resolved = true;
                    this.value = data;
                }).catch(err => {
                    this.error = err;
                    this.rejected = true;
                });
            },
            immediate: true
        }
    },
    methods: {
        reset() {
                this.resolved = false;
                this.rejected = false;
                this.value = null;
                this.error = null;
        }
    }
}
</script>