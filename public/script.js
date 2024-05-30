document.addEventListener('DOMContentLoaded', () => {
  let postList = document.getElementById("posts-list");
  let links = document.getElementById("links");

  // Definimos updatePosts en el ámbito global
  window.updatePosts = function(url) {
    if (url) {
      // Reiniciamos los posts actuales
      postList.innerHTML = "";
      // Llamamos a la API de posts con Fetch
      fetch(url)
        .then(res => res.json())
        .then(res => {
          console.log('Response from API:', res); // Añade esto para depuración

          // Verificamos si res.posts es un array
          if (!Array.isArray(res.posts)) {
            console.error('Response posts is not an array:', res.posts);
            throw new TypeError("Response posts is not an array");
          }

          // Obtenemos y recorremos los posts obtenidos
          for (let post of res.posts) {
            // Ingresamos el título y contenido del post
            postList.innerHTML += `<div class="card">
                                      <h3>${post.author}</h3>
                                      <p>${post.title}</p>
                                    </div>`;
          }

          // Pintamos los enlaces de siguiente o anterior de la paginación
          links.innerHTML = "";
          console.log(res.page, res.total_posts);

          if (res.page > 1) {
            links.innerHTML += `<button onclick="updatePosts('http://localhost:3000/api/posts?page=${res.page - 1}')">Atrás</button>`;
          }
          if (res.page < res.total_posts) {
            links.innerHTML += `<button onclick="updatePosts('http://localhost:3000/api/posts?page=${res.page + 1}')">Siguiente</button>`;
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
