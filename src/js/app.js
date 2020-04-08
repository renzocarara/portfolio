// requires e inizializzazioni
// jquery
var $ = require('jquery');
//
// Bootstrap
require('../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js');
//
// abilito Boostrap tooltip
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});
//
// abilito Boostrap Popover
$(function () {
    $('[data-toggle="popover"]').popover();
});
//
// simplebar - customize scrollbars
require('simplebar');
//
// tiny slider 2
import {
    tns
} from "../../node_modules/tiny-slider/src/tiny-slider.js";
//
$(document).ready(function () {

    // applico o rimuovo uno sfondo alla navbar in base allo scroll della pagina
    handleNavbarOnScroll();

    // faccio sparire il menu hamburger quando clicco su una voce del menu o
    // sul bottone BTT (back to top)
    closeHamburgerMenu();

    // gestisco lo sfondo della navbar al click sull'icona hamburger
    handleClickOnHamburgerMenu();

    // smooth scoll per i link interni alla pagina
    internalLinkSmoothScroll();

    // gestisco la visualizzazione del bottone BackToTop (BTT)
    handleBTTButton();

    // visualizzo lo spinner quando l'utente preme "Invia"
    showContactSpinner();

    // creo slider per la sezione portfolio
    createSlider();

});


// -------------------------------- FUNCTIONs ---------------------------------

function handleNavbarOnScroll() {
    // DESCRIZIONE:
    // applica o rimuove un background color 'non-trasparente' per la navbar,
    // quando l'utente scrolla la pagina

    var navbar = $(".navbar");
    $(window).scroll(function () {
        var positionFromTop = $(this).scrollTop();

        // quando l'utente inizia a scrollare verso il basso
        // rendo lo sfondo della navbar visibile, anzichè trasparente, gli do' un colore
        if (positionFromTop > 15) {
            // NOTA: bg-info è una classe (colore) di Bootstrap
            navbar.addClass('bg-info navbar-shadow');
            // rendo visibile anche il site name "renzocarara.it"
            $('#site-name').addClass('d-inline-block').removeClass('d-none');

        } else if ($(".navbar-toggler").hasClass('collapsed')) {
            // il menu hamburger non è aperto, cioè non ha classe collapsed e l'utente
            // ha scrollato quasi fino in cima. allora rimuovo il colore di sfondo
            navbar.removeClass('bg-info navbar-shadow');
            // rimuovo anche il site name "renzocarara.it"
            $('#site-name').removeClass('d-inline-block').addClass('d-none');

        }
    });

}

function closeHamburgerMenu() {
    // DESCRIZIONE:
    // al click chiudo (collasso) le voci dell'hamburger menu

    // intercetto click sulle voci del menu della navbar (eccetto la voce dropdown menu)
    // sulle voci del dropdown menu
    // e sul BTT button

    // DA VERIFICARE SINTASSI....
    // $('.nav-item:not(.dropdown), .dropdown-item, .scroll-to-top').on('click', function () {

    $('.nav-item:not(.dropdown), .dropdown-item, .scroll-to-top').click(function () {
        $('#navbar-menu').collapse('hide');
    });
}

function handleClickOnHamburgerMenu() {
    // DESCRIZIONE:
    // al click sull'icona hamburger setto il background color della navigation bar

    // intercetto click sull'icona hamburger
    $('.navbar-toggler').click(function () {
        if (!($('.navbar').hasClass('bg-info'))) {
            // se non ce l'ha già, applico lo sfondo solido alla navbar
            $('.navbar').addClass('bg-info navbar-shadow');
        }
    });
}

function internalLinkSmoothScroll() {
    // DESCRIZIONE:
    // versione w3schools, applico uno smooth scroll quando viene cliccato un link interno alla pagina

    // Add smooth scrolling to internal links with class smooth-link
    $("a.smooth-link").on('click', function (event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number
            // of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });
}

function handleBTTButton() {
    // DESCRIZIONE:
    // gestisco la visualizzazione del bottone per tornare in cima alla pagina

    // visualizza e nasconde il bottone "back to top in base allo scroll
    var scrollTopButton = $(".scroll-to-top");
    $(window).scroll(function () {
        var topPos = $(this).scrollTop();
        if (topPos > 500) {
            // visualizzo il bottone back to top
            $(scrollTopButton).addClass("d-inline-block").remove("d-none");
        } else {
            // nascondo il bottone
            $(scrollTopButton).removeClass("d-inline-block").addClass("d-none");
        }
    });
}

function showContactSpinner() {
    // DESCRIZIONE:
    // visualizza lo spinner dopo che il form è stato "submittato" (tutti i campi compilati)

    $("#contact-form").submit(function (event) {

        // qui si potrebbe fare un prevent event.preventDefault(); per bloccare il submit
        // fare controlli di validazione sui campi del form
        // se tutto ok fare un $("#contact-form").submit
        // altrimenti buttar fuori un errore a video

        // se il form è stato "submittato" allora visualizzo lo spinner e cambio la dicitua del bottone
        $('#contact-send-btn-txt').text("Attendi...");
        $('#contact-spinner').removeClass("hidden").addClass("visible");
    });
}

function createSlider() {
    // DESCRIZIONE:
    // creo lo slider con la libreria tiny slider 2

    var slider = tns({
        "container": ".my-slider",
        "items": 1,
        "gutter": 20,
        "controlsPosition": "bottom",
        "controlsContainer": ".slider-buttons",

        "navPosition": "bottom",
        "navAsThumbnails": true, // 1 dot per ogni slide

        "preventActionWhenRunning": true,

        // breakpoint che scatta da n px in su
        "responsive": {
            "768": {
                "items": 2
            },
            "1200": {
                "items": 3,
            }
        },

        // "mode": "gallery",
        // "animateIn": "jello",
        // "animateOut": "rollOut",
        // "speed": 1000,

        // "swipeAngle": false,

        "speed": 400,
        "mouseDrag": true
    });

}