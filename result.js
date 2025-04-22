document.addEventListener('DOMContentLoaded', function() {
    // Get data from localStorage
    const calculatedData = JSON.parse(localStorage.getItem('calculatedData'));
    
    if (!calculatedData) {
        alert('No hay datos para mostrar. Por favor complete el formulario primero.');
        window.location.href = '/';
        return;
    }
    
    // Display the results
    document.getElementById('result-rut').textContent = calculatedData.rut;
    document.getElementById('result-name').textContent = calculatedData.name;
    document.getElementById('result-bonus-percentage').textContent = calculatedData.bonusPercentage + '%';
    document.getElementById('result-base-salary').textContent = calculatedData.baseSalary;
    document.getElementById('result-bonus-amount').textContent = calculatedData.bonusAmount;
    document.getElementById('result-extra-bonus').textContent = calculatedData.extraBonus;
    document.getElementById('result-final-salary').textContent = calculatedData.finalSalary;
    
    // Fetch all employees from the database
    fetch('/get-employees')
        .then(response => response.json())
        .then(employees => {
            const allEmployeesContainer = document.getElementById('all-employees-container');
            
            // Clear previous content
            allEmployeesContainer.innerHTML = '';
            
            // Loop through each employee and create a display section
            employees.forEach((employee, index) => {
                const employeeDiv = document.createElement('div');
                employeeDiv.className = 'results-container';
                employeeDiv.style.marginBottom = '20px';
                
                employeeDiv.innerHTML = `
                    <h3>Empleado #${index + 1}</h3>
                    <div class="result-row">
                        <strong>Rut:</strong> <span>${employee.rut}</span>
                    </div>
                    <div class="result-row">
                        <strong>Nombre Empleado:</strong> <span>${employee.name}</span>
                    </div>
                    <div class="result-row">
                        <strong>Tipo bonificación:</strong> <span>${employee.bonusPercentage}%</span>
                    </div>
                    <div class="result-row">
                        <strong>Salario base:</strong> <span>${employee.baseSalary}</span>
                    </div>
                    <div class="result-row">
                        <strong>Bonificación:</strong> <span>${employee.bonusAmount}</span>
                    </div>
                    <div class="result-row">
                        <strong>Bonificación extra:</strong> <span>${employee.extraBonus}</span>
                    </div>
                    <div class="result-row">
                        <strong>Salario final:</strong> <span>${employee.finalSalary}</span>
                    </div>
                `;
                
                allEmployeesContainer.appendChild(employeeDiv);
            });
            
            // If no employees found
            if (employees.length === 0) {
                allEmployeesContainer.innerHTML = '<p>No hay empleados registrados en la base de datos.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching employees:', error);
            document.getElementById('all-employees-container').innerHTML = 
                '<p>Error al cargar los empleados. Por favor intente nuevamente.</p>';
        });
});
