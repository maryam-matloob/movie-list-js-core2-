// ============================================================
//  MY MOVIE LIST — index.js
//  We write ALL of this together across 3 video lectures.
// ============================================================

const movies = [
    {
        id: 1,
        title: "Inception",
        year: 2010,
        genre: "scifi",
        rating: 5,
        watched: true,
    },

    {
        id: 2,
        title: "The Dark Knight",
        year: 2008,
        genre: "action",
        rating: 5,
        watched: false,
    },

    {
        id: 3,
        title: "Parasite",
        year: 2019,
        genre: "thriller",
        rating: 5,
        watched: true,
    },

    {
        id: 4,
        title: "The Grand Budapest Hotel",
        year: 2014,
        genre: "comedy",
        rating: 4,
        watched: true,
    },

    {
        id: 5,
        title: "Interstellar",
        year: 2014,
        genre: "scifi",
        rating: 5,
        watched: false,
    },

    {
        id: 6,
        title: "Spirited Away",
        year: 2001,
        genre: "animation",
        rating: 4,
        watched: false,
    },

    {
        id: 7,
        title: "Whiplash",
        year: 2014,
        genre: "drama",
        rating: 4,
        watched: false,
    },

    {
        id: 8,
        title: "Everything Everywhere All at Once",
        year: 2022,
        genre: "scifi",
        rating: 5,
        watched: false,
    },
];

let currentMovies = [...movies];
let activeFilter = "all";

// VIDEO 1 ── Arrays & Objects
// We'll define the movies array, explore objects, and
// render cards to the page using a for...of loop + map.

// function starsFromRating(rating)
// {
//   return "★".repeat(rating) + "☆".repeat(5 - rating);
// }

const starsFromRating = (rating) => "★".repeat(rating) + "☆".repeat(5 - rating);

function genreClass(genre) 
{
    const mapGenre = {
        action: 'genre-action',
        drama: 'genre-drama', 
        comedy: 'genre-comedy',
        scifi: 'genre-scifi',
        thriller: 'genre-thriller',
        animation: 'genre-animation'
    };

    return mapGenre[genre] || "genre-default";
}

function buildCard(movie)
{

    const {id, title, year, genre, rating, watched } = movie;
    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
      <span class = "genre-tag ${genreClass(genre)}">${movie.genre}</span>
      <h3>${movie.title}</h3>
      <p class ="year">${movie.year}</p>
      <span class ="stars">${starsFromRating(movie.rating)}</span>

      <div class ="card-footer">
          <span class="watched-badge ${movie.watched ? "watched": "not-watched"}">
          ${movie.watched ? "Watched" : "Unwatched"}
          </span>

          <button class="delete-btn" onclick="deleteMovie(${id})">Remove</button>
      </div>
      
    `;

    return card;
}

function buildAddForm()   {
    const form = document.createElement("div");
    form.className = "add-form";

    form.innerHTML = `
      <h2>➕ Add a Movie</h2>
      <div class = "form-group" style="max-width:200px">
          <label>🎬 Title</label>
          <input type="text" id="input-title" placeholder="Movie Title"/>
      </div>   
      <div class="form-group" style="max-width:90px">
        <label>Year</label>
        <input id="input-year" type="number" placeholder="2024" min="1900" max="2099"/>
      </div>
      <div class="form-group" style="max-width:130px">
        <label>Genre</label>
        <select id="input-genre">
          <option value="action">Action</option>
          <option value="drama">Drama</option>
          <option value="comedy">Comedy</option>
          <option value="scifi">Sci-Fi</option>
          <option value="thriller">Thriller</option>
          <option value="animation">Animation</option>
        </select>
      </div>

      <div class="form-group" style="max-width:80px">
        <label>🏆 Rating</label>
        <select id="input-rating">
          <option value="5">★★★★★</option>
          <option value="4">★★★★☆</option>
          <option value="3">★★★☆☆</option>
          <option value="2">★★☆☆☆</option>
          <option value="1">★☆☆☆☆</option>
       </select>
      </div>

      <button class="add-btn" onclick="handleAdd()">Add Movie</button>
    
    `;

    return form;
}

function addMovie(title, year, genre, rating) {
    console.log (title, year, genre, rating);
    const newMovie = {
        id: Date.now(),
        title,
        year: Number(year),
        genre,
        rating: Number(rating),
        watched: false,
    };

    currentMovies = [...currentMovies, newMovie];
    applyFilterAndRender();
}

function handleAdd() {

    const title = document.getElementById("input-title").value.trim();
    const year =
      document.getElementById("input-year").value || new Date().getFullYear();
      const genre = document.getElementById("input-genre").value;
      const rating = document.getElementById("input-rating").value;


      //falsy
      if(!title)
      {
        alert('Please enter a movie title!');
        return;
      }
      addMovie(title, year, genre, rating);
      document.getElementById("input-title").value ="";
}

function deleteMovie(id) {
    currentMovies = currentMovies.filter((movie) => movie.id !== id);
    applyFilterAndRender();
}

function applyFilterAndRender()
{
    let filtered;

    if(activeFilter === "all") {
        filtered = currentMovies;
    }
    else if (activeFilter === "watched") {
        filtered = currentMovies.filter((movie) => movie.watched);
    }
    else{
        filtered = currentMovies.filter((movie) => movie.genre === activeFilter);
    }

    renderMovies(filtered);

}

function renderMovies(movieList)
{
    const app = document.getElementById("app");
    app.innerHTML = "";

    const grid = document.createElement("div");
    grid.className = "movie-grid";

   // for (const movie of movieList)  {
   //     const card = buildCard(movie);
   //     grid.appendChild(card);
   //  }

   const header= document.createElement("div");
   header.className = "app-header";
   header.innerHTML = `
     <h1>🎬 My Movie List</h1>
     <p>${movieList.length} movies in your collection</p>
   `;

   app.appendChild(header);

   const statsBar = document.createElement("div");
   statsBar.className = "stats-bar";
   statsBar.id = "stats-bar";
   app.appendChild(statsBar);

   const form = buildAddForm();
   app.appendChild(form);


   const cards = movieList.map((movie) => buildCard(movie));
   cards.forEach((card) => grid.appendChild(card));

   app.appendChild(grid);
}

applyFilterAndRender();


// VIDEO 2 ── Destructuring, Spread & Immutability
// We'll refactor using destructuring, add/delete movies
// without ever mutating the original array.

// VIDEO 3 ── map / filter / reduce
// We'll build genre filters, a watchlist toggle,
// and a live stats bar.