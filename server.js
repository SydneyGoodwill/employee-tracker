var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "2112",
  database: "employee_db"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add departments",
        "Add roles",
        "Add employees",
        "View departments",
        "View roles",
        "View employees",
        "Update employee roles",
        "exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Add departments":
        addDepartment();
        break;

      case "Add roles":
        addRole();
        break;

      case "Add employees":
        addEmployee();
        break;

      case "View departments":
        viewDepartment();
        break;

      case "View roles":
        viewRole();
        break;
      
      case "View employees":
        viewEmployee();
        break;

      case "Update employee roles":
        updateRoles();
        break;

      case "exit":
        end();
        break;
      }
    });
}

function addDepartment() {
  inquirer
    .prompt({
      name: "dept",
      type: "input",
      message: "Which department would you like to add?"
    })
    .then(function(answer) {
        var query = connection.query(
            "INSERT INTO department SET ?",
            {
              name: answer.dept,
            },
            function(err, res) {
              if (err) throw err;
              console.log(res.affectedRows + " product inserted!\n");
          
            }
          )
          runSearch();
    });
}


// SELECT ALL FROM roles... (for viewing)

function addRole() {
    inquirer
    .prompt([{
      name: "role",
      type: "input",
      message: "Which role title would you like to add?"
    },
    {
        name: "salary",
        type: "input",
        message: "What is the salary for this role?"
    },
    {
        name: "department_id",
        type: "input",
        message: "What is your department's ID?"
    }])
    .then(function(answer) {
        var query = connection.query(
            "INSERT INTO role SET ?",
            {
              title: answer.role,
              salary: answer.salary,
              department_id: answer.department_id
            },
            function(err, res) {
              if (err) throw err;
              console.log(res.affectedRows + " product inserted!\n");
          
            }
          )
          runSearch();
    });
  }






function addEmployee() {
    inquirer
    .prompt([{
      name: "first_name",
      type: "input",
      message: "What is the employee's first name?"
    },
    {
        name: "last_name",
        type: "input",
        message: "What is the employee's last name?"
    },
    {
        name: "role_id",
        type: "input",
        message: "What is your department's ID?"
    },
    {
        name: "manager_id",
        type: "input",
        message: "What is the manager ID?"
    
    }])
    .then(function(answer) {
        var query = connection.query(
            "INSERT INTO employee SET ?",
            {
              first_name: answer.first_name,
              last_name: answer.last_name,
              role_id: answer.role_id,
              manager_id: answer.manager_id

            },
            function(err, res) {
              if (err) throw err;
              console.log(res.affectedRows + " product inserted!\n");
          
            }
          )
          runSearch();
    });
}

function viewDepartment() {
  var query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);


      runSearch();
  })
}

function viewRole() {
    var query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
  
  
        runSearch();
    })
  }

  function viewEmployee() {
    var query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
  
  
        runSearch();
    })
  }

  function updateRoles() {
      inquirer
      .prompt([{
          name: "employeeUpdate",
          type: "input",
          message: "What is the first name of the employee you want to update?"
      },
      {
          name: "updateRole",
          type: "input",
          message: "What is the ID of the role they are being updated to?"
      }
    ])
    .then(function(answer) {
        var query = connection.query(
            "UPDATE employee SET ?",
            {
              first_name: answer.employeeUpdate,
              role_id: answer.updateRole,
            },
            function(err, res) {
              if (err) throw err;
              console.log(res.affectedRows + " product inserted!\n");
          
            }
          )
          runSearch();
    });
  }

// ending function

function end() {
    connection.end();
    process.exit();
}
