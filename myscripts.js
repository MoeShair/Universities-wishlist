let URL = "http://universities.hipolabs.com/search?name=a"

const listContainer = document.getElementById('list-container')

let whishSet = ''

if (localStorage != null) {
    whishSet = new Set(JSON.parse(localStorage.getItem("whishSet")));
}
else {
    whishSet = new Set();
}

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
        listContainer.innerHTML = univ*/

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
        listContainer.innerHTML = ""
        fillingHtml()
    })


});
function myFunction() {
    console.log("Yooo")
    let x = document.getElementById("side-filter").value
    URL = `http://universities.hipolabs.com/search?country=${x}`
    listContainer.innerHTML = ""
    fillingHtml()
}

function tablepage() {

    console.log("memmememeemmememe")
    document.getElementById("main").removeChild(listContainer)
    const sideNav = document.getElementsByClassName('side-nav')[0]
    document.getElementById("main").removeChild(sideNav);
    //document.getElementById("side-nav").innerHTML = ""
    document.getElementById("page2").style.color = "red"
    tableContainer = document.createElement("div");
    tableContainer.id = "table-container";

    const tablee = document.createElement("table")

    const headerRow = document.createElement("tr")

    const tableheader = document.createElement("th")
    tableheader.textContent = "Name"
    headerRow.appendChild(tableheader)

    const tableheader1 = document.createElement("th")
    tableheader1.textContent = "Country"
    headerRow.appendChild(tableheader1)

    const tableheader2 = document.createElement("th")
    tableheader2.textContent = "Checked"
    headerRow.appendChild(tableheader2)

    const tableheader3 = document.createElement("th")
    tableheader3.textContent = "Remove"
    headerRow.appendChild(tableheader3)

    tablee.appendChild(headerRow)

    tableContainer.appendChild(tablee)
    document.getElementById("main").appendChild(tableContainer);

    let tableItems = JSON.parse(localStorage.getItem("whishSet"))
    for (let i = 0; i < tableItems.length; i++) {
        console.log("yoo")
        let tableRow = document.createElement("tr")

        let td = document.createElement("td")
        td.textContent = tableItems[i]['name']
        tableRow.appendChild(td)

        let td1 = document.createElement("td")
        td1.textContent = tableItems[i]['country']
        tableRow.appendChild(td1)

        let td2 = document.createElement("td")
        let Checked = document.createElement("button")
        Checked.textContent = "check"
        td2.appendChild(Checked)
        tableRow.appendChild(td2)

        let td3 = document.createElement("td")
        let remove = document.createElement("button")
        remove.textContent = "remove"
        td3.appendChild(remove)
        tableRow.appendChild(td3)


        tablee.appendChild(tableRow)

        remove.addEventListener("click", () => {
            tablee.removeChild(tableRow)
            tableItems.splice(i, 1)
            localStorage.setItem("whishSet", JSON.stringify(tableItems))
        })
        Checked.addEventListener("click", ()=>{
            tableRow.style.backgroundColor = "green"
            Checked.disabled = "true"
            Checked.textContent = "checked 😊"
        })
    }
}
