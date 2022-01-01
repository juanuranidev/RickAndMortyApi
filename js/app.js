// Obteniendo objetos del DOM
let botonParaMostrarLosPersonajes = document.getElementById("botonMostrarPersonajes")
let cabezaDeRickAntes = document.getElementById("cabezaDeRickAntes")
let cabezaDeRickDespues = document.getElementById("cabezaDeRickDespues")
let flecha = document.getElementById("flecha")
let footer = document.getElementById("footer")
let personajes = document.getElementById("personajes")

// Función para mostrar personajes
function mostrarTodosLosPersonajes(data){
    data.forEach(personaje => {
        personajes.innerHTML += `
        <div class="personaje">
            <div class="imagenPersonaje">
                <img src=${personaje.image}>
            </div>
            <div class="informacionPersonaje">
                <div class="tituloPersonaje">
                    <h2><a href="${personaje.url}" target="_blank">${personaje.name}</a></h2>
                </div>
                <div class="caracteristicasPersonaje">
                    <p><b>Status:</b><br class="displayNone"> ${personaje.status} / ${personaje.species}</p>
                    <p><b>Gender:</b> ${personaje.gender}</p>
                    <p><b>Last known location:</b><br><a href="${personaje.location.url}" target="_blank">${personaje.location.name}</a></p>
                    <p><b>Origin location:</b><br><a href="${personaje.origin.url}" target="_blank"> ${personaje.origin.name}</a></p>
                </div>
            </div>
        </div>`
     })
}

// Mostrar personajes onclick
botonParaMostrarLosPersonajes.addEventListener('click', () => {
    // Cabezas Rick
    cabezaDeRickAntes.style.display="none"
    cabezaDeRickDespues.style.display="block"
    $("#cabezaDezRickDespues").effect("bounce", "slow");
    // Boton "Mostrar personajes"
    botonParaMostrarLosPersonajes.style.display="none"
    // Flecha
    flecha.style.display="block"
    $("#flecha").effect("bounce", "slow");
    // Footer
    footer.style.display="block"

    // Obtener data
    fetch("https://rickandmortyapi.com/api/character")
        .then(response => response.json())
        .then(data => mostrarData(data))   
    
    // Mostrar la data
    const mostrarData = (data) => {
        mostrarTodosLosPersonajes(data.results)
        // Div con los botones de navegación
        let divConLosBotonesDeNavegacion = document.getElementById("botonesNavegacion")

        data.info.prev != null
        ? divConLosBotonesDeNavegacion.innerHTML += `<button class="botonNavegacion" id="botonPaginaAnterior">Página anterior</button>`
        :  null
        
        data.info.next !== null
        ? divConLosBotonesDeNavegacion.innerHTML += `<button class="botonNavegacion" id="botonSiguiente">Página siguiente</button>`
        : null

        // data.info.prev
        let botonPaginaAnterior = document.getElementById("botonPaginaAnterior")
        if(botonPaginaAnterior !== null) {
            botonPaginaAnterior.addEventListener('click',() => {
            personajes.scrollIntoView();
            personajes.innerHTML = ""
            botonesNavegacion.innerHTML = ""
            fetch(data.info.prev)
                .then(response => response.json())
                .then(data => mostrarData(data))
        })
        } else {
            null
        }
        
        // data.info.next
        let botonSiguiente = document.getElementById("botonSiguiente")
        if(botonSiguiente !== null) {
                botonSiguiente.addEventListener('click',() => {
                personajes.scrollIntoView();
                personajes.innerHTML = ""
                botonesNavegacion.innerHTML = "" 
                fetch(data.info.next)
                    .then(response => response.json())
                    .then(data => mostrarData(data))   
            })
        } else {
            null
        }
    }
})