document.getElementById('enviar').addEventListener('click', function() {
    // Obtener los valores de los inputs
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var edad = document.getElementById('edad').value;
    var puesto = document.getElementById('puesto').value;
    var horasTrabajadas = parseInt(document.getElementById('horasTrabajadas').value);
    var horasExtra = parseInt(document.getElementById('horasExtra').value);

    // Obtener todos los inputs de tipo "number"
    var numberInputs = document.querySelectorAll('input[type="number"]');

    // Agregar un evento de escucha para cada input
    numberInputs.forEach(function(input) {
        input.addEventListener('input', function() {
            // Obtener el valor del input y convertirlo a número
            var value = parseInt(this.value, 10);
            // Verificar si el valor es negativo o no es un número
            if (isNaN(value) || value < 0) {
                // Si es negativo o no es un número, establecer el valor como vacío
                this.value = '';
            }
        });
    });

    // Calcular el salario base
    var salarioBase = horasTrabajadas * calcularSalarioPuesto(puesto);

    // Calcular el pago de horas extra
    var pagoHoraExtra = calcularPagoHoraExtra(horasExtra, salarioBase);

    // Calcular bonos
    var bonos = calcularBonos();

    // Calcular deducibles
    var deducibles = calcularDeducibles();

    // Calcular salario total
    var salarioTotal = salarioBase + pagoHoraExtra + bonos - deducibles;

    // Crear una nueva fila para la tabla con el símbolo "$" antes del salario
    var nuevaFila = "<tr><td>" + nombre + "</td><td>" + apellido + "</td><td>" + edad + "</td><td>" + puesto + "</td><td>" + horasTrabajadas + "</td><td>" + horasExtra + "</td><td>$" + salarioTotal.toFixed(2) + "</td></tr>";

    // Agregar la nueva fila al cuerpo de la tabla
    document.getElementById('tbodyRegistro').innerHTML += nuevaFila;
});

function calcularSalarioPuesto(puesto) {
    // Simulando el cálculo del salario base basado en el puesto
    var salarioPuestos = {
        "CEO": 100,
        "Project manager": 80,
        "Gerente": 70,
        "Desarrollador": 60,
        "Diseñador": 50,
        "Tester": 40,
        "Practicante": 15
    };
    return salarioPuestos[puesto] || 0; // Si el puesto no está en la lista, el salario base será 0
}

function calcularPagoHoraExtra(horasExtra, salarioBase) {
    var pagoHoraExtra = 0;
    if (horasExtra > 0 && horasExtra <= 9) {
        pagoHoraExtra = horasExtra * (salarioBase * 2);
    } else if (horasExtra > 9) {
        pagoHoraExtra = 9 * (salarioBase * 2) + (horasExtra - 9) * (salarioBase * 3);
    }
    return pagoHoraExtra;
}

function calcularBonos() {
    var bonos = 0;
    var checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]:checked');
    if (checkboxes.length > 0) {
        checkboxes.forEach(function(checkbox) {
            // Simulando el cálculo de bonos
            bonos += 5; // Supongamos que cada bono suma $50 al salario
        });
    } else {
        // Si no se selecciona ningún bono, se considera el salario sin bonificaciones
        bonos = 0;
    }
    return bonos;
}

// Función para calcular deducibles
function calcularDeducibles() {
    var deducibles = 0;
    var checkboxSeguro = document.getElementById('seguro');
    if (checkboxSeguro.checked) {
        // Simulando el costo del seguro médico
        deducibles += 122;
    }
    return deducibles;
}

