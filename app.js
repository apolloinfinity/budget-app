// Budget Controller
var budgetController = (function () {
    
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function (type, des, val) {
            var newItem; 

            // Create new ID
            if(data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);

            }
            
            // Push it into the data structure
            data.allItems[type].push(newItem);
            
            // Return the new element
            return newItem;
        },
        testing: function () {
            console.log(data);
        }
    };

})();


// UI Controller
var UIController = (function () {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            }
        },
        getDOMstrings: function () {
            return DOMstrings;
        }
    };

})();

// Global App Controller
var controller = (function (budgetCtrl, UICtrl) {

    var setUpEventListeners = function () {
        var DOM = UIController.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keycode === 13 || event.which == 13) {
                ctrlAddItem();
            }
        });
    }


    var ctrlAddItem = function () {
        var input, newItem;


        // 1. Gets the field input data.
        var input = UICtrl.getInput();

        // 2. Add the item to the budget controller.
        var newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        // 3. Add item to the UI

        // 4. Calculate Budget

        // 5. Display the budget in the UI

    };

    return {
        init: function () {
            console.log('App has started.');
            setUpEventListeners();
        }
    }


})(budgetController, UIController);

controller.init();
