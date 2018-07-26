document.addEventListener('DOMContentLoaded', init)

function init() {
  getDogs()
  document.getElementById('dog-bar').addEventListener('click', (e) => {
    getDog(e.target.id)
  });
  document.getElementById('good-dog-filter').addEventListener('click', filter)
}

function getDogs() {
  fetch('http://localhost:3000/pups')
  .then(res => res.json())
  .then(data => displayDogs(data))
}

function getDog(id) {
  fetch(`http://localhost:3000/pups/${id}`)
  .then(res => res.json())
  .then(data => displayDog(data))
}

function displayDog(data) {
  document.getElementById('dog-info').innerHTML = ""
  let dogInfo = `<img src= ${data.image}>
                  <h2>${data.name}<h2>
                  <button data-dogId = "${data.id}" id="isGood">${data.isGoodDog ? "Bad dog" : "Good dog"}</button>`
  document.getElementById('dog-info').innerHTML = dogInfo
  document.getElementById('isGood').addEventListener('click', toggleGood)
}

function displayDogs(data){
  dogData = data
  data.forEach((dog) => {
    document.getElementById('dog-bar').append(makeDogMenuItem(dog))
  })
}

function makeDogMenuItem(dog) {
  let span = document.createElement('span')
  span.id = dog.id
  span.innerText = dog.name
  return span
}

function filter() {
  let filterBtn = document.getElementById('good-dog-filter')
  if (filterBtn.innerText === "Filter good dogs: OFF"){
    filterBtn.innerText = "Filter good dogs: ON"
    document.getElementById('dog-bar').innerHTML = ""
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(data => data.filter(dog => dog.isGoodDog === true))
    .then(filteredData => displayDogs(filteredData))
  }
  else {
    document.getElementById('dog-bar').innerHTML = ""
    filterBtn.innerText = "Filter good dogs: OFF"
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(data => displayDogs(data))
  }
}

function toggleGood(e) {
  if (e.target.innerText === "Good dog"){
    turnDog(e, "Bad dog", true)
  }
  else{
    turnDog(e, "Good dog", false)
  }
}

function turnDog(e, goodStr, bool) {
  e.target.innerText = goodStr
  fetch(`http://localhost:3000/pups/${e.target.dataset.dogid}`, {
    method: "PATCH",
    headers: {"Content-type":"application/json"},
    body:JSON.stringify({isGoodDog: bool})
  })
}
