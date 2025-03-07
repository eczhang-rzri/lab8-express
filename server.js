//create a simple server
const express = require('express');
const app = express();
const port = 3000; 

app.get('/', (req, res) => {
  res.send('Hello World!');
});

//routing in express
app.get('/about', (req, res) => {
    res.send('About Page');
});

app.post('/submit', (req, res) => {
    res.send('Form Submitted');
});

app.put('/update', (req, res) => {
    res.send('Update Successful');
});

app.delete('/delete', (req, res) => {
    res.send('Delete Successful');
});

//using middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(express.json());

//building a simple RESTful API with CRUD operations
let employees = [];

app.get('/employees', (req, res) => {
  res.json(employees);
});

app.post('/employees', (req, res) => {
  const { employee_id, name, email } = req.body;
  const newEmployee = { employee_id, name, email };
  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

app.put('/employees/:employee_id', (req, res) => {
  const { employee_id } = req.params;
  const { name, email } = req.body;
  const updatedEmployee = { employee_id, name, email };
  employees = employees.map(employee => 
    (employee.employee_id === employee_id ? updatedEmployee : employee)
  );
  res.json(updatedEmployee);
});

app.delete('/employees/:employee_id', (req, res) => {
  const { employee_id } = req.params;
  employees = employees.filter(employee => employee.employee_id !== employee_id);
  res.status(204).send();
});

//error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });

  
//start the server
app.listen(port, () => {    
    console.log(`Server listening at http://localhost:${port}`);
});