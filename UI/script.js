const movieContainer = document.getElementById('movie-container');
const searchBar = document.getElementById('search-bar');
let movies = [];

// Fetch movies from CSV
fetch('data.csv')
    .then(response => response.text())
    .then(data => {
        // Parse CSV data
        const rows = data.split('\n').slice(1); // Remove header row
        movies = rows.map(row => {
            const [name, url, imageUrl] = row.split(',').map(item => item.trim());
            return { name, url, imageUrl };
        }).filter(movie => movie.name && movie.url && movie.imageUrl); // Filter out empty entries
        renderMovies(movies);
    })
    .catch(error => console.error('Error fetching movies:', error));

function renderMovies(moviesToRender) {
    movieContainer.innerHTML = '';
    moviesToRender.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
                    <a href="${movie.url}">
                        <div class="image-placeholder">
                            <img src="${movie.imageUrl}" alt="${movie.name}" />
                        </div>
                    </a>
                    <div class="movie-title">${movie.name}</div>
                `;
        movieContainer.appendChild(card);
    });
}

searchBar.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredMovies = movies.filter(movie =>
        movie.name.toLowerCase().includes(searchTerm)
    );
    renderMovies(filteredMovies);
});