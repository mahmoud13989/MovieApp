const config = {
  async fetchData(searchItem){
      const response = await axios.get('http://www.omdbapi.com/',{
        params:{
          apikey : '2517883a',
          s : searchItem
        }
      })
      if (response.data.Error)
          return [];
        return response.data.Search;
  },
  renderOption(movie){
    const imgSrc = movie.Poster === 'N/A'? '' : movie.Poster;
    return`
      <img src="${imgSrc}"> 
      ${movie.Title} 
      ${movie.Year}
    `
  },
  inputValue(movie){
    return movie.Title;
  },
}

createAutoComplete({
  root:document.querySelector('#right-autocomplete'),
  ...config,
  onOptionSelect(movie){
    onMovieSelect(movie,document.querySelector('#right-summery'),'right');
  },

})

createAutoComplete({
 root:document.querySelector('#left-autocomplete'),
  ...config,
  onOptionSelect(movie){
    onMovieSelect(movie,document.querySelector('#left-summery'),'left');
    document.querySelector('.tutorial').classList.add('is-hidden');
  },
})
let rightMovie ,leftMovie;
const onMovieSelect= async(movieDetail,targetSummery,side)=>{
    const response = await axios.get('http://www.omdbapi.com/',{
      params:{
        apikey : '2517883a',
        i : movieDetail.imdbID
      }
    })
    const keys = [];
    for (let key of Object.keys(response.data))
      keys.push(key);
    if (side === 'left')
        leftMovie = response.data;
    else
    rightMovie = response.data;
  targetSummery.innerHTML = movieTemplate(response.data);
    if (leftMovie && rightMovie)
        runComparison();
  
}

const runComparison =()=>{
  const leftSideStat = document.querySelector('#left-summery').querySelectorAll('.notification');
  const rightSideStat = document.querySelector('#right-summery').querySelectorAll('.notification');
  leftSideStat.forEach((leftSide,index)=>{
    rightSide = rightSideStat[index];
    const leftSideValues = parseInt(leftSide.dataset.value) 
    const rightSideValues = parseInt(rightSide.dataset.value)
    if (leftSideValues < rightSideValues){
      leftSide.classList.remove('is-primary');
      leftSide.classList.add('is-warning');
    }
    else{
      rightSide.classList.remove('is-primary');
      rightSide.classList.add('is-warning')
    }
  })
}
const movieTemplate = (movie)=>{
      const dollars = parseInt(movie.BoxOffice.replace(/\$/g,'').replace(/,/g,''));
      const awards  = movie.Awards.split(' ').reduce((prev,next)=>{
            const value = parseInt(next)
              if (isNaN(value))
                  return prev;
                else
                return prev + next ;
      },0)
      const metaScore = parseInt(movie.Metascore);
      const rates = parseFloat(movie.imdbRating);
      const votes = parseInt(movie.imdbVotes.replace(/,/g,''));
    return`
      <article class="media">
        <figure class="media-left">
          <p class="image">
              <img src = "${movie.Poster}">
          </p>
        </figure>
        <div class="media-content">
        <div class="content">
        <h1>${movie.Title}</h1>
        <h4>${movie.Genre}</h4>
        <p>${movie.Plot}</p>
      </div>
        </div>
      </article>
      <article  data-value = ${awards} class="notification is-primary">
        <p class"title">${movie.Awards}</p>
        <p class="subtitle">Movie Awards</p>
      </article>
      <article data-value = ${metaScore} class="notification is-primary">
        <p class"title">${movie.Metascore}</p>
        <p class="subtitle">Movie Metascore</p>
      </article>
      <article data-value=${dollars} class="notification is-primary">
        <p class"title">${movie.BoxOffice}</p>
        <p class="subtitle">Box Office</p>
      </article>
      <article data-value = ${rates} class="notification is-primary">
        <p class"title">${movie.imdbRating}</p>
        <p class="subtitle">Rates</p>
      </article>
      <article data-value= ${votes} class="notification is-primary">
        <p class"title">${movie.imdbVotes}</p>
        <p class="subtitle">Movie Votes</p>
      </article>
    `
}























// const autoCompleteConfig = {
//   async fetchData(searchItem) {
//     const url = 'http://www.omdbapi.com/';
//     const myKey = '2517883a';
//     const response = await axios.get(url, {
//       params: {
//         apikey: myKey,
//         s: searchItem
//       }
//     })
//     if (response.data.error)
//       return [];
//     return response.data.Search;
//   },
//   inputValue(movie) {
//     return movie.Title;
//   },
//   renderOption(movie) {
//     const space = '&nbsp;';
//     const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
//     return `
//     <img src=" ${imgSrc}">
//     <b>${movie.Title}</b>${space}
//     <b>${movie.Year}</b>
//     `
//   }
// }

// createAutoComplete({
//   root: document.querySelector('#left-autocomplete'),
//   ...autoCompleteConfig,
//   onOptionSelect(movie) {
//     document.querySelector('.tutorial').classList.add('is-hidden')
//     onMovieSelect(movie, document.querySelector('#left-summery'), 'left');
//   }
// })


// createAutoComplete({
//   root: document.querySelector('#right-autocomplete'),
//   ...autoCompleteConfig,
//   onOptionSelect(movie) {
//     document.querySelector('.tutorial').classList.add('is-hidden')
//     onMovieSelect(movie, document.querySelector('#right-summery'), 'right');
//   }
// })
// createAutoComplete({
//   root: document.querySelector('#mid-autocomplete'),
//   ...autoCompleteConfig,
//   onOptionSelect(movie) {
//     document.querySelector('.tutorial').classList.add('is-hidden')
//     onMovieSelect(movie, document.querySelector('#mid-summery'), 'mid');
//   }
// })


// let leftMovie;
// let rightMovie;
// let midMovie;

// const onMovieSelect = async (movie, summeryTarget, side) => {
//   const url = 'http://www.omdbapi.com/';
//   const myKey = '2517883a';
//   const response = await axios.get(url, {
//     params: {
//       apikey: myKey,
//       i: movie.imdbID
//     }
//   })
//   if (side === 'left')
//       leftMovie = response.data;
//     else if (side === 'right')
//       rightMovie = response.data;
//     else
//       midMovie = response.data;
//   if (leftMovie && rightMovie && midMovie)
//     runComparison();

//   summeryTarget.innerHTML = movieTemplate(response.data);
// }

// const runComparison = () => {
//   const leftSideStats = document.querySelectorAll('#left-summery .notification')
//   const rightSideStats = document.querySelectorAll('#right-summery .notification');
//   const midtSideStats = document.querySelectorAll('#mid-summery .notification');
//   leftSideStats.forEach((leftStat, index) => {
//     const rightStat = rightSideStats[index];
//     const midStat = midtSideStats[index];
   
//     const leftSideValue = leftStat.dataset.value;
//     const midSideValue = midStat.dataset.value;
//       if (midSideValue < leftSideValue){
//         midStat.classList.remove('is-primary')
//         midStat.classList.add('is-warning');
//       }
//       else{
//         leftStat.classList.remove('is-primary')
//         leftStat.classList.add('is-warning');
//       }

//   })
// }


// const movieTemplate = (movieDetail) => {
//   const dollars = parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, ''))
//   const metascore = parseInt(movieDetail.Metascore);
//   const imdbRating = parseFloat(movieDetail.imdbRating);
//   const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''))
//   const awards = movieDetail.Awards.split(' ').reduce((prev, word) => {
//     const value = parseInt(word);
//     if (isNaN(value)) {
//       return prev;
//     }
//     else
//       return prev + value;
//   }, 0)
//   return `
//       <article class = "media">
//         <figure class = "media-left">
//           <p class = "image">
//             <img src = "${movieDetail.Poster}" />
//           </p>
//         </figure>
//         <div class = "media-content">
//           <div class ="content">
//             <h1>${movieDetail.Title}</h1>
//             <h4>${movieDetail.Genre}</h4>
//             <p>${movieDetail.Plot}</p>
//           </div>
//         </div>
//       </article>
//       <article data-value=${awards} class ="notification  is-primary">
//         <p class="title">${movieDetail.Awards}</p>
//         <p class="subtitle">Awards</p>
//       </article>
//       <article data-value=${dollars} class ="notification  is-primary">
//         <p class="title">${movieDetail.BoxOffice}</p>
//         <p class="subtitle">Box Office</p>
//       </article>
//       <article data-value=${metascore} class ="notification  is-primary">
//         <p class="title">${movieDetail.Metascore}</p>
//         <p class="subtitle">Metascore</p>
//       </article>
//       <article data-value=${imdbRating} class ="notification  is-primary">
//         <p class="title">${movieDetail.imdbRating}</p>
//         <p class="subtitle">IMDB Rating</p>
//       </article>
//       <article data-value=${imdbVotes} class ="notification  is-primary">
//         <p class="title">${movieDetail.imdbVotes}</p>
//         <p class="subtitle">IMDB Votes</p>
//       </article>
//     `
// }















