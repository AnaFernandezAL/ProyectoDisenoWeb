const urlServer = 'http://127.0.0.1:5500/JSON/imagenesGaleria.json';

const listaGaleria = document.getElementById('gallery');

const tanios = ['col-12 col-md-6 col-lg-4', 'col-12 col-lg-8', 'col-12 col-md-6', 'col-12 col-lg-4'];

fetch(urlServer)
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudo cargar el JSON');
        }
        return response.json();
    })
    .then(data => {
        const imageData = data.imagenes;

        imageData.forEach((image, index) => {
            const colDiv = document.createElement('div');
            colDiv.className = `gallery-item ${tanios[index % tanios.length]}`;

            const img = document.createElement('img');
            img.src = image.url;
            img.alt = 'Imagen de la galería';
            img.className = 'img-fluid';

            colDiv.appendChild(img);
            listaGaleria.appendChild(colDiv);
        });
    })
    .catch(error => {
        console.error('Error al cargar las imágenes:', error);
    });
