async function fetchData() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/manik1312006/8787/refs/heads/main/index.html');
        const text = await response.text();
        return parseM3U8(text);
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

function parseM3U8(content) {
    const lines = content.split('\n');
    const items = [];
    
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('EXTINF:-1')) {
            const title = lines[i].match(/,(.+)$/)?.[1] || '';
            const link = lines[i + 1]?.trim();
            const logo = lines[i].match(/tvg-logo="([^"]+)"/)?.[1] || '';
            const group = lines[i].match(/group-title="([^"]+)"/)?.[1] || '';
            
            if (title && link) {
                items.push({ title, link, logo, group });
            }
        }
    }
    
    return items;
}

function createCard(item) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <img src="${item.logo}" alt="${item.title}">
        <h3>${item.title}</h3>
    `;
    card.addEventListener('click', () => window.open(item.link, '_blank'));
    return card;
}

const ITEMS_PER_PAGE = 30;
let currentPage = 1;
let filteredItems = [];

function filterItems(items, searchText, genre) {
    return items.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchText.toLowerCase());
        const matchesGenre = genre === 'all' || item.group === genre;
        return matchesSearch && matchesGenre;
    });
}

function updatePagination() {
    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');
    const currentPageSpan = document.getElementById('currentPage');

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
    currentPageSpan.textContent = `Page ${currentPage} of ${totalPages}`;
}

function displayCurrentPage() {
    const content = document.getElementById('content');
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const itemsToShow = filteredItems.slice(startIndex, endIndex);

    content.innerHTML = '';
    itemsToShow.forEach(item => content.appendChild(createCard(item)));
    updatePagination();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function init() {
    const items = await fetchData();
    const content = document.getElementById('content');
    const search = document.getElementById('search');
    const genreButtons = document.querySelectorAll('.genre-filters button');
    let currentGenre = 'all';

    document.getElementById('prevPage').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayCurrentPage();
        }
    });

    document.getElementById('nextPage').addEventListener('click', () => {
        const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
        if (currentPage < totalPages) {
            currentPage++;
            displayCurrentPage();
        }
    });

    function updateDisplay() {
        currentPage = 1; // Reset to first page when filtering
        filteredItems = filterItems(items, search.value, currentGenre);
        displayCurrentPage();
    }

    search.addEventListener('input', updateDisplay);

    genreButtons.forEach(button => {
        button.addEventListener('click', () => {
            genreButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentGenre = button.dataset.genre;
            updateDisplay();
        });
    });

    updateDisplay();
}

init();