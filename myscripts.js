const URL = "http://universities.hipolabs.com/search?name=Germany"

const main = document.getElementById('main')
main.innerHTML = `<p>Loading......</p>`

let response = fetch(URL)
.then(res => res.json())
.then(data => console.log(data))
