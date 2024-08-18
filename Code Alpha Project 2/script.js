let isRadians = false;
let isInverse = false;
let isAdvancedVisible = false;
let history = [];

function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculate() {
    try {
        const expression = document.getElementById('display').value;
        const result = eval(expression);
        document.getElementById('display').value = result;
        addToHistory(expression, result);
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}

function backspace() {
    let currentValue = document.getElementById('display').value;
    document.getElementById('display').value = currentValue.slice(0, -1);
}

function square() {
    try {
        const value = eval(document.getElementById('display').value);
        document.getElementById('display').value = Math.pow(value, 2);
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}

function squareRoot() {
    try {
        const value = eval(document.getElementById('display').value);
        document.getElementById('display').value = Math.sqrt(value);
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}

function power() {
    appendToDisplay('^');
}

function factorial() {
    try {
        const value = parseInt(document.getElementById('display').value);
        let result = 1;
        for (let i = 2; i <= value; i++) {
            result *= i;
        }
        document.getElementById('display').value = result;
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}

function toggleAngleMode() {
    isRadians = !isRadians;
    document.getElementById('angleMode').textContent = isRadians ? 'RAD' : 'DEG';
}

function toRadians(angle) {
    return isRadians ? angle : angle * (Math.PI / 180);
}

function toDegrees(angle) {
    return isRadians ? angle : angle * (180 / Math.PI);
}

function sin() {
    try {
        const value = eval(document.getElementById('display').value);
        const result = isInverse ? toDegrees(Math.asin(value)) : Math.sin(toRadians(value));
        document.getElementById('display').value = result;
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}

function cos() {
    try {
        const value = eval(document.getElementById('display').value);
        const result = isInverse ? toDegrees(Math.acos(value)) : Math.cos(toRadians(value));
        document.getElementById('display').value = result;
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}

function tan() {
    try {
        const value = eval(document.getElementById('display').value);
        const result = isInverse ? toDegrees(Math.atan(value)) : Math.tan(toRadians(value));
        document.getElementById('display').value = result;
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}

function exp() {
    try {
        const value = eval(document.getElementById('display').value);
        document.getElementById('display').value = Math.exp(value);
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}

function ln() {
    try {
        const value = eval(document.getElementById('display').value);
        document.getElementById('display').value = Math.log(value);
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}

function log() {
    try {
        const value = eval(document.getElementById('display').value);
        document.getElementById('display').value = Math.log10(value);
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}

function inverse() {
    isInverse = !isInverse;
    document.getElementById('inverseBtn').classList.toggle('active');
}

function appendConstant(constant) {
    if (constant === 'pi') {
        document.getElementById('display').value += Math.PI;
    } else if (constant === 'e') {
        document.getElementById('display').value += Math.E;
    }
}

function toggleAdvancedFunctions() {
    isAdvancedVisible = !isAdvancedVisible;
    const advancedFunctions = document.getElementById('advancedFunctions');
    const toggleButton = document.getElementById('toggleAdvanced');
    
    if (isAdvancedVisible) {
        advancedFunctions.classList.remove('hidden');
        toggleButton.textContent = 'Hide Advanced';
    } else {
        advancedFunctions.classList.add('hidden');
        toggleButton.textContent = 'Show Advanced';
    }
}

function addToHistory(expression, result) {
    history.push({ expression, result });
    updateHistoryDisplay();
    saveHistoryToLocalStorage();
}

function updateHistoryDisplay() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    for (let i = history.length - 1; i >= 0; i--) {
        const item = history[i];
        const li = document.createElement('li');
        li.textContent = `${item.expression} = ${item.result}`;
        li.onclick = function() {
            document.getElementById('display').value = item.result;
        };
        historyList.appendChild(li);
    }
}

function clearHistory() {
    history = [];
    updateHistoryDisplay();
    saveHistoryToLocalStorage();
}

function saveHistoryToLocalStorage() {
    localStorage.setItem('calculatorHistory', JSON.stringify(history));
}

function loadHistoryFromLocalStorage() {
    const savedHistory = localStorage.getItem('calculatorHistory');
    if (savedHistory) {
        history = JSON.parse(savedHistory);
        updateHistoryDisplay();
    }
}

// Call this function when the page loads
window.onload = function() {
    loadHistoryFromLocalStorage();
};