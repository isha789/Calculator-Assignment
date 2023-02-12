
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousValueElement = document.querySelector('[data-previous-operand]')
const currentValueElement = document.querySelector('[data-current-operand]')

class Calculator {
  constructor(previousValueElement, currentValueElement) {
    this.previousValueElement = previousValueElement
    this.currentValueElement = currentValueElement
    this.clear()
  }

  clear() {
    this.currentValue = ''
    this.previousValue = ''
    this.operation = undefined
  }

  delete() {
    this.currentValue = this.currentValue.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentValue.includes('.')) return
    this.currentValue = this.currentValue.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentValue === '') return
    if (this.previousValue !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousValue = this.currentValue
    this.currentValue = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousValue)
    const current = parseFloat(this.currentValue)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentValue = computation
    this.operation = undefined
    this.previousValue = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentValueElement.innerText =
      this.getDisplayNumber(this.currentValue)
    if (this.operation != null) {
      this.previousValueElement.innerText =
        `${this.getDisplayNumber(this.previousValue)} ${this.operation}`
    } else {
      this.previousValueElement.innerText = ''
    }
  }
}



const calculator = new Calculator(previousValueElement, currentValueElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})