const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MWVmYjQwYWRkZTRiMDRmMzQ5ZmUxYzA0OTA1MDE5NCIsInN1YiI6IjY1MmY4YmQ0MGNiMzM1MTZmODg1NjQxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lRlQLVRBM90dmi3EV9rLqNMJaFeUhY4LuLAjuf1rEl4'
    }
  };
  
  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => {
        const movies = response.results;
        // printingFunc ->
        const $container = document.querySelector(".card-container");
         AllprintingHtml(movies,$container);
         // SearchMovieFunc ->
         const $searchInput = document.querySelector("#search_movie");
        $searchInput.addEventListener("change",function(){
          searchMovie($searchInput,movies,$container)
        });
    })
    .catch(err => console.error(err));
 













   function AllprintingHtml(movies,container) {
     return  movies.forEach(movie => {
            const element = template(movie)       
            container.append(element)
        });
   }

   function template(element){
        const {title,vote_average,id,overview,release_date,poster_path} = element;
        const div = document.createElement('div');
        div.setAttribute("id",id)
        div.setAttribute("class","card");
     registEvent(div);
       div.innerHTML =  
          `
        <div class="card-imgBox">
            <img src=https://image.tmdb.org/t/p/w500${poster_path} alt="">
        </div>
        <div class="card-head">
            <h4 class="card-title">${title}</h4>
        </div>
        <div class="card-body">
            <p class="card-text">
                ${overview}
            </p>
        </div>
        <div class="card-footer">
        <p class="movie-birth">${release_date}</p>
            <p class="movie-rating">Rating ${vote_average}</p>
        </div>
        `
        return div
   }

   function registEvent(eventTarget) {
    eventTarget.addEventListener("click",function(){
      registEventFunc(eventTarget)
    })
   }

   function registEventFunc(eventTarget){
    alert(`영화의 ID : ${eventTarget.id}`);
   }

   function removeEvent(eventTarget,func) {
    const targets = eventTarget.children;
    for(let target of targets ) {
        target.removeEventListener("click",func)
        console.log(target)
    }
   }



   function searchMovie(input,movies,container){
    !input.value?.trim() ? insepectValue(input.value) : newPrintingHtml(input.value,movies,container)
    }

 function insepectValue(value){
        const preValue = value
        const $currentValue = document.querySelector("#search_movie").value;
        console.log($currentValue)
        console.log(preValue)
        // input.value !== $currentValue ? 
    
 }

 function newPrintingHtml(str,movies,container){
  //인풋의 value 값과 movies의 text를 filter로 비교
     const value = str.toLowerCase();
     const searchTargets = movies.filter(target =>{
         const title = target.title.toLowerCase();
         return title.includes(value);
     });

     //아무거 쳐버려서 필터 배열없으면 없는디 띄우기
     if(searchTargets.length === 0) return alert("없는디");

     // 필터 배열에 뭐 잇음 실행하기
     removeEvent(container, registEventFunc)
     container.innerHTML = '';
     AllprintingHtml(searchTargets,container);
 }

    
