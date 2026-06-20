#!/usr/bin/env node
//This project's questions , constraints and example are given at https://www.roadmap.sh/projects/expense-tracker , one feature is not given in this
//version of the CLI (Command Line Interface app) and MAY come in future versions , if there would be.

//Inspiration has been taken from this GitHub repo: https://github.com/ACJT123/Expenses-Tracker
const {program} = require("commander");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "database.json");

// Set up commander program
program
    .name("expense-tracker")
    .description("A simple CLI - based app with expense tracking functions and an JSON Database")
    .version("1.0")


//add getExpense function
const getExpense = () => {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

//add saveExpense function
const saveExpense = (expense) => {
    fs.writeFileSync(filePath, JSON.stringify(expense, null, 2), 'utf-8');
}

//add addExpense function

const addExpense = (description, amount) => {
    let expenses = getExpense();
    const newExpenses = {
        id: expenses.length + 1,
        date: new Date().toLocaleDateString(),
        description,
        amount: Number(amount)
    }

    expenses.push(newExpenses);
    saveExpense(expenses);
    console.log(`Expense added successfully with id : ${newExpenses.id}`);
}
//Set up commander commands

//add summary function (returns the total expense of the database i.e. all the expenses)
const summary = () => {
    let totalExpense = 0;
    let expenses = getExpense();
    for (let i =0 ; i < expenses.length; i++) {
        totalExpense += expenses[i].amount;
    }

    return totalExpense;
}

//add list function (returns all the expenses recorded in the database with their details)
const list = () => {
    let expenses = getExpense();
    console.log("ID    Date    Description    Amount");
    for (let i =0 ; i < expenses.length; i++) {
        console.log(`${expenses[i].id}    ${expenses[i].date}    ${expenses[i].description}    ${expenses[i].amount}`);
    }
}
//add deleteExpense function (deletes the expense by id)
const deleteExpense = (id) => {
    let expenses = getExpense();
    const filteredExpenses = expenses.filter((expense) => expense.id !== id);

    if (filteredExpenses.length === expenses.length) {
        console.log(`Expense with ID ${id} not found.`);
        return;
    }

    saveExpense(filteredExpenses);
    console.log(`Expense with ID ${id} deleted successfully.`);
};

program
    .command("add")
    .description("Add expense in tracker database")
    .option("-d, --description <string>", "description")
    .option("-a, --amount <number>", "amount")
    .action((options) => {
        addExpense(options.description, options.amount);
    })

program
    .command("summary")
    .description("Returns the total amount spent of all expenses combined")
    .action(() => {
        console.log(`$${summary()}`);
    })
program
    .command("list")
    .description("Lists all of the expenses recorded")
    .action(() => {
        list();
    })

program
    .command("delete")
    .description("Deletes the expense according to the id given")
    .option("-i, --id <number>", "id")
    .action((options) => {
        deleteExpense(Number(options.id));
        console.log("The updated list of expenses is this :- ")
        list();
    })
program.parse(process.argv);