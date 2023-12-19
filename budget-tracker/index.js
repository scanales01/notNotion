// add transaction form
const form = document.querySelector(".add");
// Statistics section numbers
const balanace = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

// Transaction history lists
const incomeList = document.querySelector("ul.income-list");
const expenseList = document.querySelector("ul.expense-list");

// get or initialize transactions local storage
let transactions = localStorage.getItem("transactions") !== null 
    ? JSON.parse(localStorage.getItem("transactions")) 
    : [];

// function for updating the values in the statistics section
const updateStatistics = () => {
    // get and total the positive values from transaction history
    const updatedIncome = transactions
                            .filter(transaction => transaction.amount > 0)
                            .reduce((total, transaction) => total += transaction.amount, 0);
    // get and total the negative values from transaction history
    const updatedExpense = transactions
                            .filter(transaction => transaction.amount < 0)
                            .reduce((total, transaction) => total += Math.abs(transaction.amount), 0);
    // set values
    income.textContent = updatedIncome;
    expense.textContent = updatedExpense;
    balanace.textContent = updatedIncome - updatedExpense;
}

// function for generating transaction history entries in proper format
const generateLiTemplate = (id, source, amount, time) => {
    return `<li data-id="${id}">
                <p>
                    <span>${source}</span>
                    <span id=time>${time}</span>
                </p>
                <span>$${Math.abs(amount)}</span>
                <i class="bi bi-trash delete"></i>
            </li>`;
}

// function for adding transaction entries to DOM
const addTransactionDOM = (id, source, amount, time) => {
    if (amount > 0) {
        incomeList.innerHTML += generateLiTemplate(id, source, amount, time);
    } else {
        expenseList.innerHTML += generateLiTemplate(id, source,amount, time);
    }
    updateStatistics();
}

// function for adding transaction entries to local storage
const addTransaction = (source, amount) => {
    const time = new Date();
    const transaction = {
        id: Math.floor(Math.random() * 100000),                                 // generate random transaction id
        source: source,
        amount: amount,
        time: `${time.toLocaleTimeString()} ${time.toLocaleDateString()}`      // set time
    };
    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    addTransactionDOM(transaction.id, source, amount, transaction.time);
}

// event listener for "Add Transaction" button
form.addEventListener("submit", event => {
    event.preventDefault();
    // check and alert for empty fields
    if (form.source.value.trim() === "" || form.amount.value === "") {
        return alert("There are missing fields!");
    }
    addTransaction(form.source.value.trim(), Number(form.amount.value));
    form.reset();
});

// function for fetching transaction history
const getTransaction = () => {
    // fetch transactions from local storage and add to corresponding list
    transactions.forEach(transaction => {
        if (transaction.amount > 0) {
            incomeList.innerHTML += generateLiTemplate(transaction.id, transaction.source, transaction.amount, transaction.time);
        } else {
            expenseList.innerHTML += generateLiTemplate(transaction.id, transaction.source, transaction.amount, transaction.time);
        }
    });
}

// function for removing transaction from transaction history in local storage
const deleteTransaction = id => {
    // filter transaction to remove from current transactions and set local storage to filtered list
    transactions = transactions.filter(transaction => transaction.id !== Number(id));
    localStorage.setItem("transactions", JSON.stringify(transactions));
    updateStatistics();
}

// event listener for trash icon on income transactions
incomeList.addEventListener("click", event => {
    if (event.target.classList.contains("delete")) {
        event.target.parentElement.remove();
        deleteTransaction(event.target.parentElement.dataset.id);
    }
});

// event listener for trash icon on expense transactions
expenseList.addEventListener("click", event => {
    if (event.target.classList.contains("delete")) {
        event.target.parentElement.remove();
        deleteTransaction(event.target.parentElement.dataset.id);
    }
});

// function for initialization; get statistics and transaction history on load
const init = () => {
    updateStatistics();
    getTransaction();
}

init();