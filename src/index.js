document.addEventListener('DOMContentLoaded', () => {


  fetch("http://localhost:3000/pups", {
    method: "GET"
  }).then(res => res.json())
    .then(json => renderDogs(json))

    let dogBarDiv = document.getElementById("dog-bar")
    let dogInfoDiv = document.getElementById("dog-info")
    let currentDogId;

    function goodOrBad(arg) {
      if (arg) {
        return "Good Dog!"
      } else {
        return "Bad Dog!"
      }
    }

  function renderDogs(json){
    json.forEach(function(dog){

      let pupSpan = document.createElement("span")
      pupSpan.id = `${dog.id}`
      pupSpan.innerText = `${dog.name}`
      dogBarDiv.append(pupSpan)

      dogBarDiv.addEventListener("click", function(e) {
        if (e.target.id === `${dog.id}`){
          currentDogId = e.target.id;

          dogInfoDiv.innerHTML = `<div id="${currentDogId}">
          <img src='${dog.image}' class="image">
          <h2>${dog.name}</h2>
          <button>${goodOrBad()}</button>
          </div>`
        }
      })


    })
  }

    dogInfoDiv.addEventListener("click", function(e) {
      if (e.target.innerText === "Good Dog!"){
        let currentDogDiv = e.target.parentNode

        let editDog = {
          id: e.target.parentNode.id,
          isGoodDog: false
        }

        patchDog(editDog)

      } else {
        let currentDogDiv = e.target.parentNode
        let editDog = {
          id: e.target.parentNode.id,
          isGoodDog: true
        }
        patchDog(editDog)
      }
    })

    function renderDog(dog) {
      let button = dogInfoDiv.querySelector("button")
      button.innerText = goodOrBad(dog.isGoodDog)
    }

  function patchDog(dog){
  fetch(`http://localhost:3000/pups/${currentDogId}`, {
     method: 'PATCH',
     headers: {'Content-Type': 'application/json'},
     body: JSON.stringify(dog),
   })
   .then(res => res.json())
   .then(dog => renderDog(dog));
 }

})
