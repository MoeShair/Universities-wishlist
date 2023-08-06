let URL = "http://universities.hipolabs.com/search?name=palestine"

const main = document.getElementById('main')
/*
let response = fetch(URL)
.then(res => res.json())

.then(data => console.log(data))
.catch(error => console.log("error"))*/

function fillingHtml(){
    universities().then((re) => {
        console.log(typeof (re))
        console.log(re)
        let univ = ""
        for (let i = 0; i < re.length; i++) {
            univ += `<div class="university">
                     <p>${JSON.stringify(re[i]["name"])}</p>\
                     <a href="${(re[i]["web_pages"])}">${JSON.stringify(re[i]["web_pages"])}</a>
                     <p>${JSON.stringify(re[i]["country"])} ${JSON.stringify(re[i]["alpha_two_code"])}</p>
                     </div>`
        }
        main.innerHTML = univ
    
    })
}
fillingHtml()

async function universities() {
    const response = await fetch(URL)
    const unis = await response.json()

    return unis;
}
document.addEventListener('DOMContentLoaded', function() {

    let searchBtn = document.getElementById("search-btn")
    console.log(searchBtn)


    searchBtn.addEventListener("click", function() {
        let searchInput = document.getElementById("my-input").value
        console.log("U are in the function")
        URL = `http://universities.hipolabs.com/search?name=${searchInput}`
        fillingHtml()
    })
});
