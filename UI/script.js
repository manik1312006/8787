const movieContainer = document.getElementById('movie-container');
const searchBar = document.getElementById('search-bar');
const genreFilter = document.getElementById('genre-filter');
const nextPageButton = document.getElementById('next-page');
const prevPageButton = document.getElementById('prev-page');
const pageNumberDisplay = document.getElementById('page-number');

let movies = [];
let currentPage = 1;
const moviesPerPage = 30;
const allGenres = new Set();

// Fetch movies from CSV
fetch('data.csv')
    .then(response => response.text())
    .then(data => {
        const rows = data.split('\n').slice(1); // Remove header row
        movies = rows.map(row => {
            const [name, url, date, genra] = row.split(',').map(item => item.replace(/"/g, '').trim());
            const genres = genra ? genra.split(',').map(g => g.trim()) : []; // Handle cases where GENRA might be empty
            genres.forEach(g => allGenres.add(g));
            return { name, url, date, genres };
        });

        // Populate genre filter *after* movies are loaded
        populateGenreFilter();
        renderMovies(); // Render initial set of movies
    })
    .catch(error => console.error('Error fetching movies:', error));

function populateGenreFilter() {
    // Clear existing options (in case of re-renders)
    genreFilter.innerHTML = '<option value="">All Genres</option>';

    Array.from(allGenres).sort().forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        genreFilter.appendChild(option);
    });
}

function renderMovies() {
    // Scroll to the top of the page
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    const startIndex = (currentPage - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    const moviesToRender = filterMovies().slice(startIndex, endIndex);

    if (moviesToRender.length === 0 && currentPage > 1) {
        currentPage--;
        renderMovies();
        return;
    }

    movieContainer.innerHTML = '';
    moviesToRender.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <a href="${movie.url}">
                <div class="movie-title">${movie.name}</div>
            </a>
        `;
        movieContainer.appendChild(card);
    });

    // Update pagination controls
    prevPageButton.disabled = currentPage === 1;
    nextPageButton.style.display = endIndex < filterMovies().length ? 'inline-block' : 'none'; // or 'block' if needed
    pageNumberDisplay.textContent = `Page ${currentPage}`;
}

searchBar.addEventListener('input', () => {
    currentPage = 1;
    renderMovies();
});

genreFilter.addEventListener('change', () => {
    currentPage = 1;
    renderMovies();
});

nextPageButton.addEventListener('click', () => {
    currentPage++;
    renderMovies();
});

prevPageButton.addEventListener('click', () => {
    currentPage--;
    renderMovies();
});

function filterMovies() {
    const searchTerm = searchBar.value.toLowerCase();
    const selectedGenre = genreFilter.value;

    return movies.filter(movie =>
        movie.name.toLowerCase().includes(searchTerm) && (selectedGenre === "" || movie.genres.includes(selectedGenre))
    );
}