class Adapter {

  static getDogs() {
    return fetch('http://localhost:3000/pups')
      .then( r => r.json() )
  }

  static getDogBy(id) {
    return fetch(`http://localhost:3000/pups/${id}`)
      .then( r => r.json() )
  }

  static patchDog(dogObj) {
    return fetch(`http://localhost:3000/pups/${dogObj.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dogObj)
    })
      .then( r => r.json() )
  }
}
