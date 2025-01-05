document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const movieContainer = document.getElementById('movie-container');

    // Initial movies
    const initialMovies = [
        {
            title: "LOVE AND OTHER DRUGS 2010",
            imageUrl: "",
            link: "vlc://https://firebasestorage.googleapis.com/v0/b/ip-tv-1312.appspot.com/o/Love%20and%20Other%20Drugs%202010.mkv?alt=media&token=51bfade2-52c6-47f6-8405-67e2bc6ffdd3"
          },
          {
            title: "TITANS S03",
            imageUrl: "",
            link: "vlc://https://firebasestorage.googleapis.com/v0/b/ip-tv-1312.appspot.com/o/TITANS%2FS03%2FTITANS%20S03.m3u8?alt=media&token=00d96bf2-577c-4fd2-8310-9f21c8e5f734"
          },
          {
            title: "TITANS S02",
            imageUrl: "",
            link: "vlc://https://firebasestorage.googleapis.com/v0/b/ip-tv-1312.appspot.com/o/TITANS%2FS02%2FTITANS%20S02.m3u8?alt=media&token=b305c196-2c50-495f-8028-6a1dbea01cda"
          },
          {
            title: "Agatha All Along S01",
            imageUrl: "",
            link: "vlc://https://firebasestorage.googleapis.com/v0/b/ip-tv-1312.appspot.com/o/Agatha%20All%20Along%2FS01%2FAgatha%20All%20Along%20S01.m3u8?alt=media&token=a2f7bf9b-1503-4871-a876-f97bab25cf3b"
          },
          {
            title: "Titans S01",
            imageUrl: "",
            link: "vlc://https://firebasestorage.googleapis.com/v0/b/ip-tv-1312.appspot.com/o/TITANS%2FS01%2FTITANS%20S01.m3u8?alt=media&token=062d6227-a5a4-4477-887d-c8df674aabfe"
          },
          {
            title: "The Wolf Of Wall Street 2013.mkv",
            imageUrl: "",
            link: "vlc://https://firebasestorage.googleapis.com/v0/b/ip-tv-1312.appspot.com/o/The%20Wolf%20of%20Wall%20Street%202013.mkv?alt=media&token=03f0e260-2acd-4362-ac3b-9efffda745ac"
          },
          {
            title: "The Crow 2024.mkv",
            imageUrl: "",
            link: "vlc://https://firebasestorage.googleapis.com/v0/b/ip-tv-1312.appspot.com/o/The%20Crow%202024.mkv?alt=media&token=45ffda6b-b2db-4fc3-b50b-da01903c36f3"
          },
          {
            title: "Yo Yo Honey Singh Famous 2024.mkv",
            imageUrl: "",
            link: "vlc://https://firebasestorage.googleapis.com/v0/b/ip-tv-1312.appspot.com/o/Yo%20Yo%20Honey%20Singh%20Famous%202024.mpeg?alt=media&token=8cedda45-c4a7-4488-9e25-a040affa5b46"
          },
          {
            title: "Taaza Khabar S02",
            imageUrl: "",
            link: "vlc://https://firebasestorage.googleapis.com/v0/b/ip-tv-1312.appspot.com/o/Taaza%20Khabar%20S02%2FTaaza%20Khabar.m3u8?alt=media&token=5b8e097e-54a3-42e2-bee7-4b21f4c35b78"
          },
          {
            title: "Kraven the Hunter 2024.mkv",
            imageUrl: "",
            link: "vlc://https://firebasestorage.googleapis.com/v0/b/ip-tv-1312.appspot.com/o/Kraven%20the%20Hunter%202024.mkv?alt=media&token=16333313-daf8-4256-a2b8-68269d35a465"
          },
          {
            title: "Sanju 2018.mkv",
            imageUrl: "",
            link: "vlc://https://firebasestorage.googleapis.com/v0/b/ip-tv-1312.appspot.com/o/Sanju%202018.mkv?alt=media&token=6ade3a1b-e3a7-4bbb-a07d-17661ba3ddeb"
          },
          {
            title: "Lucky Baskhar 2024.mkv",
            imageUrl: "",
            link: "vlc://https://firebasestorage.googleapis.com/v0/b/ip-tv-1312.appspot.com/o/Lucky%20Baskhar%202024.mkv?alt=media&token=5a23141e-d4cf-45d9-a17e-b9780f0c9acb"
          },
          {
            title: "Sikandar Ka Muqaddar 2024 .mkv",
            imageUrl: "",
            link: "vlc://https://firebasestorage.googleapis.com/v0/b/ip-tv-1312.appspot.com/o/Sikandar%20Ka%20Muqaddar%202024%201080p.mkv?alt=media&token=4e916686-a248-4827-9d30-a405c1bf218f"
          },
          {
            title: "Alita Battle Angel 2019.mkv",
            imageUrl: "",
            link: "vlc://https://firebasestorage.googleapis.com/v0/b/ip-tv-1312.appspot.com/o/Alita%20Battle%20Angel%202019.mkv?alt=media&token=400e868f-d2d3-40f9-a435-b10b9b2e13d4"
          },
          {
            title: "Dont Turn Out the Lights 2023.mkv",
            imageUrl: "",
            link: "vlc://https://firebasestorage.googleapis.com/v0/b/ip-tv-1312.appspot.com/o/Dont%20Turn%20Out%20the%20Lights%202023.mkv?alt=media&token=985c32a2-a7b8-4208-a05d-bb34b058ec49"
          },
          {
            title: "Oppenheimer 2023.mkv",
            imageUrl: "",
            link: "vlc://https://firebasestorage.googleapis.com/v0/b/ip-tv-1312.appspot.com/o/Oppenheimer%202023.mkv?alt=media&token=123391e0-5604-4eb1-a5a4-06aa5823db1b"
          },
          {
            title: "Bagman 2024.mkv",
            imageUrl: "",
            link: "vlc://https://firebasestorage.googleapis.com/v0/b/ip-tv-1312.appspot.com/o/Bagman%202024.mkv?alt=media&token=d6eef673-39e3-435b-90ac-68b7493c3957"
          },
          {
            title: "Bhool Bhulaiyaa 3 [2024].mkv",
            imageUrl: "",
            link: "vlc://https://firebasestorage.googleapis.com/v0/b/ip-tv-1312.appspot.com/o/Bhool%20Bhulaiyaa%203%20%5B2024%5D.mkv?alt=media&token=983f9442-97c4-4dbb-89ad-1b7d938d1c2e"
          },
          {
            title: "Singham.Again [2024].mkv",
            imageUrl: "",
            link: "vlc://https://firebasestorage.googleapis.com/v0/b/ip-tv-1312.appspot.com/o/Singham.Again%20%5B2024%5D.mkv?alt=media&token=c02bbea7-0dfa-4025-a622-ce5fce8ae5c1"
          },
          {
            title: "Pushpa 2 The Rule 2024 Print - 02.mkv",
            imageUrl: "",
            link: "vlc://https://firebasestorage.googleapis.com/v0/b/ip-tv-1312.appspot.com/o/Pushpa%202%20The%20Rule%202024%20Print%20-%2002.mkv?alt=media&token=e32cb094-7e10-46d8-a84b-96a38cb450f4"
          },
          {
            title: "The Guilty 2021.mkv",
            imageUrl: "",
            link: "vlc://https://firebasestorage.googleapis.com/v0/b/ip-tv-1312.appspot.com/o/The%20Guilty%202021.mkv?alt=media&token=3e0a6e90-fd5d-4c05-a1f8-0ad56e4b1d2d"
          },
          {
            title: "Do Patti [2024].mkv",
            imageUrl: "",
            link: "vlc://https://firebasestorage.googleapis.com/v0/b/ip-tv-1312.appspot.com/o/Do%20Patti%20%5B2024%5D.mkv?alt=media&token=ad0e58a2-1112-43e0-aa22-39e201da399d"
          },
          {
            title: "Ramayana - The Legend of Prince Rama [1992].mkv",
            imageUrl: "",
            link: "vlc://https://firebasestorage.googleapis.com/v0/b/ip-tv-1312.appspot.com/o/Ramayana%20-%20The%20Legend%20of%20Prince%20Rama%20%5B1992%5D.mkv?alt=media&token=f445292d-766d-4b21-be99-ba1295e4bc5b"
          },
          {
            title: "Venom The Last Dance.mkv",
            imageUrl: "",
            link: "vlc://https://firebasestorage.googleapis.com/v0/b/ip-tv-1312.appspot.com/o/Venom%20The%20Last%20Dance.mkv?alt=media&token=7847b36c-e89b-4738-89f5-1909c2f0712a"
          },
          {
            title: "Its Whats Inside 2024.mkv",
            imageUrl: "",
            link: "vlc://https://firebasestorage.googleapis.com/v0/b/ip-tv-1312.appspot.com/o/Its%20Whats%20Inside%202024.mkv?alt=media&token=54f92f08-04f9-4285-9c52-716bc9f6d8a5"
          },
          {
            title: "Life Like 2019 [English Only].mkv",
            imageUrl: "",
            link: "vlc://https://firebasestorage.googleapis.com/v0/b/ip-tv-1312.appspot.com/o/Life%20Like%202019%20%5BEnglish%20Only%5D.mkv?alt=media&token=ac4c319e-e292-40ee-944c-37a636763741"
          },
          {
            title: "The Substance 2024 [English].mkv",
            imageUrl: "",
            link: "vlc://https://firebasestorage.googleapis.com/v0/b/ip-tv-1312.appspot.com/o/The%20Substance%202024%20%5BEnglish%5D.mkv?alt=media&token=2e36e245-cd26-4383-b79e-28ed9a8aaed8"
          },
          {
            title: "Rose Rosy Te Gulab 2024 WeB-DL Panjabi.mkv",
            imageUrl: "",
            link: "vlc://https://firebasestorage.googleapis.com/v0/b/ip-tv-1312.appspot.com/o/Rose%20Rosy%20Te%20Gulab%202024%20WeB-DL%20Panjabi.mkv?alt=media&token=729e8745-171e-4b37-845b-1e46f39c0521"
          },
          {
            title: "Joker Folie a Deux (2024) HDTS 1080p Hindi (HQ Dub) + English x264 AAC HC-ESub CineVood.mkv",
            imageUrl: "",
            link: "vlc://https://firebasestorage.googleapis.com/v0/b/ip-tv-1312.appspot.com/o/Joker%20Folie%20a%20Deux%20(2024)%20HDTS%201080p%20Hindi%20(HQ%20Dub)%20%2B%20English%20x264%20AAC%20HC-ESub%20CineVood.mkv?alt=media&token=39703368-9dce-4d50-8d1b-a1426dc5bbbc"
          },
          {
            title: "Double iSmart [2024] HQ.mp4",
            imageUrl: "",
            link: "vlc://https://firebasestorage.googleapis.com/v0/b/ip-tv-1312.appspot.com/o/Double%20iSmart%20%5B2024%5D%20HQ.mp4?alt=media&token=a3c01e22-eae4-4ff7-ba21-dc5ad75b7d3f"
          },
          {
            title: "Phir.Aayi.Hasseen.Dillruba.2024.1080p.mp4",
            imageUrl: "",
            link: "vlc://https://firebasestorage.googleapis.com/v0/b/ip-tv-1312.appspot.com/o/Phir.Aayi.Hasseen.Dillruba.2024.1080p.mp4?alt=media&token=f2e32056-a9ce-46d9-92f2-efbce8c906d1"
          },
          {
            title: "Bad.Newz.2024.1080p.HDTS.mp4",
            imageUrl: "",
            link: "vlc://https://firebasestorage.googleapis.com/v0/b/ip-tv-1312.appspot.com/o/Bad.Newz.2024.1080p.HDTS.mp4?alt=media&token=f1654047-9668-457f-90a1-441f3cf54386"
          },
          {
            title: "Jatt And Juliet 3 2024 Punjabi HDTS 1080p.mkv",
            imageUrl: "",
            link: "vlc://https://firebasestorage.googleapis.com/v0/b/ip-tv-1312.appspot.com/o/Jatt%20And%20Juliet%203%202024%20Punjabi%20HDTS%201080p.mkv?alt=media&token=e0c98aa2-90ba-4d2a-9f77-516cbe94a215"
          },
          {
            title: "Brightburn.2019.1080p.Hindi.English.webm",
            imageUrl: "",
            link: "vlc://https://firebasestorage.googleapis.com/v0/b/ip-tv-1312.appspot.com/o/Brightburn.2019.1080p.Hindi.English.webm?alt=media&token=883d5cad-34ad-497c-9e8c-5a3fe58508e8"
          }
    ];

    // Function to create movie element
    function createMovieElement(movie) {
        const parentDiv = document.createElement('div');
        parentDiv.className = 'parent';
        parentDiv.innerHTML = `
            <div class="ch">
                <a href="${movie.link}">
                    <img src="${movie.imageUrl}" class="img" alt="${movie.title}">
                    <span>${movie.title}</span>
                </a>
            </div>
        `;
        return parentDiv;
    }

    // Function to render movies
    function renderMovies(movies) {
        movieContainer.innerHTML = '';
        movies.forEach(movie => {
            movieContainer.appendChild(createMovieElement(movie));
        });
    }

    // Initial render
    renderMovies(initialMovies);

    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const filteredMovies = initialMovies.filter(movie => 
            movie.title.toLowerCase().includes(searchTerm)
        );
        renderMovies(filteredMovies);
    });
});