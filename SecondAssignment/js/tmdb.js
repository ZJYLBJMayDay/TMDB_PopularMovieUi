var movieList = null;
var page = 1;
var url = "https://api.themoviedb.org/3/movie/popular?api_key=1a473a4b98e0d356ddaa4cf044b3bead&language=en-US&page=";
var pageChange = document.querySelector('.pageNumber');

let likeListA = document.querySelector('.likeListA');
likeListA.addEventListener('click', () => showLikeList());
let movieDisplayList = document.querySelector('.movieList');
let likeMovie = document.querySelector('.likedList');
let movieListA = document.querySelector('.movieListA');
let likeMovieList = document.querySelector('.likeMovieDiv');
let popularMovieDiv = document.querySelector('.popularMovieDiv');
let config = document.querySelector('.config');
let likedListUl = document.querySelector('.likeMovieUl');

var likeList = document.querySelector('.likedList');
var countNumber = document.querySelector('.countNumber');
var count = 0;
var selectedMovie = [];

var configDiv = document.querySelector('.configDiv');
var bodyDiv = document.querySelector('.bodyDiv');
var configUl = document.querySelector('.configUl');

var localMovieIdString = localStorage.getItem('movieIdArray');
var localMovieId = JSON.parse(localMovieIdString);

var close = document.querySelector('.close');
// console.log(close);

function movieFetch(url,page) {
    url = url + page;
    fetch(url)
    .then(function (result) {
        return result.json();
    })
    .then(function(data) {
        // console.log(data);
        movieList = data.results;
        var getLi = document.querySelector('.movieUl').children;      
        for (let i = 0; i < movieList.length; ++i) {
            getLi[i].children[0].addEventListener('click',() => movieLikeSelected(movieList[i].id));
            getLi[i].children[1].src = `https://image.tmdb.org/t/p/w185/${movieList[i].poster_path}`;
            getLi[i].children[2].innerHTML = movieList[i].title;
            getLi[i].children[3].innerHTML = movieList[i].release_date;
            
            getLi[i].children[1].addEventListener('click',() => movieSelected(movieList[i].id));
        }
    });  
}

if (sessionStorage.getItem('flagLikeMovie')) {
    countNumber.innerHTML = sessionStorage.getItem('countNumber');
    likeMovie.style.display = 'block';
    showLikeList();
    sessionStorage.removeItem('flagLikeMovie');
}
else {
    movieFetch(url,page);
}

// console.log(page);
// next page
var nextButton = document.querySelector('.nextButton');
nextButton.addEventListener('click',() => {
    if (page < 500) {
        ++page;
        prevButton.removeAttribute('disabled');
        prevButton.innerHTML= 'previous';
        pageChange.innerHTML = 'Page' + page + '/Total 500 of 10000 results';
    }
    movieFetch(url,page);
    console.log('nextpage:' +page);
});

//prev page
var prevButton = document.querySelector('.prevButton');
prevButton.addEventListener('click',() => {
    // if (page = 1) {
    //     prevButton.setAttribute('disabled','true');
    // }
    if (page > 1) {
        --page;
        pageChange.innerHTML = 'Page' + page + '/Total 500 of 10000 results';
    }
    movieFetch(url,page);
    if (page == 1) {
        prevButton.setAttribute('disabled','true');
        prevButton.innerHTML= 'no more';
    }
});

const movieSelected = (id) => {
    sessionStorage.setItem('movieId',id);
    window.location = 'movieDetail.html';
    // movieDetail();
}

const movieDetailSelected = (id,flagLikeMovie) => {
    sessionStorage.setItem('movieId',id);
    sessionStorage.setItem('flagLikeMovie',flagLikeMovie);
    window.location = 'movieDetail.html';
    // movieDetail();
}

let movieIdArray = [];
const movieLikeSelected = (movieLikeId) => {
    let flagId = movieIdArray.indexOf(movieLikeId);
    // console.log(flagId);
    if (flagId === -1) {
        movieIdArray.push(movieLikeId);
    }
    localStorage.setItem('movieIdArray',JSON.stringify(movieIdArray));
    // console.log(movieIdArray);
    movieSelectedLike(movieLikeId);
}


// console.log(selectedMovie);
function movieSelectedLike(movieLikeId) {
    // console.log(movieLikeId);
    // console.log(selectedMovie);
    likeList.style.display = 'block';
    let flag = selectedMovie.indexOf(movieLikeId);
    // console.log(flag);
    if (selectedMovie.length === 0) {
        selectedMovie.push(movieLikeId);
        countNumber.innerHTML = ++count;
    }
    else if (flag === -1) {
        selectedMovie.push(movieLikeId);
        countNumber.innerHTML = ++count;
    }else {
        
    }
    sessionStorage.setItem('countNumber',count);
    // countNumber.style.display = 'block';
    // console.log(selectedMovie);
    // movieLikeId.stopPropagation();
}


function showLikeList() {
    movieListA.style.borderBottom = 'none';
    likeListA.style.display = 'block';
    likeListA.style.borderBottom = '3px solid red';
    popularMovieDiv.style.display = 'none';
    likeMovieList.style.display = 'block';
    config.style.display = 'block';
    let flagLikeMovie = true;
    // if (flagLikeMovie === "true") {
        for (let i = 0; i < localMovieId.length; ++i) {
            console.log(localMovieId.length);
            const movieDetailUrl = `https://api.themoviedb.org/3/movie/${localMovieId[i]}?api_key=1a473a4b98e0d356ddaa4cf044b3bead&language=en-US`;
            fetch(movieDetailUrl)
            .then(function (result) {
                return result.json();
            })
            .then(function(movie) {
                const getLi = document.createElement('li');
    
                const img = document.createElement('img');
                const backgroundURL = 'https://image.tmdb.org/t/p/w342';
                // const movieBackground = document.createElement('div');
                // img.classList.add('backgroudImg');
                img.src = backgroundURL + movie.poster_path;
                img.addEventListener('click',() => movieDetailSelected(movie.id,flagLikeMovie));
    
                const firstP = document.createElement('p');
                firstP.innerHTML = movie.title;
               
    
                const SecondP = document.createElement('p');
                SecondP.innerHTML = movie.release_date;
    
                likedListUl.append(getLi);
                getLi.append(img);
                getLi.append(firstP);
                getLi.append(SecondP);
    
            })
        }
    // }
    // sessionStorage.setItem('flagLikeMovie',false);
    
}

movieListA.addEventListener('click', () => showMovieList());


function showMovieList() {
    movieFetch(url,page);
    // movieListA.style.borderBottom = 'block';
    movieListA.style.borderBottom = '3px solid red';
    popularMovieDiv.style.display = 'block';
    likeMovieList.style.display = 'none';
    likeListA.style.borderBottom = 'none';
    likedListUl.innerHTML = '';
}


config.addEventListener('click', () => showConfig());
function showConfig() {
    bodyDiv.style.display = 'none';
    configDiv.style.display = 'block';
    
    for (let j = 0; j < localMovieId.length; ++j) {
        const movieDetailUrl = `https://api.themoviedb.org/3/movie/${localMovieId[j]}?api_key=1a473a4b98e0d356ddaa4cf044b3bead&language=en-US`;
        fetch(movieDetailUrl)
        .then(function (result) {
            return result.json();
        })
        .then(function(movie) {

            let configLi = document.createElement('li');
            configLi.innerHTML = movie.title;
            configLi.setAttribute('draggable','true');
            // configLi.addEventListener('click',() => dragLi());
            configUl.append(configLi);
        })
    }
}

// function dragLi() {

// }


configUl.ondragover = function (event) {
    event.preventDefault();
};

//Store the dragged element
var draging; 
configUl.ondragstart = function (event) {
    draging = event.target;
}
configUl.ondrop = function (event) {
//store target
var target = event.target; 
if (target.nodeName === "LI" && target !== draging) {       
    if (getIndex(draging) < getIndex(target)) {
        target.parentNode.insertBefore(draging, target.nextSibling);
    } else {
        target.parentNode.insertBefore(draging, target);
    }
}
};
// get current index
function getIndex(el) {
    var index = 0;
    if (!el || !el.parentNode) {
        return -1;
    }
    while (el = el.previousElementSibling) {
        index++;
    }
    return index;
}

close.addEventListener('click', () => closeConfig());

function closeConfig() {
    bodyDiv.style.display = 'block';
    configDiv.style.display = 'none';
    // countNumber.innerHTML = sessionStorage.getItem('countNumber');
    // likeMovie.style.display = 'block';
    showLikeList();
}