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
