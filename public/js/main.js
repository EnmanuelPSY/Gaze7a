
/*Funciones encargadas de cambiar el atributo de las imagenes para
crear un efecto de cambio cuand ocurre el evento hover*/
// facebook, twitter, instagram, menu-icon.

    $("#facebook").hover(function(){
        $(this).attr("src", "/images/facebook-1.png");
        }, function(){
        $(this).attr("src", "/images/facebook.png");
    });

    $("#twitter").hover(function(){
        $(this).attr("src", "/images/twitter-1.png");
        }, function(){
        $(this).attr("src", "/images/twitter.png");
    });

    $("#instagram").hover(function(){
        $(this).attr("src", "/images/instagram-1.png");
        }, function(){
        $(this).attr("src", "/images/instagram.png");
    });

    $("#toggle-nav").hover(function(){
        $(this).attr("src", "/images/nav_ico-1.png");
        }, function(){
        $(this).attr("src", "/images/nav_ico.png");
    });

//Close side-nav

    $("#close_icon, #close_icon2").click(function(){
        $(".blog").hide("fast", "linear");
    });

//Open side menu

    $("#toggle-nav").click(function(){
        $(".blog").show("fast", "linear");
    });

//contacto

     $("#nombre, #email, #asunto, #mensaje").focus(function(){
        $(this).css("border-bottom", "2px solid #ff7f7f");
    });

     $("#nombre, #email, #asunto, #mensaje").blur(function(){
        $(this).css("border-bottom", "2px solid #d8d8d8");
    });
//aplication design



/*
$(document).ready(function(){
    $('form').on('submit', function(e){
        e.preventDefault();
        var titulo = $('#titulo').val();
        var autor = $('#autor').val();
        var articulo = $('#articulo').val();
        $.ajax({
            url: "https://api.mlab.com/api/1/databases/blog/collections/articulos?apiKey=8bYuyDDN8JRPmQpJlagwZICp5fgtyyQw",
            data: JSON.stringify({ "titulo": titulo, "autor": autor, "articulo": articulo }),
            type: "POST",
            contentType: "application/json",
            success: function(data){
                window.location.href="/aplicacion"
            },
            error: function(xhr, status, err) {
                console.log(err);
            }
        });
    });
});
*/
