let controller = new AbortController();
let signal = controller.signal;
let URL = "http://universities.hipolabs.com/search"
let listContainer;


let whishSet = ''

if (localStorage != null) {
    whishSet = new Set(JSON.parse(localStorage.getItem("whishSet")))
}
else {
    whishSet = new Set()
}

class ListContainer {
    buildListContainer() {
        const listContainer = document.createElement("div")
        listContainer.id = "list-container"

        main.appendChild(listContainer)
    }

    clear() {
        this.innerHTML = ""
    }
}

class Header {
    buildHeader() {
        const header = document.createElement("header")
        header.className = "header"

        const headerContainer = document.createElement("div")
        headerContainer.className = "x-container"

        const h1 = document.createElement("h1")
        h1.className = "h1-style"
        h1.textContent = "Universities Whishlist"

        const ul = document.createElement("ul")
        ul.className = "nav-items"

        const li1 = document.createElement("li")
        li1.className = "active-page"
        const a1 = document.createElement("a")
        a1.href = "./index.html"
        a1.textContent = "Universities List"
        li1.appendChild(a1)

        const li2 = document.createElement("li")
        const a2 = document.createElement("a")
        a2.href = "#top"
        a2.id = "page2"
        a2.textContent = "Your Whishlist"
        a2.onclick = tablepage
        li2.appendChild(a2)

        ul.appendChild(li1)
        ul.appendChild(li2)

        headerContainer.appendChild(h1)
        headerContainer.appendChild(ul)

        header.appendChild(headerContainer)
        root.appendChild(header)
    }
}

class SideNav {
    buildSideNav() {
        const main = document.createElement("main")
        main.id = "main"

        const sideNav = document.createElement("div")
        sideNav.className = "side-nav"

        const formContainer = document.createElement("div")
        formContainer.className = "x-container"

        const form = document.createElement("form")
        form.id = "myform"
        form.autocomplete = "off"

        const input = document.createElement("input")
        input.type = "search"
        input.id = "my-input"
        input.addEventListener("input", function () {
            autocomp(this.value);
        });

        input.placeholder = "Search for names.."


        const button = document.createElement("button")
        button.id = "search-btn"
        button.onclick = findUni
        button.textContent = "search"

        form.appendChild(input)
        form.appendChild(button)

        const select = document.createElement("select")
        select.id = "side-filter"
        select.onchange = myFunction

        const options = ["All", "United Kingdom", "United States", "Canada", "Germany"]
        options.forEach((optionText) => {
            const option = document.createElement("option")
            option.textContent = optionText
            select.appendChild(option)
        });

        formContainer.appendChild(form)
        formContainer.appendChild(select)
        sideNav.appendChild(formContainer)

        main.appendChild(sideNav)

        const footer = document.createElement("footer")
        footer.className = "footer"

        // Append all elements to the body
        let root = document.getElementById("root")

        root.appendChild(main)
        root.appendChild(footer)
    }
}

class Card {
    constructor(name, web_pages, country, alpha_two_code) {
        this.name = name
        this.web_pages = web_pages
        this.country = country
        this.alpha_two_code = alpha_two_code
    }

    buildCard() {

        const universityDiv = document.createElement("div")
        universityDiv.classList.add("university")

        const nameParagraph = document.createElement("p")
        nameParagraph.textContent = JSON.stringify(this.name)
        universityDiv.appendChild(nameParagraph)

        const webPagesLink = document.createElement("a")
        webPagesLink.href = this.web_pages
        webPagesLink.textContent = JSON.stringify(this.web_pages)
        universityDiv.appendChild(webPagesLink)

        const countryAndCodeParagraph = document.createElement("p")
        countryAndCodeParagraph.textContent = JSON.stringify(this.country) + " " + JSON.stringify(this.alpha_two_code)
        universityDiv.appendChild(countryAndCodeParagraph)

        const addItemButton = document.createElement("button")



        addItemButton.textContent = "Add to whishlist !"

        addItemButton.addEventListener("click", () => {
            console.log(whishSet)
            whishSet.add(this)
            localStorage.setItem("whishSet", JSON.stringify(Array.from(whishSet)))
            console.log("clicked")

            addItemButton.disabled = true
            addItemButton.textContent = "Added to your whishlist 😊"


        })



        universityDiv.appendChild(addItemButton)

        listContainer.appendChild(universityDiv)

    }
}



class Page2 {
    buildPage2() {
        document.getElementById("main").removeChild(listContainer)
        const sideNav = document.getElementsByClassName('side-nav')[0]
        document.getElementById("main").removeChild(sideNav);
        //document.getElementById("side-nav").innerHTML = ""
        document.getElementById("page2").style.color = "red"
        let tableContainer = document.createElement("div");
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
        document.getElementById("main").appendChild(tableContainer)

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
            Checked.addEventListener("click", () => {
                tableRow.style.backgroundColor = "green"
                Checked.disabled = "true"
                Checked.textContent = "checked 😊"
            })
        }
    }
}

function buildHTML() {
    const pageHeader = new Header()
    pageHeader.buildHeader()

    const pageSideNav = new SideNav()
    pageSideNav.buildSideNav()

    const x = new ListContainer()
    x.buildListContainer();
    listContainer = document.getElementById('list-container')


    fillingHtml(URL)

}

let autoCompleteArray = []

buildHTML()




function fillingHtml(URL) {
    listContainer.innerHTML = "loading ....."
    universities(URL).then((re) => {
        /*------------------------------------------------------------------------------------*/
        const dataList = document.createElement("datalist");
        dataList.id = "autocomplete-options";

        let input = document.getElementById("my-input")
        /*------------------------------------------------------------------------------------*/
        listContainer.innerHTML = ""

        
        autoCompleteOptions = []
        for (let i = 0; i < re.length; i++) {

            let card = new Card(re[i]["name"], re[i]["web_pages"], re[i]["country"], re[i]["alpha_two_code"])
            setTimeout(()=>{
                card.buildCard()
            }, 10 * i)
           

            // autoCompleteOptions.push(re[i]["name"])

        }
        // autoCompleteOptions.forEach((optionText) => {
        //     const option = document.createElement("option");
        //     option.textContent = optionText;
        //     dataList.appendChild(option);
        //     input.setAttribute("list", "autocomplete-options");
        //     let form = document.getElementById("myform")
        //     form.appendChild(dataList);

        // });

    })
}



async function universities(URL) {

    controller.abort();
    controller = new AbortController();
    signal = controller.signal;
    const response = await fetch(URL, { signal: signal })
    const unis = await response.json()

    return unis;
}


function findUni() {
    console.log("U are in the function")
    let searchInput = document.getElementById("my-input").value
    console.log(searchInput)
    URL = `http://universities.hipolabs.com/search?name=${searchInput}`
    listContainer.innerHTML = ""
    fillingHtml(URL)
    event.preventDefault()
}



function myFunction() {
    console.log("Yoooo")
    let x = document.getElementById("side-filter").value
    URL = `http://universities.hipolabs.com/search?country=${x}`
    listContainer.innerHTML = ""
    fillingHtml(URL)
}

function tablepage() {

    console.log("memmememeemmememe")
    page = new Page2()
    page.buildPage2()
}
function autocomp(value) {
    console.log(value)
    urllloo = `http://universities.hipolabs.com/search?name=${value}`
    listContainer.innerHTML = ""
    fillingHtml(urllloo)
}