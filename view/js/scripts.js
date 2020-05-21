$(document).ready(function(){
    var inputs = document.querySelectorAll( '.inputfile' );
    Array.prototype.forEach.call( inputs, function( input )
    {
        var label	 = input.nextElementSibling,
            labelVal = label.innerHTML;

        input.addEventListener( 'change', function( e )
        {
            var fileName = '';
            if( this.files && this.files.length > 1 ) 
                fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
            else
                fileName = e.target.value.split( '\\' ).pop();

            if( fileName )
                label.innerHTML = fileName;
            else
                label.innerHTML = labelVal;

            $('.next-step').animate({
                opacity: 1
            });
        });
    });
    $(document).on('change','.second-step select',function(){
        $('.next-step').animate({
            opacity: 1
        });
    });
    $('.first-step .next-step span').click(function(){
        $('.first-step').fadeOut(1000);
        $('.second-step').delay(1000).fadeIn(1000);
    });
    $('.second-step .next-step span').click(function(){
        $('.second-step').fadeOut(1000);
        $('.first-step').delay(1000).fadeIn(1000);
    });
});
$(window).load(function(){
    $('.intro .intro-txt').animate({
        opacity: 1,
        fontSize: 40
    }, 1000).delay(1000).fadeOut(function(){
        $('.first-step').animate({
            opacity: 1
        }, 1000);
    });
});