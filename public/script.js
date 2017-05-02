document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");

  const confirmDelete = function(event){
    if (!confirm('Are you sure you want to delete this contact?')){
      event.preventDefault()
    }
  }

  ;[].forEach.call(document.querySelectorAll('.delete-contact'), function(link){
    link.addEventListener("click", confirmDelete)
  })

});
