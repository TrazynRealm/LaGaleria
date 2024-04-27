document.addEventListener("DOMContentLoaded", function() {
    const profileButton = document.getElementById("profile-button");
    const dropdown = document.getElementById("dropdown");
  
    // Agrega un listener al botón del perfil para mostrar u ocultar el menú desplegable
    profileButton.addEventListener("click", function() {
      dropdown.classList.toggle("hidden");
    });
  
    // Cierra el menú desplegable si se hace clic fuera de él
    document.addEventListener("click", function(event) {
      if (!dropdown.contains(event.target) && !profileButton.contains(event.target)) {
        dropdown.classList.add("hidden");
      }
    });
  });
  