// For keyboard input
const readline = require('readline-sync');

// -----------------------------------------------
// Clear the screen
// -----------------------------------------------
function clearScreeen()
{
	// Clear the screen
	console.log('\033[2J');
}


// ------------------------------------------------
// The constructor for the Account class
// @param acctName - the account name
// @param acctBalance - the amount
// @param type - the type of account
// ------------------------------------------------
function Account(acctName, acctBalance, type)
{
	// The account name
	this.acctName = acctName;
	
	// The account amount
	this.acctBalance = acctBalance;
		
	// The 1 percent interest rate - because our bank is the best!	
	this.interestRate = 1;

	// The account type
	this.type = type;
	
	// Returns the account name
	this.getAcctName = function() { return this.acctName; }
	
	// Returns the account balance
	this.getBalance = function() { return this.acctBalance; }
	
	// Returns the account type
	this.getAccountType = function() { return this.type; }
	
	// Deposits money to the account
	// @param amount - the amount to deposit
	this.deposit = function(amount) 		//ADDED IF FOR ANY NON VALID ENTRY *******************
	{ 
		this.acctBalance  = parseInt(this.acctBalance) +  parseInt(amount); // use parseInt() so that the ints don't get concatentated. ************
	}
	
	// Withdraws money from the account
	// @param amount - the amount to withdraw
	this.withdraw = function(amount)
	{ 
		this.acctBalance = parseInt(this.acctBalance) - parseInt(amount); 
	}
	
	// Prints the account information
	this.printAcct = function()
	{
		console.log("Account name: ", this.getAcctName());
		console.log("Account type: ", this.getAccountType());
		console.log("Account balance: ", this.getBalance(), "\n");
	}

}

// ------------------------------------------------
// The constructor for the customer class
// @param userName - the user name
// @param userPassword - the user password
// ------------------------------------------------
function Customer(userName, userPassword)
{
	// Save the user name and password
	this.userName = userName;
	this.userPassword = userPassword;
	
	// Returns the username
	this.getUserName = function() { return this.userName; }
	
	// Returns the password
	this.getPassword = function() { return this.userPassword; }
	
	// Returns the accounts
	this.getAccounts = function() { return this.accounts; }
	
	// Add account
	// @param account - the account
	this.addAccount = function(account) { this.accounts.push(account); }

	// Remove account **********
	// Removes an account based on the account index
	this.removeAccount = function(rAcct) 
	{ 
		for (let i = this.accounts.length - 1; i >= 0; i--)
		{
			if (this.accounts[i] == this.accounts[rAcct-1])
			{
				this.accounts.splice(i, 1);
				break;
			}
		}
	}
	
	// Returns the account based on the account index
	// @param acctIndex - the account index
	// @return - the account based on the index	
	this.getAccount = function(acctIndex) { return this.accounts[acctIndex]; }
		
	// The list of accounts	
	this.accounts = []	
	
}

// ----------------------------------------------
// The constructor of the Bank class
// @param name - the name of the bank 
// @param initCustomerList - the initial customer list
// ----------------------------------------------
function Bank(name, initCustomerList)
{
	// Save the bank name
	this.name = name;

	// The object that acts like a map representing the bank customers.
	// The key is the customer user name. The value is the Customer object
	// containing the customer information
	this.customers = {};
	
	// The welcome banner ad!
		console.log("Welcome to ", name, "!\n");

	let i = 0;		//initialized i *********************
		
	// Initialize the customer map
	while(i < initCustomerList.length)
	{
		// Get the customer
		customer = initCustomerList[i];

		this.customers[customer.getUserName()] = customer;
		
		// Next user!	
		i += 1;	
	}
	
	// -------------------------------------------------------------
	// Creates a new user with the specified user name and password.
	// Returns a user object specifying the new user
	// @param userName - the name of the user
	// @param userPassword - the user password
	// The newly created user.
	// -------------------------------------------------------------
	this.createAndAddCustomer = function(userName, userPassword)
	{
		// Create a new customer
		let customer = new Customer(userName, userPassword);	
		
		// Save the customer
		this.customers[customer.getUserName()] = customer;

		console.log("Created account for ", userName);
	}
	
	// ----------------------------------------------
	// Allows the user to enroll in the bank (the UI)
	// ----------------------------------------------
	this.createCustomerUI = function()
	{
		do
		{
			// Create user name
			var userName = readline.question("Please pick a user name: ");
		
			// Pick the password 
			var userPassword = readline.question("Please pick a user password: ");	
			
			//Variable to test if there is an existing user with the same user name
			var match = false;
			
			// Is this a registered user?
			if(userName in this.customers)
			{
				match = true;
			}
			
			//Error statement for having the same user name as an exisiting user.
			while (match == true)
			{
				console.log("There is an existing user name. Please pick a different user name and user password.");
				this.createCustomerUI(userName, userPassword);
				if (userName in this.customers == false)
				{
					match = false;
				}
			}
		} while (match == true);
				
				
		// Create and add user
		this.createAndAddCustomer(userName, userPassword);
		
		//shows the menu again if they want to do something else
		this.masterChoice(userName, userPassword);
		
	}

	// -----------------------------------------------
	// The user action selection menu
	// @param customer - the customer 
	// -----------------------------------------------
	this.userActionMenuUI = function(customer)
	{
		do
		{
			// Get the user input and create a customer object
			console.log("-----------------------------------------------");
			console.log("1. Deposit");
			console.log("2. Withdraw");
			console.log("3. Transfer");
			console.log("4. View Accounts");
			console.log("5. Open New Account");
			console.log("6. Remove Account");
			console.log("7. Logout");
			console.log("-----------------------------------------------\n\n");

			// Accept input
			var choice = readline.question("Choice: ");
			
			// Decide what to do
			
			// Deposit	
			if(choice === "1")
			{
				console.log("Deposit");
				this.depositUI(customer);
			}
			// Withdraw
			else if(choice === "2")
			{
				console.log("Withdraw");
				this.withdrawUI(customer);
			}
			// Transfer
			else if(choice === "3")
			{
				console.log("Transfer");
				this.transferUI(customer);
			}
			// View accounts
			else if(choice === "4")
			{
				console.log("View Accounts");
				this.viewAccounts(customer);
				
			}
			// Open new account
			else if(choice === "5")
			{
				console.log("Open New Account");
				this.openAccountUI(customer);
			}
			// Close customer account
			else if(choice === "6")
			{
				console.log("Remove Account");
				this.closeAccount(customer);
			}
			else if(choice === "7")
			{
				console.log("Logging Out");
				this.masterChoice();
			}
			else //ADDED AN ELSE STATEMENT ********************
			{
				console.log("Input Error... Please Try again...\n\n");
				var choice = readline.question("Choice: ");
			}
		}
		while(choice < 8 && choice > 0);
	}
	
	
	// -------------------------------------------
	// Prints the accounts
	// @param customer - the customer for which
	// to print the customer
	// -------------------------------------------
	this.viewAccounts = function(customer) 
	{
		// Get the accounts
		var accounts = customer.getAccounts();
		
		// The account counter
		var accountNum = 1;
			
		// Print the accounts
		for(account of accounts)
		{
			console.log("Account ", accountNum);
			account.printAcct();
			
			// Next account
			accountNum += 1;
		}
	} 
		
	// ------------------------------------------------------------
	// Master choice menu
	// ------------------------------------------------------------
	this.masterChoice = function()
	{
		do
		{
			console.log("What would you like to do?");
			console.log("1. Login");
			console.log("2. Create Account");
			console.log("3. Exit\n");			
			
			// Get the choice
			var choice = readline.question("Choice: ");	
			

			// Login
			if(choice === "1")	//CHANGE ANY AND ALL LOGICAL COMPARISONS TO === *************************
				this.loginUI();

			// Create new user account
			else if (choice === "2")
				this.createCustomerUI();
			
			// Exit program
			else if (choice === "3")
				process.exit(3);
			//added an else statement**************************
			else
			{
				console.log("Input error... Please try again...\n\n");
				var choice = readline.question("Choice: ");
			}
				
		}while(choice != 1 && choice != 2);
	}
	
	// -------------------------------------------------------------
	// The login menu
	// -------------------------------------------------------------
	this.loginUI = function()
	{
		do
		{
			console.log("Please enter your user name and password");
		
			// Get the user name
			// KEPT THESE VARIABLES AS VAR SINCE WE'LL BE USING THEM IN OUTSIDE FUNCTIONS ******************************
			var userName = readline.question("Username: ");
	
			// Get the password	
			var userPassword = readline.question("Password: ");
				
			// Whether there was a match
			var match = this.login(userName, userPassword);
			
			//error statement if there isn't an account
			if (match == false)
			{
				console.log("User name and password are not found! Please log in with the correct credentials or create a new account!")
				this.masterChoice();
			}
			
		} while(!match);
		
		
		// Get the customer
		var customer = this.getCustomer(userName);
		
		// Show the user menu
		this.userActionMenuUI(customer);
	}
	
			
	// -----------------------------------------------
	// Checks the provided user credentials
	// @param userName - the user name
	// @param userPassword - the user password
	// -----------------------------------------------
	this.login = function(userName, userPassword)
	{		
		// The match
		let match = false;
		
		// Is this a registered user?
		if(userName in this.customers)
		{
			// Get the customer
			let customer = this.customers[userName];
			
			// Check the password
			if(customer.getPassword() === userPassword) { match = true; }
		}
		
		return match;
	}
	
	// ----------------------------------------------------
	// Adds a new account (e.g., savings or checking for the 
	// existing user.
	// @param customer - the customer
	// @param acctName - the account name
	// @param initialDeposits - the initial deposit
	// @param type - the type of account: either "checking"
	// or "savings".
	// @return - the object of type Account rerepsenting
	// the newly created account
	// ---------------------------------------------------
	this.createAccount = function(customer, acctName, initialDeposits, type)
	{
		// Create a new account
		let account = new Account(acctName, initialDeposits, type);
		
		// Add account to the user
		customer.addAccount(account);
	}	

	// ------------------------------------------------------ **************
	// The UI for Removing an account
	// @param user - the owner of the account
	// ------------------------------------------------------
	this.closeAccount = function(customer, acctName, initialDeposits, type)
	{
		// Get account name from user ***********
		let rAcct = readline.question("Please choose an account to remove (e.g., enter 1 for the first account) ");
		// Remove account of the user ***********
		customer.removeAccount(rAcct, type);
	}
	
	
	// ----------------------------------------------------
	// Opens an new account for the existing customer (UI)
	// @param customer - the customer for whom to open
	// the account
	// ------------------------------------------------------
	this.openAccountUI = function(customer)
	{
		// The account name
		// THE CONSOLE DOESN'T SAVE THE USER INPUT, SO WE CAN'T TEST IT FOR ANYTHING ELSE***********
		// AFTERWARDS*****************
		// INSTEAD.. READ THE INPUT AND THEN CHECK IT ******************
		let accountName = readline.question("Please choose an account name: ");	

		//account type
		let choosenType = null;

		// Get the account type
		let accountType = readline.question("Please choose (1) for savings and (2) for checking: ");

		// The account type: savings or checking
		if(accountType === "1") { choosenType = "savings"; }
		else{ choosenType = "checking"; }

		//error checking for deposit number can't have negative numbers or 0
		do
		{
			// The initial deposit	
			var initialDeposit = readline.question("Please enter the deposit amount: ");
		} while(initialDeposit <= 0);

		// The account name
		// CHANGED THE accountType to "choosenType" SO THAT THE STRING GETS PASSED INTO THE NEW INFO AND NOT THE NUMBER***********
		this.createAccount(customer, accountName, parseFloat(initialDeposit), choosenType);
	}

	// ------------------------------------------------------
	// The UI for depositing money
	// @param user - the owner of the account
	// ------------------------------------------------------
	this.depositUI = function(user)
	{
		// The deposit account
		//MIG: Stopped here
		
		// Show all accounts of the user
		this.viewAccounts(user);
		
		// Get the account choice
		// PUT THE ACCOUNT IN THE REEADLINE BECASUE THE READLINE DOESN'T SAVE THE INPUT*******************
		let accountIndex = readline.question("Please select an account by entering a choice (e.g., enter 1 for the first account) ");
		
		// Get the account based on index
				let account = user.getAccount(accountIndex - 1);
		//error checking for deposit number
		do
		{
			// Get the deposit amount ********************
			var depositAmount = readline.question("Please enter the deposit amount: ");
		} while(depositAmount <= 0 || isNaN(depositAmount));
			
		// Deposit the money	
		account.deposit(depositAmount);	
		console.log("Updated account information: ");
		account.printAcct();
	}

	// ------------------------------------------------------
	// The UI for withdrawing the money
	// ------------------------------------------------------
	this.withdrawUI = function(customer)
	{	
		// Show all accounts of the user
		this.viewAccounts(customer);
		
		// I MOVED EACH OTHER VARIABLE INSIDE THE READLINE WHENEVER A VARIABLE INPUT
		// NEEDS TO BE USED ****************
		// Get the account choice
		let accountIndex = readline.question("Please select an account by entering a choice (e.g., enter 1 for the first account) ");
			
		let account = customer.getAccount(accountIndex - 1);
		
		// I MOVED EACH OTHER VRAIBLE INSIDE THE READLINE WHENEVER A VARIABLE INPUT
		// NEEDS TO BE USED ****************
		
		// Get the withdraw amount
		let withdrawAmount = readline.question("Please enter the withdraw amount: ");

		do
		{
			if(withdrawAmount > account.acctBalance)
			{
				console.log("There is not enough money in the account to withdraw.");
				withdrawAmount = readline.question("Please enter the withdraw amount: ");
			}
		} while (withdrawAmount > account.acctBalance);

		// Deposit the money	
		account.withdraw(withdrawAmount);	

		// Show the updated account information	
		console.log("Updated account information: ");
		account.printAcct();
	}

	
	// -----------------------------------------------------
	// The UI for transferring the money
	// @param customer - the customer for whom to perform the
	// transaction
	// -----------------------------------------------------
	this.transferUI = function(customer)
	{
		
		// Show the account information
		this.viewAccounts(customer);
			
		// Get the source account
		let accountIndex = readline.question("Please select the source account by entering a choice (e.g., enter 1 for the first account) ");
		
		// Get the destination account based on index
		let srcAccount = customer.getAccount(accountIndex - 1);
		
		// Get the destination account
		accountIndex = readline.question("Please select the destination by entering a choice (e.g., enter 1 for the first account) ");
		
		// Get the destination account based on index
		let dstAccount = customer.getAccount(accountIndex - 1);		
		
		// Get the transfer amount
		let transferAmount = readline.question("Please enter the transfer amount: ");
		
		// Withdraw the money from the source account
		srcAccount.withdraw(transferAmount);
		
		// Deposit the money	
		dstAccount.deposit(transferAmount);			
		
		console.log("Updated account information: ");
		srcAccount.printAcct();
		console.log("\n");
		dstAccount.printAcct();

	}
		
	// ---------------------------------------------
	// Shows all the user accounts
	// @param user - the user whose accounts to view
	// ----------------------------------------------
	this.showAccounts = function(user)
	{
		// Get the accounts
		let accounts = user.getAccounts();
		
		console.log(accounts);
			
		// The account number
		let acctNum = 0;
		
		// Print all the accounts
		for(account of accounts)
		{
			console.log(acctNum, account.getName(), " ", account.getBalance())
		}
	}
	
	// --------------------------------------------
	// Returns the customer based on the user name
	// @param userName - the user name
	// @return - the user name
	// --------------------------------------------
	this.getCustomer = function(userName) 
	{ 
		return this.customers[userName]; 
	}
	
	// Opens the bank for business.
	this.start = function()
	{
		// Keep running
		while(true) 
		{
			this.masterChoice();
			
			// Clear screen
			clearScreeen();
		}
	}
}

// ---- Sample Test Code --------

// Create three customers
let c1 = new Customer("mike", "123");
let c2 = new Customer("pike", "234");
let c3 = new Customer("bike", "678");

// Add accounts to each customer
c1.addAccount(new Account("bills", 100, "savings"));
c1.addAccount(new Account("dills", 200, "checking"));

c2.addAccount(new Account("wills", 300, "savings"));
c2.addAccount(new Account("kills", 400, "checking"));

c3.addAccount(new Account("chills", 300, "savings"));
c3.addAccount(new Account("thrills", 400, "checking"));

// Create a list of customers
let customers = [c1, c2, c3];

// Create a bank object
let myBank = new Bank("Kitty Bank", customers);


myBank.start();
