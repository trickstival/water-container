<template>
    <div class="container-gui">
        <div class="toolbar">
            There are {{ waterBlocksCount }} water blocks
            <block-regulator :value="value" @input="$emit('input', $event)" />
        </div>
        <div class="water-container">
            <div v-for="column in blocksStructure" class="column">
                <div v-for="(block, idx) in column"
                    :key="idx"
                    :class="{ 
                        water: block === $options.BLOCK_TYPES.WATER,
                        box: block === $options.BLOCK_TYPES.BOX,
                        empty: block === $options.BLOCK_TYPES.EMPTY
                    }"
                    class="block">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BlockRegulator from './BlockRegulator'
import { BLOCK_TYPES, createEmptyField, setupBoxesInColumn, flood } from '@/utils/waterContainerStructurer'

export default {
    components: {
        BlockRegulator
    },
    props: {
        value: {
            type: String,
            default: '0101'
        }
    },
    BLOCK_TYPES,
    computed: {
        blocksStructure () {
            const numericArray = [...this.value].map(char => +char)
            return flood(
                    createEmptyField(numericArray)
                        .map((col, idx) => setupBoxesInColumn(col, numericArray[idx]))
                )
        },
        waterBlocksCount () {
            return this.blocksStructure
                .flat()
                .filter(block => block === BLOCK_TYPES.WATER)
                .length
        }
    }
}

</script>

<style lang="scss" scoped>
.container-gui {
    display: grid;
    grid-template-rows: 110px 1fr;
}
.water-container {
    background-color: grey;
    border: 1px solid black;
    display: grid;
    grid-auto-flow: column;
}
.toolbar {
    display: grid;
    grid-auto-flow: column;
}
.column {
    display: flex;
    height: 100%;
    flex-direction: column-reverse;
}
.block {
    background-color: grey;
    border: 1px solid transparent;
    height: 11.1%;
}
.water {
    background-color: blue;
    border-color: blue;
}
.empty {
    border-color: grey;
}
.box {
    background-color: brown;
    border-color: black;
}
</style>
