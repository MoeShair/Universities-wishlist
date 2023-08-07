function buildHTML() {
    const header = document.createElement("header");
    header.className = "header";

    const headerContainer = document.createElement("div");
    headerContainer.className = "x-container";

    const h1 = document.createElement("h1");
    h1.className = "h1-style";
    h1.textContent = "Universities Whishlist";

    const ul = document.createElement("ul");
    ul.className = "nav-items";

    const li1 = document.createElement("li");
    li1.className = "active-page";
    const a1 = document.createElement("a");
    a1.href = "./index.html";
    a1.textContent = "Universities List";
    li1.appendChild(a1);

    const li2 = document.createElement("li");
    const a2 = document.createElement("a");
    a2.href = "#top";
    a2.id = "page2";
    a2.textContent = "Your Whishlist";
    a2.onclick = tablepage; // Assuming tablepage is a valid function defined elsewhere
    li2.appendChild(a2);

    ul.appendChild(li1);
    ul.appendChild(li2);

    headerContainer.appendChild(h1);
    headerContainer.appendChild(ul);

    header.appendChild(headerContainer);

    const main = document.createElement("main");
    main.id = "main";

    const sideNav = document.createElement("div");
    sideNav.className = "side-nav";

    const form = document.createElement("form");
    form.id= "myform"
    form.autocomplete = "off";

    const input = document.createElement("input");
    input.type = "search";
    input.id = "my-input";
    input.placeholder = "Search for names..";
    
/*
    const dataList = document.createElement("datalist");
    dataList.id = "autocomplete-options";

    let autoCompleteOptions = ["Option1", "Option2", "Option3"]; // Add your autocomplete options here

    autoCompleteOptions.forEach((optionText) => {
        const option = document.createElement("option");
        option.textContent = optionText;
        dataList.appendChild(option);
    });

*/
    // Append the datalist to the form
    //form.appendChild(dataList);

    const button = document.createElement("button");
    button.id = "search-btn";
    button.onclick = findUni;
    button.textContent = "search";

    form.appendChild(input);
    form.appendChild(button);

    const select = document.createElement("select");
    select.id = "side-filter";
    select.onchange = myFunction; // Assuming myFunction is a valid function defined elsewhere

    const options = ["All", "United Kingdom", "United States", "Canada", "Germany"];
    options.forEach((optionText) => {
        const option = document.createElement("option");
        option.textContent = optionText;
        select.appendChild(option);
    });

    sideNav.appendChild(form);
    sideNav.appendChild(select);

    main.appendChild(sideNav);

    const listContainer = document.createElement("div");
    listContainer.id = "list-container";

    main.appendChild(listContainer);

    const footer = document.createElement("footer");
    footer.className = "footer";

    // Append all elements to the body
    let root = document.getElementById("root")
    root.appendChild(header);
    root.appendChild(main);
    root.appendChild(footer);
}

let autoCompleteArray = []

buildHTML()

let URL = "http://universities.hipolabs.com/search?country=germany"

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
//let abortController = new AbortController();
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
        /*------------------------------------------------------------------------------------*/
        const dataList = document.createElement("datalist");
        dataList.id = "autocomplete-options";
    
        let input = document.getElementById("my-input")
        /*------------------------------------------------------------------------------------*/


        const listContainer = document.getElementById("list-container")
        autoCompleteOptions = []
        for (let i = 0; i < re.length; i++) {
            const universityDiv = document.createElement("div")
            universityDiv.classList.add("university")

            const nameParagraph = document.createElement("p")
            nameParagraph.textContent = JSON.stringify(re[i]["name"])
            autoCompleteOptions.push(JSON.stringify(re[i]["name"]))
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
        autoCompleteOptions.forEach((optionText) => {
            const option = document.createElement("option");
            option.textContent = optionText;
            dataList.appendChild(option);
            input.setAttribute("list", "autocomplete-options");
            let form = document.getElementById("myform")
            form.appendChild(dataList);
            
        });

    })
}
fillingHtml()




async function universities() {
    // const controller = new AbortController()

    // // 5 second timeout:

    // const timeoutId = setTimeout(() => controller.abort(), 5000)

    const response = await fetch(URL, { signal: AbortSignal.timeout(2000) })
    const unis = await response.json()

    return unis;
}
/*const timeoutInMilliseconds = 3000;
setTimeout(() => {
    abortController.abort();
}, timeoutInMilliseconds);*/

function findUni() {
    console.log("U are in the function")
    let searchInput = document.getElementById("my-input").value
    console.log(searchInput)
    URL = `http://universities.hipolabs.com/search?name=${searchInput}`
    listContainer.innerHTML = ""
    fillingHtml()
    event.preventDefault()
}



function myFunction() {
    console.log("Yoooo")
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
        Checked.addEventListener("click", () => {
            tableRow.style.backgroundColor = "green"
            Checked.disabled = "true"
            Checked.textContent = "checked 😊"
        })
    }
}