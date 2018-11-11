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

// inital connection function
connection.connect(function(err) {
  if (err) throw err;

  console.log("connected as id " + connection.threadId + "\n");

  // calls manager browser function
  selectGroup();
});

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

// validateNumeric makes sure that the user is supplying only positive numbers for their inputs
function validateNumeric(value) {
	// Value must be a positive number
	var number = (typeof parseFloat(value)) === 'number';
	var positive = parseFloat(value) > 0;

	if (number && positive) {
		return true;
	} else {
		return 'Please enter a positive number for the unit price.'
	}
}

// inital question function that helps navagate user through application
function selectGroup(){
    inquirer
    .prompt({
      name: "select",
      type: "list",
      message: "What do you wish to do?",
      // allows users to have 3 differant ways to search for the product they are looking for
      choices: [
        "Add new product to inventory",
        "Add stock to current products",
        "See all products with low inventory",
        "See all product data"
      ]
    })
    // based on the users choice on how search for thier product they will be routed to differant functions
    .then(function(answer) {
      switch (answer.select) {
  
        case "Add new product to inventory":
        addProduct();
        break;

        case "Add stock to current products":
        addInventory();
        break;
  
        case "See all products with low inventory":
        lowCount();
        break;
  
        case "See all product data":
        readProducts();
        break;
      }
    });
}

// asks user if they want to continue in managing the store or if they want to quit
function keepGoing(){
    inquirer
    .prompt({
      name: "select",
      type: "list",
      message: "Would you like to continue working on store info?",
      choices: [
        "Yes, I still have more work to do.",
        "No thanks I'm all done.",
      ]
    })
    .then(function(answer) {
      switch (answer.select) {
  
        case "Yes, I still have more work to do.":
        selectGroup();
        break;
  
        case "No thanks I'm all done.":
        // End the database connection
                    connection.end();
        break;
      }
    });
}

// allows the manager to add products to the inventory
function addProduct(){

    inquirer.prompt([
        {
            type: "input",
            name: "product_name",
            message: "Please enter the name of new product."
        },
        {
            type: "list",
            name: "department_name",
            message: "Please enter the department of new product.",
            choices: [
                "Cleaning Supplies",
                "General Goods",
                "Sports Equipment"
            ]
        },
        {
            type: "input",
            name: "price",
            message: "Please enter the price of new product.",
            validate: validateNumeric
        },
        {
            type: "input",
            name: "stock_quantity",
            message: "Please enter the number of new product that is in stock.",
            validate: validateInput
        }
    ]).then(function(input){

        // informs user if all product info that they just input
        console.log("Adding new product to inventory: \n" +
        "product_name = " + input.product_name + "\n" +
        "department_name = " + input.department_name + "\n" +
        "price = " + input.price + "\n" +
        "stock_quantity = " + input.stock_quantity);

        // sql query string
        var query = "INSERT INTO products SET ?";

        connection.query(query, input, function(err, res){
            if(err) throw err;

            console.log('New product has been added to the inventory under Item ID ' + res.insertId + '.');
			console.log("\n---------------------------------------------------------------------\n");

			// End the database connection
            // connection.end();

            // call the continue or quit function
            keepGoing();
       
        })
    })
}

// allows the user to add stock to the current inventory
function addInventory(){

    // take info of what product the user wishes add to  and how much they are adding 
    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "Enter the id number of the item you wish to update.",
            validate: validateInput,
            filter: Number
        },
        {
            type: "input",
            name: "quantity",
            message: "How much came in on the truck?",
            validate: validateInput,
            filter: Number
        }
        // takes the user inputs and uses them to change the table through sql querys
    ]).then(function(input){

        // input item id number
        var item = input.id;

        // input item quantity number
        var addStock = input.quantity;

        // sql query string
        query = "SELECT * FROM products WHERE ?";

        // connector query
        connection.query(query, {id: item}, function(err, res){
            if(err) throw err;

            // if the id is left blank or does not match with any items on the table
            if(res.length === 0) {
                console.log("**ERROR** Invalid item id! Please enter a valid item id.");
                addInventory();

            }else{

                // save the base response as a object to save time
                var choice = res[0];
                
                // sql query string
                var update = "UPDATE products SET stock_quantity = " + (choice.stock_quantity + addStock) + " WHERE ?";

                //console.log(update) //tester

                //connector query
                connection.query(update, {id: item}, function(err, res){
                    if (err) throw err;
                    // console.log(res)
					console.log('Stock count for Item ID ' + item + ' has been updated to ' + (choice.stock_quantity + addStock) + '.');
					console.log("\n---------------------------------------------------------------------\n");

					// End the database connection
                    // connection.end();

                    // calls the continue or quit function
                    keepGoing();
            })
            }
        })
    })
}

// controls the low inventory alerts
function lowCount() {

    // sql query string
    query = "SELECT * FROM products WHERE stock_quantity < 5";

    // connector query
    connection.query(query, function(err, res){
        if(err) throw err;


        // tells the manager all the items listed under the table.
        // if there is none there is just this header and nothing else displayed
        console.log("\nAll items with current low inventory.");
        console.log("-----------------------------------------");

        // emty string var so you can put info into it
        var shortList = "";

        // builds table info for low count items
        for (var i =0; i < res.length; i++) {
            shortList = "";
            shortList += "ID: " + res[i].id + " | ";
            shortList += "Product Name: " + res[i].product_name + " | ";
            shortList += "Department: " + res[i].department_name + " | ";
            shortList += "Price: " + res[i].price + " | ";
            shortList += "Number in stock: " + res[i].stock_quantity + " | ";

            console.log(shortList);
        }
    })
    // calls continue or quit function
    keepGoing();
}

// reads all product info to user 
function readProducts() {

    // informs user that the system is working an displaying info
    console.log("Selecting all product info...\n");

    // sql query string
    query = connection.query("SELECT * FROM products", function(err, res) {
     if (err) throw err;

     // Log all results of the SELECT statement
     // console.log(res);

     // displays the information in a clean organized manner 
     for (var i = 0; i< res.length; i++){
       console.log(
         "\n| Item #: " + 
         res[i].id + "\n" + 
         "| Product Name: " + 
         res[i].product_name + "\n" + 
         "| Department: " + 
         res[i].department_name + "\n" +
         "| Price: $" + 
         res[i].price + "\n" +
         "| Amount in stock: " + 
         res[i].stock_quantity)
     }
     // logs the actual query being run
     // console.log(query.sql);
    //  connection.end();
     
   });
   // calls continue or quit function
   keepGoing();
 }