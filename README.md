# SQL-store-app

## What it is

It is a basic online store app. 

It has a client side interface for customers and managers.

It changes the table of info according to what each user does on thier side.

## Customer Side Experiance and Capabilities

### When you first enter the customer side interface you will see a screen that looks like this.
This is where the user will select the way they want to search for the product that they are looking for.

![Alt text](https://github.com/Foscat/SQL-store-app/blob/master/croped_sized%20store/cust-start-name.png)

#### Search by name
If the user already knows thw name of the product they are searching for they can enter its name here 
at the input prompt

![Alt text](https://github.com/Foscat/SQL-store-app/blob/master/croped_sized%20store/cust-itemName.png)

Once the user has submitted the name of the product they want they will be prompted with this screen.

![Alt text](https://github.com/Foscat/SQL-store-app/blob/master/croped_sized%20store/cust-itemName-info.png)

From here the user will input the id number of the item they want to purchase.
The givin a similar prompt to enter the number if that item they wish to purchase.
Once the user has done this they will be given a total price of thier purchase.

At the end of the cycle the usere is prompted again if they want to continue shopping or quit

![Alt text](https://github.com/Foscat/SQL-store-app/blob/master/croped_sized%20store/cust-itemName-pri%2Bcon.png)

### Search by department
If the user is looking for a certain type of item they can check by department what they are looking for.

![Alt text](https://github.com/Foscat/SQL-store-app/blob/master/croped_sized%20store/cust-deptSearch.png)

Once the user has entered the department selector they will be given a list of all depeartments in the store

![Alt text](https://github.com/Foscat/SQL-store-app/blob/master/croped_sized%20store/cust-deptSearch-option.png)

Once the user selects a department all item that are classified under that department will be listed

![Alt text](https://github.com/Foscat/SQL-store-app/blob/master/croped_sized%20store/cust-deptSearch-option-info.png)

The user then goes through the same purchaseing prompt asking for id then quantity. 
Once that info has been entered the user is given thier total and again prompted to keep shopping or quit

![Alt text](https://github.com/Foscat/SQL-store-app/blob/master/croped_sized%20store/cust-deptSearch-option-total.png)

### See all products
If the user just wishes to view all products and shop from there they will be given a list of every item in the store.
The list is ordered by item number

![Alt text](https://github.com/Foscat/SQL-store-app/blob/master/croped_sized%20store/cust-listAll.png)

The user will enter the same purchasing prompt asking for id number and quantity, giving total once complete.

![Alt text](https://github.com/Foscat/SQL-store-app/blob/master/croped_sized%20store/cust-listAll-total.png)

## Manager Side Experiance and Capabilities

### When you first enter the manager side interface you will see a screen that looks like this.
This is where the manager will choose how to interact with the store inventory usung this legend

![Alt text](https://github.com/Foscat/SQL-store-app/blob/master/croped_sized%20store/mang-list.png)

###  Add new product to inventory
When the manager need to add a new product to the store they will select this option

They will be prompted to input the name of the product

![Alt text](https://github.com/Foscat/SQL-store-app/blob/master/croped_sized%20store/mang-newProd-mkName.png)

Once they have done that then they will be given a list of the stores departments the item should be classified in

![Alt text](https://github.com/Foscat/SQL-store-app/blob/master/croped_sized%20store/mang-newProd-selDept.png)

Then they will enter the price and quantity into the input prompts.
Once that is completed the new item will be added to the store inventory.
Its gives you a printout of what was added then gives the user another prompt to continue working or quit

![Alt text](https://github.com/Foscat/SQL-store-app/blob/master/croped_sized%20store/mang-newProd-comNewProd.png)

### Add stock to current products
This option allows the manager to add stock to currently exsisting inventory items

![Alt text](https://github.com/Foscat/SQL-store-app/blob/master/croped_sized%20store/mang-list-addStock.png)

The manager will be prompted for item id and quantity much like the customer purchase prompt

![Alt text](https://github.com/Foscat/SQL-store-app/blob/master/croped_sized%20store/mang-addStock-toID.png)

Once the manager has filled out the information correctly they will be givin a message that the inventory is updated
They again will be prompted keep working or quit

### See all products with low inventory
Here the manager can see a quick referance of all items in the store with a low inventory.

![Alt text](https://github.com/Foscat/SQL-store-app/blob/master/croped_sized%20store/mang-list-lowInv.png)

In this case it will list any that have a stock quantity below 5

![Alt text](https://github.com/Foscat/SQL-store-app/blob/master/croped_sized%20store/mang-lowInt-list.png)

Again the manager will be prompted to conitnue working or quit

### See all product data
If the manager wants a overview of all products and the data attached to them they can see it by this selection

![Alt text](https://github.com/Foscat/SQL-store-app/blob/master/croped_sized%20store/mang-listAll.png)

![Alt text](https://github.com/Foscat/SQL-store-app/blob/master/croped_sized%20store/mang-listAll2.png)

The manager will be prpmted to continue working or quit at end of list

## Tech used

*Node 
* MySQL npm 
* Inquirer npm
