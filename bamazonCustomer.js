var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  // readProducts();
  runSearch();
});

// inital question function that helps navagate user through application
function runSearch(){
  inquirer
  .prompt({
    name: "select",
    type: "list",
    message: "What would you like to search for?",
    // allows users to have 3 differant ways to search for the product they are looking for
    choices: [
      "Search products by name",
      "Seach products by department",
      "See all products"
    ]
  })
  // based on the users choice on how search for thier product they will be routed to differant functions
  .then(function(answer) {
    switch (answer.select) {

      case "Search products by name":
      nameSearch();
      break;

      case "Seach products by department":
      departmentSearch();
      break;

      case "See all products":
      readProducts();
      break;
    }
  });
}

// makes sure that the user is only entering in positive number inputs
function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a whole number above zero';
	}
}

// allows the user to select a product from the list
function chooseProduct() {
  inquirer.prompt([
    {
      // this first input takes the id of the item the customer wishes to purchase
      type: "input",
      name: "id",
      message: "Please input the ID of the item you wish to purchase." + "\n",
      validate: validateInput,
      filter: Number
    },
    {
      //this second input takes in the number of the chosen item they wish to purchase
      type: "input",
      name: "quantity",
      message: "How many would you like to purchase?",
      validate: validateInput,
      filter: Number
    }
    // this function now takes the inputs and runs it through the system to check if item is in stock for the nuber of items asked for
  ]).then(function(input){

    // input item id number
    var item = input.id;

    // input item quantity number
    var quantity = input.quantity;

    // sql query string
    var query = "SELECT * FROM products WHERE ?";

    connection.query(query, {id: item}, function(err, res){

      // if the item id the user enters does not match any in system
      if(res.length === 0) {
        console.log('**ERROR: Invalid Item ID.** Please enter a valid ID.');

        // display all products and ids
        readProducts();

        // otherwise
      }else {

        // choice is the response from the id number entered
        var choice = res[0];

        // checks to see if there is enough in stock to fill order
        if(quantity <= choice.stock_quantity) {
          console.log("The item you requested is in stock." + "\n" + "Placing order now..");

          // sql query string
          var updateStock = "UPDATE products SET stock_quantity = " + (choice.stock_quantity - quantity) + " WHERE id = " + item;

          connection.query(updateStock, function(err, res){
            if(err) throw err;

            // Inform user that the order has gone through and what thier total is.
            console.log("Your order has been placed. Your total is $" + choice.price * quantity);
            console.log("Thank you for your purchase.")

            // ask the user to continue shopping or end the program
            inquirer
            .prompt({
              name: "select",
              type: "list",
              message: "Would you like to continue shopping?",
              choices: [
                "You better believe it!",
                "No thanks I'm all done.",
              ]
            })
            .then(function(answer) {
              switch (answer.select) {
          
                case "You better believe it!":
                runSearch();
                break;
          
                case "No thanks I'm all done.":
                // End the database connection
						    connection.end();
                break;
              }
            });
          })
          // if there is not enough of that item if stock it alerts the user and takes them to the full list of products avalible
        } else{
          readProducts();
          console.log("\nWe regret to inform you that there is not enough product in stock to fill that order.");
          console.log("Please change you order.");
          
        }
      }
    })
  })
}

// this function controls the logic for when a user is looking for a product by name
function nameSearch() {

  inquirer
  .prompt({
    name: "product_name",
    type: "input",
    message: "What product are you searching for?"
  })
  .then(function(answer){

    // sql query string
    query = "SELECT id, product_name, price FROM products WHERE ?";

    // allows users to see that they selected the right item
    console.log("You searched " + answer.product_name);

    connection.query(query, {product_name: answer.product_name}, function(err, res){
      // console.log(res);

      // displays the selected item
      for (var i = 0; i< res.length; i++){
        console.log(
          "\n| Item #: " + 
          res[i].id + "\n" + 
          "| Product Name: " + 
          res[i].product_name + "\n" + 
          "| Price: $" + 
          res[i].price) + "\n"
      }
      // pushes user to buying function
      chooseProduct();
    })
  })
}

// 
function departmentSearch() {

  inquirer
     .prompt({
       name: "department_search",
       type: "list",
       message: "What department are you looking for?",
       choices: [
         "General Goods",
         "Cleaning Supplies",
         "Sports Equipment"
       ]
     })
     .then(function(answer){
       // sql query string
      query = "SELECT id, product_name, price FROM products WHERE ?";
      connection.query(query, {department_name: answer.department_search}, function(err, res){
        // console.log(res);
        for (var i = 0; i< res.length; i++){
          console.log(
            "\n| Item #: " + 
            res[i].id + "\n" + 
            "| Product Name: " + 
            res[i].product_name + "\n" + 
            "| Price: $" + 
            res[i].price) + "\n"
        }
      }); 
      chooseProduct();
     })
}



function readProducts() {
     console.log("Selecting all products...\n");
     // sql query string
     query = connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      // console.log(res);
      for (var i = 0; i< res.length; i++){
        console.log(
          "\n| Item #: " + 
          res[i].id + "\n" + 
          "| Product Name: " + 
          res[i].product_name + "\n" + 
          "| Price: $" + 
          res[i].price) + "\n" 
      }
      // logs the actual query being run
      // console.log(query.sql);
      // connection.end();
      
    });
    chooseProduct();
  }