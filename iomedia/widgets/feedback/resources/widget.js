jQuery(function ($) {
	// Add widget js in overlays
	$('.feedback-form').prepOverlay(
        {
            subtype: 'ajax',
            filter: common_content_filter,
            cssclass: 'custom-overlay',
            //formselector: 'form[name="feedback-form"]',
            noform: 'reload',
            config: {
            	onBeforeLoad : function (e) {
            		loadFeedbackWidgetHandlers();
            		return true;
            	}
            },
        }
    );	
	loadFeedbackWidgetHandlers();	
});
	
function loadFeedbackWidgetHandlers(){
	var slider_num=0;
	$('div.iomedia-widgets-feedback').each(function(){
		slider_num+=1;
		$(this).attr('id','iomedia-widgets-feedback-slider-' + slider_num);
		var num = 0;		
		$(this).children().each(function(){
			num +=1;
			$(this).attr('id','iomedia-widgets-feedback-star-' + slider_num + '-' + num);
			
			// Process hovers
			$(this).hover(function(){
				starHover(this);
			},
			function(){
				starUnHover(this);
			});
			
			// Process click
			$(this).click(function(){
				id_match=matchStarIds(this);
				$('#iomedia-widgets-feedback-slider-' + id_match[1]).parent().children('input').val(id_match[2]);
			});
		});
	});
}

function starHover(star){
	var id_match=matchStarIds(star);
	var current_widget = id_match[1];
	var current_star = id_match[2];
	var current_value = getCurrentValue(star);
	$(star).stop(true,true);
	for (var i = 1; i <= 5; i++){
		var this_star = $('#iomedia-widgets-feedback-star-' + current_widget + '-' + i);
		if(i <= current_star){
			this_star.addClass('iomedia-widgets-feedback-star-on');
		}else{
			this_star.removeClass('iomedia-widgets-feedback-star-on');
		}
	}
}

function starUnHover(star){
	var id_match=matchStarIds(star);
	var current_widget = id_match[1];
	var current_star = id_match[2];
	var current_value = getCurrentValue(star);
	for (var i = 1; i <= 5; i++){
		var this_star = $('#iomedia-widgets-feedback-star-' + current_widget + '-' + i)
		if (i <= current_value){
			this_star.addClass('iomedia-widgets-feedback-star-on');
		}else{
			this_star.removeClass('iomedia-widgets-feedback-star-on');
		}		
	}
}

function matchStarIds(star){
	var id_regex = /(\d+)\-(\d+)$/;
	var this_id = $(star).attr('id');
	var id_match = this_id.match(id_regex);
	return id_match;
}

function getCurrentValue(star){
	var id_match = matchStarIds(star);
	var my_value = $('#iomedia-widgets-feedback-slider-' + id_match[1]).parent().children('input').val();
	if (my_value == null){
		return 0;
	}else{
		return my_value;
	}
}