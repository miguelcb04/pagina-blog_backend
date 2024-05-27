document.addEventListener('DOMContentLoaded', () => {
  let postList = document.getElementById("posts-list");
  let links = document.getElementById("links");

  function updatePosts(url) {
    if (url) {
      // Reiniciamos los posts actuales
      postList.innerHTML = "";
      // Llamamos a la API de posts con Fetch
      fetch(url)
        .then(res => res.json())
        .then(res => {
          console.log('Response from API:', res); // Añade esto para depuración
          // Obtenemos y recorremos los posts obtenidos
            // Ingresamos el título y contenido del post
            postList.innerHTML += `<div class="card">
                                            <h3>${res[0].author}</h3>
                                            <p>${res[0].title}</p>
                                        </div>`;
          // Pintamos los enlaces de siguiente o anterior de la paginación
          links.innerHTML = (res.page > 1) ? `<button onclick="updatePosts('http://localhost:3000/api/posts?page=${res.page - 1}')">Atrás</button>` : "";
          links.innerHTML += (res.page < res.totalPages) ? `<button onclick="updatePosts('http://localhost:3000/api/posts?page=${res.page + 1}')">Siguiente</button>` : "";
        })
        .catch(error => {
          console.error('Error fetching posts:', error); // Añade esto para depuración
        });
    }
  }

  // Llamada inicial a la API
  updatePosts("http://localhost:3000/api/posts?page=1");
});






