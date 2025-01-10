const calculator = document.querySelector('.calculator_container')
const keys = document.querySelector('.number_input')
const display = document.querySelector('.number_output')

const calculate = (n1, operator, n2) => {
    let result = ''

    if (operator === 'add'){
        result = parseFloat (n1) + parseFloat (n2)
    }
    else if (operator === 'subtract'){
        result = parseFloat (n1) - parseFloat (n2)
    }
    else if (operator === 'multiply'){
        result = parseFloat (n1) * parseFloat (n2)
    }
    else if (operator === 'divide'){
        result = parseFloat (n1) / parseFloat (n2)
    }
    return result
}

keys.addEventListener('click', e => {
    if (e.target.matches('button')){
        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayedNum = display.textContent
        const previousKeyType = calculator.dataset.previousKeyType

        Array.from(key.parentNode.children)
      .forEach(k => k.classList.remove('is-depressed'))

        if (!action){
            if (displayedNum === '0' || previousKeyType === 'operator') {
                display.textContent = keyContent
            } else {
                display.textContent = displayedNum + keyContent
            }
            calculator.dataset.previousKeyType = 'number'
        }


        if (action === 'decimal'){
            if (!displayedNum.includes('.')){
                display.textContent = displayedNum + '.'
            } else if (previousKeyType === 'operator'){
                display.textContent = '0.'
            }
            calculator.dataset.previousKeyType = 'decimal'
        }

        if (action === 'clear'){
            console.log('clear key')
            calculator.dataset.previousKeyType = 'clear'
        }

        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            key.classList.add('is-depressed')
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.firstValue = displayedNum
            calculator.dataset.operator = action
        }
        if (action === 'calculate') {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum

            display.textContent = calculate(firstValue, operator, secondValue)
            calculator.dataset.previousKeyType = 'calculate'
        }
    }
})