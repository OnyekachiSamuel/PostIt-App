  $(document).ready(() => {
    $('select').material_select();
	$('.collapsible').collapsible();
	$('.modal').modal(
        {
      dismissible: false, // Modal can be dismissed by clicking outside of the modal
        });
      
    $('.chips-autocomplete').material_chip({
    autocompleteOptions: {
      data: {
        'Apple': null,
        'Microsoft': null,
        'Google': null
      },
      limit: Infinity,
      minLength: 1
    }
  });
  });