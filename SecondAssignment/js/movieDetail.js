const movieInfo = document.querySelector('.movieDetail');
const close = document.querySelector('.close');
close.addEventListener('click',() => window.history.back(-1));
function movieDetail() {
    const movieId = sessionStorage.getItem('movieId');
    const movieDetailUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=1a473a4b98e0d356ddaa4cf044b3bead&language=en-US`;
    fetch(movieDetailUrl)
    .then(function (result) {
        return result.json();
    })
    .then(function(movie) {
        console.log(movie);
        //add background
        const backgroundURL = 'https://image.tmdb.org/t/p/w342';
        // const movieBackground = document.createElement('div');
        movieInfo.classList.add('backgroudImg');
        movieInfo.style.backgroundImage = "url(" + backgroundURL + movie.backdrop_path + ")";

        //add cover
        const coverDiv = document.createElement('div');
        coverDiv.classList.add('cover');

        //add containerDiv
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('containerDiv');

        //add left Img
        const leftImg = document.createElement('img');
        leftImg.src = backgroundURL + movie.poster_path;
        leftImg.classList.add('leftImg');

        //add right div
        const rightDiv = document.createElement('div');
        leftImg.classList.add('right');

        //add title
        const movieTitle = document.createElement('h1');
        movieTitle.innerHTML = movie.title;
        console.log(movie.title);
        movieTitle.classList.add('title');

        const ul = document.createElement('ul');
        ul.classList.add('typeMovie');
        ul.classList.add('clearfix');
        //add genres
        for (let i = 0; i < movie.genres.length; ++i) {
            const randomColor = '#'+Math.floor(Math.random()*(2<<23)).toString(16);
            var li = document.createElement('li');
            li.style.background = randomColor;
            li.innerHTML = movie.genres[i].name;
            ul.append(li);
            // console.log(movie.genres[i].name);
        }
        
        //add release-date
        const releaseDate = document.createElement('span');
        const releaseYear = movie.release_date.slice(0, 4);
        releaseDate.innerHTML = `(${releaseYear})`;
        releaseDate.classList.add('release-date');

        // add overview
        const overview = document.createElement('div');
        overview.classList.add('overview');
        overview.innerHTML = movie.overview;

        //add production_companies
        const production_companies = document.createElement('div');
        production_companies.classList.add('production_companies');
        for (let i = 0; i < movie.production_companies.length; ++i) {
            if (movie.production_companies[i].logo_path !== null) {
                console.log(movie.production_companies);
                let productionImg = document.createElement('img');
                productionImg.src = backgroundURL + movie.production_companies[i].logo_path;
                productionImg.classList.add('productionImg');
                production_companies.append(productionImg);
            }
            let production = document.createElement('span');
            production.innerHTML = movie.production_companies[i].name;
            production.classList.add('production');
            production_companies.append(production);
        }

        // movieInfo.append(movieBackground);
        movieInfo.append(coverDiv);
        movieInfo.append(containerDiv);
        containerDiv.append(leftImg);
        containerDiv.append(rightDiv);
        // console.log(movieInfo);
        rightDiv.append(movieTitle);
        movieTitle.append(releaseDate);
        rightDiv.append(ul);
        rightDiv.append(overview);
        rightDiv.append(production_companies);


    })
}

movieDetail();