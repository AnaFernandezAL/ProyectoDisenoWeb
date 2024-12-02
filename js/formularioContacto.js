emailjs.init("XhCSiG0X7MDqoBRae");

const $form = document.querySelector("#form");
$form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData($form);

    const edad = calcularEdad();
    let datoEdad = "La persona es mayor de edad, por lo que puede realizar una reserva (Tomar en cuenta)";
    if (edad < 18) {
        datoEdad = "La persona es menor de edad, por lo que NO puede realizar una reserva (Tomar en cuenta)";
    }
    const data = {
        nombre: formData.get("nombre"),
        correo: formData.get("correo"),
        edad: edad,
        datoED: datoEdad,
        mensaje: formData.get("mensaje")
    };

    emailjs.send('service_vgp26ce', 'template_1vc22ia', {
        to_name: "Anhelos Lodge",
        from_name: data.nombre,
        from_email: data.correo,
        edad: edad,
        datoED: datoEdad,
        message: formData.get("mensaje")
    })
    .then(function(response) {
        console.log('Correo enviado con éxito', response);
        alert('Tu mensaje ha sido enviado con éxito');
    }, function(error) {
        console.error('Error al enviar correo', error);
        alert('Hubo un error al enviar tu mensaje, intenta nuevamente');
    });
}

function calcularEdad() {
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
    if (!fechaNacimiento) {
        return 0;
    }

    const anio = new Date(fechaNacimiento).getFullYear();
    const anioActual = new Date().getFullYear();
    const edad = anioActual - anio;
    return edad;
}
