  $(document).ready(() => {
    $('select').material_select();
	$('.collapsible').collapsible();
	$('.modal').modal(
        {
      dismissible: false, // Modal can be dismissed by clicking outside of the modal
        });
  });