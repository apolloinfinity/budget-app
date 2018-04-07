// Budget Controller
var budgetController = (function() {
  

})();

// UI Controller
var UIController = (function() {


})();

// Global App Controller
var controller = (function(budgetCtrl, UICtrl) {

    var ctrlAddItem = function(){
        console.log('It works');
    }

    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event){
        if(event.keycode === 13 || event.which == 13) {
            ctrlAddItem();
        }
    });

})(budgetController, UIController);




