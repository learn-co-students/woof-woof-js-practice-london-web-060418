class Adapter {

  static getDogs(){
    const url = `http://localhost:3000/pups`
    return fetch(url)
      .then(res => res.json())
  }

  static getDog(id){
    const url = `http://localhost:3000/pups/${id}`
    return fetch(url)
      .then(res => res.json())
  }

  static changeMood(id, mood){
    const url = `http://localhost:3000/pups/${id}`

    if (mood == 'good') {
      return fetch(url, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({isGoodDog: true})
      }).then(res => res.json());
    } else {
      return fetch(url, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({isGoodDog: false})
      }).then(res => res.json());
    }
  }
} //ClassEnd
