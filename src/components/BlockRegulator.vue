<template>
    <div class="regulator">
        <div class="rangers">
            <div v-for="(range, idx) in value" :key="idx" class="ranger">
                <span class="counter">{{ range }}</span>
                <input
                    :value="+range" 
                    @input="rangeInput($event.target.value, idx)"
                    min="0"
                    max="9"
                    type="range">
            </div>
        </div>
        <div class="add-remove">
            <button @click="input(value + '0')">
                +
            </button>
            <button @click="input(value.substr(0, value.length - 1))">
                -
            </button>
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
            this.input(newRange.join(''))
        },
        input (newVal) {
            this.$emit('input', newVal)
        }
    }
}
</script>

<style lang="scss" scoped>
.regulator {
    display: grid;
    grid-gap: 10px;
    grid-auto-flow: column;
    grid-template-columns: 1fr 50px;
}
.rangers {
    overflow-x: auto;
    overflow-y: hidden;
    display: grid;
    grid-auto-flow: column;
}
.ranger {
    padding-top: 30px;
    & > input {
        transform: rotate(-90deg);
        width: 80px;
        @media screen and (max-width: 768px) {
            width: 40px;
        }
    }
}
</style>
