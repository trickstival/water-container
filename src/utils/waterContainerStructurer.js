export const BLOCK_TYPES = {
    EMPTY: 0,
    BOX: 1,
    WATER: 2
}

// First step: create empty field to fill with water and boxes on next steps
export function createEmptyField (numericArray) {
    const bigger = (num1, num2) => ((num1 > num2) ? num1 : num2)
    const greatestColumn = numericArray.reduce(bigger, 0)

    const getNewRow = () => Array(greatestColumn).fill(BLOCK_TYPES.EMPTY)

    return Array(numericArray.length)
        .fill(0)
        .map(getNewRow)
}

// Second step: after getting a brand new empty field, let1s fill it with the blocks descriped by the data structure
export function setupBoxesInColumn (emptyColumn, numberOfBoxes) {
    return emptyColumn.fill(BLOCK_TYPES.BOX, 0, numberOfBoxes)
}

const { WATER, BOX } = BLOCK_TYPES

// Third step: create water blocks where it can't leak
export function flood (field) {
    const getSideColumns = columnIndex => [
        field[columnIndex - 1],
        field[columnIndex + 1]
    ]

    const isMarginColumn = columnIndex => {
        const [leftColumn, rightColumn] = getSideColumns(columnIndex)
        return !leftColumn || !rightColumn
    }

    // Rain
    field.forEach((column, columnIndex) =>
        column.forEach((block, rowIndex) => {
            // Water can't take a box place
            if (block === BOX) {
                return
            }

            // Can't have water on the field limits
            if (isMarginColumn(columnIndex)) {
                return
            }

            const currentRow = field.map(col => col[rowIndex])
            
            const rightRetainingBlock = currentRow.find((block, blockIdx) => block === BOX && blockIdx > columnIndex)
            const leftRetainingBlock = currentRow.find((block, blockIdx) => block === BOX && blockIdx < columnIndex)

            // Water leaks
            if (!rightRetainingBlock || !leftRetainingBlock) {
                return
            }
            
            // All conditions passed, it's a water block
            column[rowIndex] = WATER
        })
    )
    return field
}
