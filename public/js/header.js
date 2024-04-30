/* DROPDOWN SESIÓN */
$(document).ready(function () {
  $('#toggleDropdown').change(function () {
    if ($(this).is(':checked')) {
      $('.dropdown-menu').removeClass('hidden');
    } else {
      $('.dropdown-menu').addClass('hidden');
    }
  });
});


