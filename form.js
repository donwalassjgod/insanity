
// La siguiente funcion se coloca para asegurarse que el archivo html cargue antes que el de js, asi prevenimos errores. 
document.addEventListener('DOMContentLoaded', function() {

    // Aqui almacenamos en una variable "llamada employeeForm" todo lo que hay en el formulario "employeeForm" con su id.
    const employeeForm = document.getElementById('employeeForm');
    
    // Aqui lo que hace el addeventlistener es escuchar el evento que fue accionado, que en este caso seria el de submit que era el boton en el formulario 1, con el paramentro "e" que seria evento.
    employeeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aqui creamos un diccionario con el formato de nuestro json y le agregamos el valor que hay en los respectivos inputs del formulario gracias a su id.
        const formData = {
            rut: document.getElementById('rut').value,
            name: document.getElementById('name').value,
            years: document.getElementById('years').value,
            salary: document.getElementById('salary').value
        };
        
        // Guardamos nuestro diccionario en el localstorage.
        localStorage.setItem('employeeData', JSON.stringify(formData));
        
        // Subimos nuestro diccionario y nuestros datos al servidor
        fetch('/save-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            // Store complete calculated data
            localStorage.setItem('calculatedData', JSON.stringify(data));
            
            // Redirect to result page
            window.location.href = '/result';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al procesar los datos. Por favor intente nuevamente.');
        });
    });
});