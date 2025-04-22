const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = "3000";

// Middleware setup
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

app.get('/result', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'result.html'));
});

app.post('/save-data', (req, res) => {
  const employeeData = req.body;
  
  // Calculate bonuses
  const yearsOfService = parseInt(employeeData.years);
  const baseSalary = parseFloat(employeeData.salary);
  
  // Determine bonus percentage
  let bonusPercentage = 0;
  if (yearsOfService > 10) {
    bonusPercentage = 15;
  } else if (yearsOfService >= 5) {
    bonusPercentage = 10;
  } else {
    bonusPercentage = 5;
  }
  
  // Calculate bonus amount
  const bonusAmount = (baseSalary * bonusPercentage) / 100;
  
  // Extra bonus if salary is less than 1000
  const extraBonus = baseSalary < 1000 ? 100 : 0;
  
  // Final salary
  const finalSalary = baseSalary + bonusAmount + extraBonus;
  
  // Create complete employee record
  const employeeRecord = {
    rut: employeeData.rut,
    name: employeeData.name,
    years: yearsOfService,
    baseSalary: baseSalary,
    bonusPercentage: bonusPercentage,
    bonusAmount: bonusAmount,
    extraBonus: extraBonus,
    finalSalary: finalSalary
  };
  
  // Read existing data from JSON file (or create new array if file doesn't exist)
  let employees = [];
  try {
    const data = fs.readFileSync('employees.json', 'utf8');
    employees = JSON.parse(data);
  } catch (err) {
    // File doesn't exist yet, start with empty array
  }
  
  // Add new employee data
  employees.push(employeeRecord);
  
  // Write back to JSON file
  fs.writeFileSync('employees.json', JSON.stringify(employees, null, 2));
  
  // Send response back with generated data
  res.json(employeeRecord);
});



// para mostrar todos los empelados de una que estan en la base de datos.
app.get('/get-employees', (req, res) => {
    try {
      // Lee el archivo JSON
      const data = fs.readFileSync('employees.json', 'utf8');
      const employees = JSON.parse(data);
      res.json(employees);
    } catch (err) {
      // Si el archivo no existe o hay un error, devuelve un array vacío
      res.json([]);
    }
  });


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});