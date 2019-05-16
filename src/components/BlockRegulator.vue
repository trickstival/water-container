<template>
    <div class="regulator">
        <div v-for="(range, idx) in value" class="ranger">
            <input
                :value="+range" 
                @input="rangeInput($event.target.value, idx)"
                min="0"
                max="9"
                type="range" 
                class="ranger">
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    methods: {
        rangeInput (range, idx) {
            let newRange = this.value.split('')
            newRange[idx] = range
            this.$emit('input', newRange.join(''))
        }
    }
}
</script>

<style lang="scss" scoped>
.regulator {
    padding-top: 40px;
    display: grid;
    grid-auto-flow: column;
}
.ranger {
    & > input {
        transform: rotate(-90deg);
        width: 80px;
    }
    width: 0;
}
</style>
