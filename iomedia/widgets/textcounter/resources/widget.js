function updateCountdownWidget(field,maxchars) {
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
            updateCountdownWidget(this,maxchars);
            $(this).change(function(){updateCountdownWidget(this,maxchars)});
            $(this).keyup(function(){updateCountdownWidget(this,maxchars)});
        }
    });
});
