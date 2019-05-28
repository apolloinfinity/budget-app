// Budget Controller
const budgetController = (function () {
    const Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    const Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    let allExpenses = [];
    let allIncomes = [];
    let totalExpenses = 0;

    let data = {
        allitems: {
            exp: [],
            inc: []
        },
        total: {
            exp: 0,
            inc: 0
        }
    }

    return {
        addItem: function (type, des, val) {
            let newItem;
            // Create new ID
            if (data.allitems[type].length > 0) {
                ID = data.allitems[type][data.allitems[type].length - 1].id + 1;

            } else {
                ID = 0;
            }

            // Create new item based on inc or exp
            if (type === 'exp') {
                newItem = new Expense(ID, des, val)
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val)
            }

            // Push info to data structure
            data.allitems[type].push(newItem);
            return newItem;
        },
        testing: function () {
            console.log(data)
        }
    }

})();

// UI Controller
const UIController = (function () {

    const DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: ".add__btn",
        incomeContainer: ".income__list",
        expensesContainer: ".expenses__list"
    }

    return {
        getinput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            }

        },
        addListItem: function (obj, type) {
            let html, element;
            // Create HTML string with placeholder text
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = `<div class="item clearfix" id="income-${obj.id}">
                <div class="item__description">${obj.description}</div>
                <div class="right clearfix">
                    <div class="item__value">${obj.value}</div>
                    <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
            </div>`;
                document.querySelector(element).insertAdjacentHTML('beforeend', html);

            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                html = `<div class="item clearfix" id="expense-${obj.id}">
                <div class="item__description">${obj.description}</div>
                <div class="right clearfix">
                    <div class="item__value">${obj.value}</div>
                    <div class="item__percentage">21%</div>
                    <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
            </div>`;
                document.querySelector(element).insertAdjacentHTML('beforeend', html);
            }
            // Replace the placeholder text with actal data
            // Used ES6 template literal for this part of the tut

        },
        clearFields: function () {
            let fields, fieldsArray;

            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue)

            fieldsArray = Array.prototype.slice.call(fields);

            fieldsArray.forEach((current) => {
                current.value = "";
            })
        },
        getDOMstrings: function () { return DOMstrings }
    }
})();

// Global App Controller
const controller = (function (budgetCtrl, UICtrl) {


    const setUpEventListeners = function () {
        const DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        })
    }


    const ctrlAddItem = function () {
        var input, newItem;
        // 1. Get the field input
        input = UIController.getinput();

        // 2. Add the item t the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        // 3. Add the item to the UI
        UICtrl.addListItem(newItem, input.type);

        // Clear the fields
        UICtrl.clearFields();
        // 5. Calculate the budget

        // 6. Display the budget on the UI.

        console.log('It works')
    }

    return {
        init: function () {
            console.log('Application has started');
            setUpEventListeners();
        }
    }


})(budgetController, UIController);

controller.init();