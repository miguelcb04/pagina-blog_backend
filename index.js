const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const PORT = process.env.PORT ?? 3001;

app.use(cors());
app.use(express.static('public'));

app.get("/api/posts", (req, res) => {
  // Leer los datos del archivo posts.json
  let postData = JSON.parse(fs.readFileSync('posts.json', 'utf-8'));

  // Obtener el parámetro de la página
  const page = parseInt(req.query.page) || 1;
  const limit = 10; // Número de posts por página
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  // Seleccionar los posts de la página actual
  const paginatedPosts = postData.slice(startIndex, endIndex);

  // Responder con los posts paginados y la información de paginación
  res.json({
    page: page,
    totalPages: Math.ceil(postData.length / limit),
    results: paginatedPosts
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

