document.addEventListener("DOMContentLoaded", function() {
    var immagini = document.querySelectorAll('.img_1, .img_3');

    function fadeIn(event) {
        var op = 0.1;
        event.target.style.opacity = op;
        event.target.style.display = '';
        var timer = setInterval(function () {
            if (op >= 1) {
                clearInterval(timer);
            }
            event.target.style.opacity = op;
            event.target.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op += op * 0.1;
        }, 5);
    }
    immagini.forEach(function(img) {
        img.style.opacity = '1';  //imposto opacità iniziale//

        img.addEventListener('mouseover', function() {
            img.style.opacity = '1.2';  //opacità al passaggio del mouse//
        });
        img.addEventListener('mouseout', function() {
            img.style.opacity = '1';   //ritorna a opacità iniziale//
        });
    });
});

  document.addEventListener("DOMContentLoaded", function() {
    //nasconde il popup all'avvio
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
   //Visualizza il popup dopo 9secondi(9000 millisecondi)
    setTimeout(function() {
        modal.style.display = "block";
    }, 9000);
    //Chiude il popup (x) quando l'utente clicca sul simbolo
    var close = document.getElementsByClassName("close") [0];
    close.onclick = function() {
        modal.style.display = "none";
    }
    }); 


document.addEventListener("DOMContentLoaded", function() {
    const immaginiGalleria = [
        { src: 'recensione1.JPG', alt: 'Descrizione Immagine 1' },
        { src: 'recensione2.JPG', alt: 'Descrizione Immagine 2' },
        { src: 'recensione3.JPG', alt: 'Descrizione Immagine 3' },
    ];

    let indiceImmagine = 0;
    const containerGalleria = document.querySelector('.image-slider .image-container');
    containerGalleria.innerHTML = '';

    // Funzione per creare e mostrare le immagini
    function creaMostraImmagini() {
        immaginiGalleria.forEach((immagine, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = immagine.src;
            imgElement.alt = immagine.alt;
            imgElement.style.display = index === indiceImmagine ? 'block' : 'none';
            containerGalleria.appendChild(imgElement);
        });
    }

    creaMostraImmagini(); // Chiamata iniziale per popolare la galleria

    // Funzione per cambiare l'immagine visualizzata
    function cambiaImmagine(n) {
        indiceImmagine += n;
        if (indiceImmagine >= immaginiGalleria.length) { indiceImmagine = 0; }
        if (indiceImmagine < 0) { indiceImmagine = immaginiGalleria.length - 1; }
        aggiornaGalleria();
    }

    // Funzione per aggiornare la galleria con l'immagine corrente
    function aggiornaGalleria() {
        document.querySelectorAll('.image-slider .image-container img').forEach((img, index) => {
            img.style.display = index === indiceImmagine ? 'block' : 'none';
        });
    }

    // Event listener per i pulsanti Avanti e Indietro
    document.querySelector(".successivo").addEventListener("click", function() {
        cambiaImmagine(1);
    });

    document.querySelector(".precedente").addEventListener("click", function() {
        cambiaImmagine(-1);
    });

    // Autoplay con setInterval
    setInterval(function() {
        cambiaImmagine(1);
    }, 7000);
});

// barra di ricerca nella nav
document.addEventListener("DOMContentLoaded", function() {
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const searchQuery = document.getElementById('searchInput').value;
        window.location.href = `https://www.amatobimbi.it/it/ecommerce/search/?ssearch=${encodeURIComponent(searchQuery)}`;
    });
});

// Newsletter
document.getElementById('newsletterForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const loadingIndicator = document.getElementById('loadingIndicator');
    const messageSuccess = document.getElementById('messageSuccess');
    const messageError = document.getElementById('messageError');

    if (!document.getElementById('privacy').checked) {
        alert('Devi accettare le condizioni di Privacy per iscriverti.');
        return;
    }

    loadingIndicator.style.display = 'block';
    const data = {
        nome: document.getElementById('nome').value,
        cognome: document.getElementById('cognome').value,
        email: document.getElementById('email').value,
    };

    fetch('/api/newsletter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        loadingIndicator.style.display = 'none';
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Si è verificato un problema con l\'invio del form');
        }
    })
    .then(data => {
        messageSuccess.textContent = 'Grazie per esserti iscritto alla nostra newsletter!';
        messageSuccess.style.display = 'block';
    })
    .catch(error => {
        console.error('Error:', error);
        messageError.textContent = 'Errore: ' + error.message;
        messageError.style.display = 'block';
    });
});

// Mappa e Localizzazione
function initMap(lat = 37.507704, lng = 15.0894961) { 
    var map = new Microsoft.Maps.Map('#myMap', {
        credentials: 'ApwhowTOlOwc6jfo5zPH8klAHAy67rO45yu5zJsA-uaIYH8dMnk7xQHQxPfeFUpF',  //'Your_Bing_Maps_Key',
        center: new Microsoft.Maps.Location(37.507704, 15.0894961),
        zoom: 14
    });

    var pushpinOptions = {
        color: 'darkblue',  
        title: 'Amato bimbi', 
        subTitle: 'Negozio abbigliamento per bambini', 
        text: ' 📍' 
    };

    var pushpin = new Microsoft.Maps.Pushpin(map.getCenter(),pushpinOptions); 
    map.entities.push(pushpin);
}


// Funzione opzionale per ottenere coordinate tramite geocoding
function getCoordinates(address) {
    const encodedAddress = encodeURIComponent(address);
    fetch(`https://dev.virtualearth.net/REST/v1/Locations?query=${encodedAddress}&key=ApwhowTOlOwc6jfo5zPH8klAHAy67rO45yu5zJsA-uaIYH8dMnk7xQHQxPfeFUpF`)
        .then(response => response.json())
        .then(data => {
            if (data.resourceSets[0].resources.length > 0) {
                const location = data.resourceSets[0].resources[0].point.coordinates;
                initMap(location[0], location[1]); 
            } else {
                console.error('No location found for this address.');
            }
        })
        .catch(error => console.error('Geocoding failed:', error));
}

getCoordinates('Corso Sicilia 69, Catania, Italy');  


// Definisco la città 
const cityName = 'Catania';

// Funzione per ottenere le coordinate di una città da Bing Maps
function fetchCoordinates(callback) {
    const bingMapsKey = 'ApwhowTOlOwc6jfo5zPH8klAHAy67rO45yu5zJsA-uaIYH8dMnk7xQHQxPfeFUpF'; 
    const geocodeUrl = `http://dev.virtualearth.net/REST/v1/Locations?query=${encodeURIComponent(cityName)}&key=${bingMapsKey}`;

    fetch(geocodeUrl)
    .then(response => response.json())
    .then(data => {
        if (data && data.resourceSets && data.resourceSets.length > 0 && data.resourceSets[0].resources.length > 0) {
            const coords = data.resourceSets[0].resources[0].point.coordinates;
            callback(coords[0], coords[1]); 
        } else {
            throw new Error('No coordinates found for ' + cityName);
        }
    })
    .catch(error => console.error('Bing Maps Geocoding error:', error));
}

// Funzione per ottenere i dati meteo usando le coordinate ottenute
function fetchWeatherData(lat, lng) {
    const url = `https://pfa.foreca.com/api/v1/current/${lat},${lng}`;
    const key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9wZmEuZm9yZWNhLmNvbVwvYXV0aG9yaXplXC90b2tlbiIsImlhdCI6MTcxNDY4MDkyNSwiZXhwIjo5OTk5OTk5OTk5LCJuYmYiOjE3MTQ2ODA5MjUsImp0aSI6IjJhZTQ3YTllOWQ3MThiZTkiLCJzdWIiOiJsYXVyYXphbnRlIiwiZm10IjoiWERjT2hqQzQwK0FMamxZVHRqYk9pQT09In0.w34RE2bZPf0SuQ_Cd5TlVMk7qF_tJW_IyetHBpQU_f8';  // Sostituisci con la tua chiave API di Foreca

    fetch(url, {
        headers: {
            'Authorization': `Bearer ${key}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Errore nella risposta dalla API di Foreca');
        }
        return response.json();
    })
    .then(data => {
        console.log('Weather Data:', data);
        displayWeather(data);
    })
    .catch(error => console.error('Si è verificato un errore:', error));
}

// Funzione per visualizzare i dati meteo nell'HTML
function displayWeather(weatherData) {
    const weatherDetails = document.getElementById('weatherDetails');
    weatherDetails.innerHTML = `
        <h2>Meteo per ${cityName}</h2>
        <p>Temperatura: ${weatherData.current.temperature}°C</p>
    `;
}

// Attiva il processo quando la pagina è completamente caricata
document.addEventListener('DOMContentLoaded', () => {
    fetchCoordinates(fetchWeatherData);
});