class Controller {

  static handleDog(e) {
    Controller.clearMain()
    Adapter.getDogBy(e.target.dataset.dogId)
      .then(Controller.renderDog)
  }

  static handleGBDog(e) {
    Controller.clearMain()
    const dogId = e.target.dataset.dogId

    Adapter.getDogBy(dogId)
      .then( r => {
        r.isGoodDog = !r.isGoodDog
        Adapter.patchDog(r)
          .then( r => Controller.renderDog(r))
      })
  }

  static handleFilter(e) {
    Controller.clearPreviews()
    const filterBtn = e.target

    if (filterBtn.innerText === "Filter good dogs: OFF") {
      filterBtn.innerText = "Filter good dogs: ON"
      Controller.filterDogs(true)
    } else {
      filterBtn.innerText = "Filter good dogs: OFF"
      Controller.filterDogs(false)
    }
  }

  static dogPreviewEl(dogObj) {
    const preview = document.createElement('span')

    preview.dataset.dogId = dogObj.id
    preview.innerText = dogObj.name

    preview.addEventListener('click', Controller.handleDog)
    return preview
  }

  static fullDogEl(dogObj) {
    const doggo = document.createElement('div')
    doggo.id = "dog-info"
    doggo.innerHTML = `
      <img src="${dogObj.image}"></img>
      <h2>${dogObj.name}</h2>
      <button data-dog-id="${dogObj.id}"></button>
    `
    const btn = doggo.querySelector('button')
    btn.dataset.dogId = dogObj.id
    btn.innerText = Controller.goodOrBadBy(dogObj.isGoodDog)
    btn.addEventListener('click', Controller.handleGBDog)

    return doggo
  }

  static renderPreview(dogObj) {
    document.querySelector('#dog-bar').append(Controller.dogPreviewEl(dogObj))
  }

  static renderDog(dogObj) {
    document.querySelector('#dog-summary-container').append(Controller.fullDogEl(dogObj))
  }

  static clearMain() {
    document.querySelector('#dog-info').remove()
  }

  static clearPreviews() {
    document.querySelector('#dog-bar').innerHTML = ""
  }

  static filterDogs(bool) {
    if (bool) {
      Adapter.getDogs()
        .then( r => r.filter(dog => dog.isGoodDog) )
        .then( r => r.forEach(Controller.renderPreview) )
    } else {
      Adapter.getDogs()
        .then( r => r.forEach(Controller.renderPreview) )
    }
  }

  static goodOrBadBy(bool) {
    if (bool) {
      return "Good Dog"
    } else {
      return "Bad Dog"
    }
  }
}
