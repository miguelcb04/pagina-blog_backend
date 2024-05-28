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

          // Verificamos si res es un array
          if (!Array.isArray(res)) {
            console.error('Response is not an array:', res);
            throw new TypeError("Response is not an array");
          }

          // Obtenemos y recorremos los posts obtenidos
          for (let post of res) {
            // Ingresamos el título y contenido del post
            postList.innerHTML += `<div class="card">
                                      <h3>${post.author}</h3>
                                      <p>${post.title}</p>
                                    </div>`;
          }

          // Pintamos los enlaces de siguiente o anterior de la paginación
          // Pintamos los enlaces de siguiente o anterior de la paginación
          links.innerHTML = "";
          console.log(res.page, res.totalPages)
          
          if (res.page > 1) {
            links.innerHTML += `<button onclick="updatePosts('http://localhost:3001/api/posts?page=${res.page - 1}')">Atrás</button>`;
          }
          if (res.page < res.totalPages) {
            links.innerHTML += `<button onclick="updatePosts('http://localhost:3001/api/posts?page=${res.page + 1}')">Siguiente</button>`;
          }
        })
        .catch(error => {
          console.error('Error fetching posts:', error); // Añade esto para depuración
        });
    }
  }

  // Llamada inicial a la API
  updatePosts("http://localhost:3000/api/posts?page=1");
});