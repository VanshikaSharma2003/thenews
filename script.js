const API_KEY="a2867ff1b507415ba1ba1690395f8b0a";
//const url = "https://newsapi.org/v2/everything?q=tesla&from=2023-06-16&sortBy=publishedAt&apiKey=a2867ff1b507415ba1ba1690395f8b0a";
const url ="https://newsapi.org/v2/everything?q=";

//jaise hi window load ho hum news fetch krle 
window.addEventListener('load', ()=> fetchNews("India"));

//if we want ki logo pe click ho to website reload ho jaye / home page pe chli jaye
function reload(){
    window.location.reload();
}

async function fetchNews(query){
    // fetch(`${url}${query}&apiKey=${API_KEY}`);

    //we will promise await bcoz news api key se aari hai to it will take time
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    //const res=await fetch(url);

    //jo bhi response milega use json form me convert krenge 
    const data = await res.json();
    console.log(data);
    //basically bindData me jitne bhi articles aare honge unhe hum bind krenge
    bindData(data.articles);
}

function bindData(articles){
    //jitne articles aare honge hume utne hi template ke clone bnane hai or use container me append krna hai 
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    //container ka inner html set kr denge 
    cardsContainer.innerHTML='';
    //agar hum aisa nhi krenge to agr phle api call ki to 100 cards dalenge , lekin agar dubara api call ki to dubara 100 cards dall jayenge 

    articles.forEach(article =>{
        //agar kisi article me image nhi aari hai to whi se return
        if(!article.urlToImage) return;

        //now we will make clone
        //this means ki card ke andar jitni bhi cheeze hai saari clone ho jaani chahiye
        const cardClone = newsCardTemplate.content.cloneNode(true);

        fillDataInCard(cardClone, article)
        
        //clone bann gya hai to ab ise dalenge cardcontainer ke andar
        cardsContainer.appendChild(cardClone);

    })

}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLoacaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} : ${date}`;
    //yhaa tk ke code me pura front page ready with proper news iske baad ab ye manage krna hai ki kisi bhi news pe click krenge to ky hoga 

    //jab bhi kisi event pe click hoga to window.open or phir article.url pe jana hai, and then blank which means new tab
    cardClone.firstElementChild.addEventListener("click", () =>{
        window.open(article.url, "_blank");
    });
}

//JAB NAVBAR KE ITEMS PE CLICK KRENGE
let curSelectedNav = null;
function onNavItemClick(id){
    //sbse phle news fetch krni hai or fetchNews wla function news ko bhi fetch krega or data ko bind bhi kr dega 
    fetchNews(id);
    const navItem = document.getElementById(id);

    //jab aapne kisi naye navItem pe click kiya to purane wle navItem me se active class ko remove krdo 
    curSelectedNav?.classList.remove('active');
    //or ab jo current item hai vo bann jayega curr nav item
    curSelectedNav = navItem;
    //then jo naya navItem hai usme add krdo active class 
    curSelectedNav.classList.add('active');
}
//SEARCH BAR PE JB SEARCH KRENGE 
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", ()=>{
    //sbse phle searchText me se query bhaar nikalenge 
    const query = searchText.value;

    //agr user ne khuch bhi nhi likha or bss buton hit kr dia to return ho jayenge 
    if(!query) return;

    //phir hum newsFetch krenge jo query aai hai uske according
    fetchNews(query);

    //or jab aise news fetch hori hai to jo nav me curr selected item hai use null krna hai 
    curSelectedNav?.classList.remove("active");
    curSelectedNav=null;
})


