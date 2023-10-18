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
        console.log(response.results[0])
        
        const promise = new Promise((resolve,reject)=>{
            const cardContainer = document.querySelector(".card-container");
            const dataArray = response.results;
            const isTheEnd = dataArray.length -1 ;
            dataArray.forEach((el,i) => {
                const template =
                `
                <div class="card" id=${el.id}>
                <div class="card-imgBox">
                    <img src=https://image.tmdb.org/t/p/w500${el.poster_path} alt="">
                </div>
                <div class="card-head">
                    <h4 class="card-title">${el.title}</h4>
                </div>
                <div class="card-body">
                    <p class="card-text">
                        ${el.overview}
                    </p>
                </div>
                <div class="card-footer">
                <p class="movie-birth">${el.release_date}</p>
                    <p class="movie-rating">Rating ${el.vote_average}</p>
                </div>
            </div>
                `
                cardContainer.insertAdjacentHTML('beforeend',template)
                if(i === isTheEnd) resolve();
            });
        })
        return promise
    })
    .then(()=>{

        // input의 value에 공백 대소문자를 => 공백 없애고, 대소문자 그냥 소문자로 인식 시키자. 

        // 공백없애기

        // cardstitle의 공백 대소문자를 => 공백 없애고, 대소문자를 그냥 소문자로 인식 시키자.
        const searchInput = document.querySelector("#search_movie");
        const cards = document.querySelectorAll(".card");
        const cardsTitle = document.querySelectorAll(".card-title");
        const searchBtn = document.querySelector("#serach_btn");
        const checkText = new RegExp(/\s/g)
        const textArr = [];
        cardsTitle.forEach(el => {
          const item = el.textContent.replace(checkText, "").toLowerCase();
          textArr.push(item)
        })
        searchBtn.addEventListener("click",(e)=>{
            e.preventDefault();
            let count =0;
          const inputText =  searchInput.value.replace(/\s/g,'').toLowerCase();
            textArr.forEach((a,i)=>{
                if(!a.match(inputText)){
                    cards[i].style.display = 'none';
                    count++;
                }
            })

            if(count === cards.length) {
                alert("똑디 쳐라 문희화낸다")
                cards.forEach(a=>{
                    a.style.display = 'block'
                })
            }
        })
        
        cards.forEach(el=>{
            el.addEventListener("click",function(e){
                alert(`문희의 최애 영화 아이디는 : ${el.id}`)
            })
        })

        console.log(cards)



        searchInput.addEventListener("change" ,function(e){
            let count = 0;
            e.preventDefault()
            const inputText = this.value.replace(/\s/g,'').toLowerCase();
            textArr.forEach((a,i)=>{
                if(!a.match(inputText)){
                    cards[i].style.display = 'none';
                    count++;
                } 
                
            })
            if(this.value ==='') {
                
                cards.forEach(a=>{
                    a.style.display = 'block'
                })
            } 

            if(count === cards.length) {
                alert("똑디 쳐라 문희화낸다")
                cards.forEach(a=>{
                    a.style.display = 'block'
                })
            }
        })
    })
    .catch(err => console.error(err));
