let URL = "http://universities.hipolabs.com/search?name=a"

const main = document.getElementById('list-container')

const whishSet = new Set();
/*
let response = fetch(URL)
.then(res => res.json())

.then(data => console.log(data))
.catch(error => console.log("error"))*/

function fillingHtml() {
    universities().then((re) => {
        /*console.log(typeof (re))
        console.log(re)
        let univ = ""*/
        /*for (let i = 0; i < re.length; i++) {
            univ += `<div class="university">
                     <p>${JSON.stringify(re[i]["name"])}</p>
                     <a href="${(re[i]["web_pages"])}">${JSON.stringify(re[i]["web_pages"])}</a>
                     <p>${JSON.stringify(re[i]["country"])} ${JSON.stringify(re[i]["alpha_two_code"])}</p>
                    
                     </div>`
        }
        main.innerHTML = univ*/

        const listContainer = document.getElementById("list-container")
        for (let i = 0; i < re.length; i++) {
            const universityDiv = document.createElement("div")
            universityDiv.classList.add("university")

            const nameParagraph = document.createElement("p")
            nameParagraph.textContent = JSON.stringify(re[i]["name"])
            universityDiv.appendChild(nameParagraph)

            const webPagesLink = document.createElement("a")
            webPagesLink.href = re[i]["web_pages"]
            webPagesLink.textContent = JSON.stringify(re[i]["web_pages"])
            universityDiv.appendChild(webPagesLink)

            const countryAndCodeParagraph = document.createElement("p")
            countryAndCodeParagraph.textContent = JSON.stringify(re[i]["country"]) + " " + JSON.stringify(re[i]["alpha_two_code"])
            universityDiv.appendChild(countryAndCodeParagraph)

            const addItemButton = document.createElement("button")



            addItemButton.textContent = "Add to whishlist !"

            addItemButton.addEventListener("click", () => {

                whishSet.add(re[i])
                localStorage.setItem("whishSet", JSON.stringify(Array.from(whishSet)))
                console.log("clicked")

                addItemButton.disabled = true
                addItemButton.textContent = "Added to your whishlist 😊"

            })


            universityDiv.appendChild(addItemButton)

            listContainer.appendChild(universityDiv)
        }

    })
}
fillingHtml()

async function universities() {
    const response = await fetch(URL)
    const unis = await response.json()

    return unis;
}
document.addEventListener('DOMContentLoaded', function () {

    let searchBtn = document.getElementById("search-btn")
    console.log(searchBtn)


    searchBtn.addEventListener("click", function () {
        let searchInput = document.getElementById("my-input").value
        console.log("U are in the function")
        URL = `http://universities.hipolabs.com/search?name=${searchInput}`
        main.innerHTML=""
        fillingHtml()
    })

   
});
function myFunction() {
    console.log("Yooo")
    let x = document.getElementById("side-filter").value
    URL = `http://universities.hipolabs.com/search?country=${x}`
    main.innerHTML=""
    fillingHtml()
}