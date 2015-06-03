/**
 *  custom_select_box
 */

$(document).ready(function(){
	jQuery(document).ready(function(){
	    
	    $('select').change(function(){
	        var select_name = $(this).children("option:selected").text();
	        $(this).siblings("label").text(select_name);
	    });
	});
});
