$(document).ready(function() {
    $('.set-card').hover(function() {
        const targetId = $(this).attr('id');
        // Resaltar la tarjeta actual
        $(this).css('filter', 'brightness(100%)');
        // Oscurecer las demás tarjetas
        $('.set-card').not(this).css('filter', 'brightness(30%)');
        // Resaltar el icono asociado
        $(`.icon-image[data-target="${targetId}"]`).css('filter', 'brightness(100%)');
        // Oscurecer los demás iconos
        $('.icon-image').not(`[data-target="${targetId}"]`).css('filter', 'brightness(30%)');
    }, function() {
        // Resetear los estilos al quitar el hover
        $('.set-card').css('filter', 'brightness(100%)');
        $('.icon-image').css('filter', 'brightness(100%)');
    });

    $('.icon-image').hover(function() {
        const targetId = $(this).data('target');
        // Resaltar el icono actual
        $(this).css('filter', 'brightness(100%)');
        // Oscurecer los demás iconos
        $('.icon-image').not(this).css('filter', 'brightness(30%)');
        // Resaltar la tarjeta asociada
        $(`#${targetId}`).css('filter', 'brightness(100%)');
        // Oscurecer las demás tarjetas
        $('.set-card').not(`#${targetId}`).css('filter', 'brightness(30%)');
    }, function() {
        // Resetear los estilos al quitar el hover
        $('.set-card').css('filter', 'brightness(100%)');
        $('.icon-image').css('filter', 'brightness(100%)');
    });
});

// Función para abrir el modal
function openModal() {
    var modal = document.getElementById("replyModal");
    modal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
}

// Función para cerrar el modal
function closeModal() {
    var modal = document.getElementById("replyModal");
    modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
}

// Event listener para abrir el modal cuando se hace clic en el botón
//document.getElementById("openModalButton").addEventListener("click", openModal);

// Event listener para cerrar el modal cuando se hace clic fuera de él
document.addEventListener("click", function(event) {
    var modal = document.getElementById("replyModal");
    if (event.target === modal) {
        closeModal();
    }
});

// Event listener para cerrar el modal cuando se hace clic en el botón de cerrar
document.getElementById("closeModalButton").addEventListener("click", closeModal);

