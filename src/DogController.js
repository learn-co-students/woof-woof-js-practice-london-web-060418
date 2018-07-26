class DogController {

  static init() {
    document.querySelector('#good-dog-filter').addEventListener('click', DogController.selectGoodDogs)
    Adapter.getDogs()
    .then(DogController.renderDogs)
  }

  static renderDogs(dogs){
    dogs.forEach(dog => DogController.renderDog(dog))
  }

  static renderDog(dog){
    let dogBar = document.querySelector('#dog-bar')
    let dogDiv = document.createElement('div')
    let dogSpan = `<span>${dog.name}</span>`
    dogDiv.id = dog.id
    dogDiv.addEventListener('click', DogController.getDog)
    dogDiv.innerHTML = dogSpan
    dogBar.append(dogDiv)
  }

  static getDog(e){
    Adapter.getDog(e.target.parentElement.id)
      .then(dog => DogController.renderDogOnMain(dog))
  }

  static renderDogOnMain(dog){
    let main = document.querySelector('#dog-info')
    main.innerHTML = ''
    let mainDiv = document.createElement('div')
    mainDiv.id = dog.id
    mainDiv.innerHTML =
    `
    <img src=${dog.image}>
    <h2>${dog.name}</h2>
    `
    if (dog.isGoodDog == true) {
      let button = document.createElement('button')
      button.innerText = 'Good Dog!'
      button.addEventListener('click', DogController.changeButton)
      mainDiv.append(button)
    } else {
      let button = document.createElement('button')
      button.innerText = 'Bad Dog!'
      button.addEventListener('click', DogController.changeButton)
      mainDiv.append(button)
    }
    main.append(mainDiv)
  }

  static changeButton(e){
    let btnText = e.target.innerText

    if (btnText == 'Good Dog!'){
      e.target.innerText = 'Bad Dog!'
      Adapter.changeMood(e.target.parentElement.id, 'bad')
      .then(dog => DogController.renderDogOnMain(dog))
    } else if (btnText == 'Bad Dog!') {
      e.target.innerText = 'Good Dog!'
      Adapter.changeMood(e.target.parentElement.id, 'good')
      .then(dog => DogController.renderDogOnMain(dog))
    }
  }

  static selectGoodDogs() {
    if (document.querySelector('#good-dog-filter').innerText == 'Filter good dogs: OFF'){
      document.querySelector('#good-dog-filter').innerText = 'Filter good dogs: ON'
      document.querySelector('#dog-bar').innerHTML = ""
      return Adapter.getDogs()
      .then(dogs => {
        DogController.renderDogs(dogs.filter(d => d.isGoodDog === true))
      });
    } else {
      document.querySelector('#good-dog-filter').innerText = 'Filter good dogs: OFF'
      document.querySelector('#dog-bar').innerHTML = ""
      return Adapter.getDogs()
      .then(DogController.renderDogs)
    }
  }


} //ClassEnd
