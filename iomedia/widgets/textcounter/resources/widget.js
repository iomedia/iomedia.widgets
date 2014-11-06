function updateCountdown(field,maxchars) {
    // Calculate remaining characters (including line breaks)
    var remaining = maxchars - $(field)
    .val()
    .replace(/(\r\n|\n|\r)/g,"  ")
    .length;	
    // Update the counter
    $(field)
    .next('div.iomedia-widgets-textcounter-remaining')
    .children('span.iomedia-widgets-textcounter-charrem')
    .text(remaining);
}

jQuery(function ($) {
    $('textarea.iomedia-widgets-textcounter').each(function() {
        if ($(this).attr('maxlength').length){
            var maxchars = $(this).attr('maxlength');
            updateCountdown(this,maxchars);
            $(this).change(function(){updateCountdown(this,maxchars)});
            $(this).keyup(function(){updateCountdown(this,maxchars)});
        }
    });
});
