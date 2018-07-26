document.addEventListener('DOMContentLoaded', function(){

  fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(dogs => renderDogs(dogs))

let dogBarDiv = document.getElementById('dog-bar')
let dogContainer = document.getElementById('dog-info')
let currentDogId;

  function goodOrBad(arg){
    if (arg){
      return 'Good Dog!'
    } else {
      return 'Bad Dog!'
    }
  }

  function renderDogs(dogs){
    dogs.forEach(function(dog){
      //top names bar:
      let pupSpan = document.createElement('span')
      pupSpan.innerHTML = `${dog.name}`
      pupSpan.id = `${dog.id}`
      dogBarDiv.append(pupSpan)

    dogBarDiv.addEventListener("click", function(e){
        if (e.target.id === `${dog.id}`){
          currentDogId = e.target.id

          dogContainer.innerHTML = `
            <div id=${currentDogId}>
              <img src='${dog.image}' class="image">
              <h2>${dog.name}</h2>
              <button>${goodOrBad(dog.isGoodDog)}</button>
            </div>
            `
        }
    })
   })
  }

  dogContainer.addEventListener("click", function(e){
    if (e.target.innerText === "Good Dog!"){
      let currentDogDiv = e.target.parentNode

      let betterOrWorse = {
        id: e.target.parentNode.id,
        isGoodDog: false
      }
      patchDog(betterOrWorse)
    }else if (e.target.innerText === "Bad Dog!") {
      let currentDogDiv = e.target.parentNode

      let betterOrWorse = {
        id: e.target.parentNode.id,
        isGoodDog: true
      }
      patchDog(betterOrWorse)
    }
  })

  function renderDog(dog){
    let button = dogContainer.querySelector('button')
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

});


// {
//   "id": 1,
//   "name": "Mr. Bonkers",
//   "isGoodDog": true,
//   "image": "https://weloveanimals.me/wp-content/uploads/2017/10/gettyimages-590486672-e1508512743796.jpg"
// }
