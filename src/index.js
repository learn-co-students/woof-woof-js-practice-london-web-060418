document.addEventListener('DOMContentLoaded', () => {
  
  document.querySelector('#good-dog-filter').addEventListener('click', Controller.handleFilter)

  Adapter.getDogs()
    .then( r => r.forEach(Controller.renderPreview) )
})
