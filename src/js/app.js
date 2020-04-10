// array di oggetti, un singolo oggetto è una slide
//
var slide_DB = [{
    'name': 'class8',
    'img_filename': 'animated_class8_snap.png',
    'alt_img_desc': 'animated class8',
    'title': 'Animazione CSS',
    'description': 'esempio basico di animazione CSS. Responsive.',
    'technologies': 'HTML, CSS',
    'code_link': 'https://github.com/renzocarara/animated-class8',
    'site_link': 'https://renzocarara.github.io/animated-class8/'
}, {
    'name': 'boolflix',
    'img_filename': 'boolflix_snap.png',
    'alt_img_desc': 'boolflix',
    'title': 'Boolflix - interrogazione di TheMovieDB',
    'description': "applicazione simil-Netflix che legge tramite API da un DB di movies e serieTV e permette all'utente di effettuare ricerche filtrate tramite un 'interfaccia. Realizzato con HTML, CSS, JS, Jquery, Handlebars, Ajax. Responsive",
    'technologies': 'HTML, CSS, JS, Handlebars, API, AJAX',
    'code_link': 'https://github.com/renzocarara/ajax-ex-boolflix',
    'site_link': 'https://renzocarara.github.io/ajax-ex-boolflix/'
}, {
    'name': 'boolzapp',
    'img_filename': 'boolzap_snap.png',
    'alt_img_desc': 'bolzapp',
    'title': 'Boolzapp, chat application',
    'description': "replica dell'interfaccia grafica dell'applicazione WhatsApp Web. Non responsive.",
    'technologies': 'HTML, CSS, JS, Jquery, Handlebars',
    'code_link': 'https://github.com/renzocarara/js-html-css-boolzap',
    'site_link': 'https://renzocarara.github.io/js-html-css-boolzap/'
}, {
    'name': 'digital_ocean',
    'img_filename': 'digital_ocean_snap.png',
    'alt_img_desc': 'digital ocean website',
    'title': 'Digital Ocean website replica',
    'description': "replica della pagina principale del sito digitalocean.com, dopo ca 30gg di formazione col corso Boolean Careers.",
    'technologies': 'HTML, CSS',
    'code_link': 'https://github.com/renzocarara/html-css-digitalocean',
    'site_link': 'https://renzocarara.github.io/html-css-digitalocean'
}, {
    'name': 'music_card',
    'img_filename': 'js-jq-ajax-api-musica_snap.png',
    'alt_img_desc': 'music cards',
    'title': ' Music cards selezionabili per genere',
    'description': "appliczione che tramite API e chiamate AJAX, legge informazioni su dischi musicali e li visualizza. Usato JavaScript per filtrare i risultati.",
    'technologies': 'HTML, CSS, JS, AJAX, API',
    'code_link': 'https://github.com/renzocarara/js-jq-ajax-api-musica',
    'site_link': 'https://renzocarara.github.io/js-jq-ajax-api-musica/'
}, {
    'name': 'boolpress',
    'img_filename': 'laravel-boolpress_snap.png',
    'alt_img_desc': 'Boolpress',
    'title': 'Boolpress Blog',
    'description': " realizzazione di un simil-Blog. Utilizzati i componenti preconfenzionati per la parte di autenticazione. Gestita traduzione bilingua del sito. Implementate CRUD. Implementate API per soggetto esterno che vuole accedere al DB. Disegnato DB con relazioni uno a uno, uno a molti e molti a molti. Tramite Laravel, realizzata sezione contatti con invio e-mail di conferma ad amministratore ed utente.",
    'technologies': 'LARAVEL, BOOTSTRAP, MySQL',
    'code_link': 'https://github.com/renzocarara/laravel-boolpress',
    'site_link': 'not_available'
}, {
    'name': 'hotel_crud',
    'img_filename': 'php-hotel-crud_snap.png',
    'alt_img_desc': 'Hotel DB',
    'title': 'Gestione Hotel DB',
    'description': "gestione di un DB di un hotel tramite applicativo in PHP. Implementazione delle operazioni CRUD, utilizzo di query MySQL per interagire con il DB.",
    'technologies': 'PHP, MySQL',
    'code_link': 'https://github.com/renzocarara/php-hotel-crud',
    'site_link': 'not_available'
}, {
    'name': 'spotifyweb',
    'img_filename': 'spotifyweb_snap.png',
    'alt_img_desc': 'spotifyweb',
    'title': "Spotify web replica UI",
    'description': "replica della pura interfaccia grafica della pagina principale del sito spotify web",
    'technologies': 'HTML, CSS',
    'code_link': 'https://github.com/renzocarara/html-css-spotifyweb',
    'site_link': 'https://renzocarara.github.io/html-css-spotifyweb/'
}, {
    'name': 'rc_oldsite',
    'img_filename': 'renzocarara_oldsite.png',
    'alt_img_desc': 'renzo carara vecchi sito web',
    'title': 'Renzo Carara, il mio primo sito web',
    'description': "il mio primo sito web sviluppato completamente da autodidatta. Partendo da zero.",
    'technologies': 'HTML, CSS, JS, PHP',
    'code_link': 'https://github.com/renzocarara/cv-classic-rc',
    'site_link': 'https://renzocarara.github.io/cv-classic-rc/'
}];
// ---------------------------------------------------------------------------------------


// requires e inizializzazioni ---------------------------------------------
//
// jquery
var $ = require('jquery');
//
// Bootstrap
require('../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js');
//
// abilito Boostrap tooltip
$(function () {
    $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover'
    });
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
//
// handlebars
const Handlebars = require("handlebars");
//
// tiny slider 2
import {
    tns
} from "../../node_modules/tiny-slider/src/tiny-slider.js";
//


// -------------------------------------------------------------------------
//


$(document).ready(function () {

    if ($('#home').length > 0) { // verifico se sono sulla pagina index.html

        // creo dinamicamente le slides dello slider (uso Handlebars.js)
        createSlides();

        // creo dinamicamente i modals associati alle slides dello slider (uso Handlebars.js)
        createSlideModals();

        // abilito i tooltips sugli elementi dinamici appena creati (slides e modals)
        enableTooltipsOnDynamic();

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

        // creo lo slider per la sezione portfolio (uso libreria Tiny Slider 2)
        createSlider();

        // al click faccio sparire i tooltip visualizzati
        hideTooltips();
    }

});


// -------------------------------- FUNCTIONs ---------------------------------

function createSlides() {
    // DESCRIZIONE:
    // creo dinamicamente gli elementi che compongono lo slider, sono dei <div> con all'interno un'immagine
    // utilizzo un template di handlebars. I dati con cui valorizzare il template li leggo da una struttura dati
    // definita all'inizio di questo file js (slide_DB). E' array di oggetti dove ogni oggetto contiene i dati della slide
    // incluse le informazioni che veranno poi visualizzate (tramite un modal) s e l'utente clicca sulla slide stessa

    // ciclo lo slide_DB e scorro tutti gli elementi (ogni elemento è una slide)
    for (var i = 0; i < slide_DB.length; i++) {

        // creo un oggetto con i dati che mi servono
        var slideInfo = {
            'name': slide_DB[i].name,
            'title': slide_DB[i].title,
            'img_filename': slide_DB[i].img_filename,
            'alt_img_desc': slide_DB[i].alt_img_desc
        };

        // leggo il codice html dal template HANDLEBARS
        var slideTemplate = $('#template-slide').html();

        // do in pasto a HANDLEBARS il codice html, lui mi restituisce una funzione
        var slideFunction = Handlebars.compile(slideTemplate);

        // uso la funzione generata da HANDLEBARS, valorizzo l'html, ovvero i vari placeholder vengono sostituiti con il contenuto
        // della variabile che passo alla funzione, passo un oggetto, che contiene tutte le info della slide che sto creando
        var slide = slideFunction(slideInfo);

        // inserisco la slide sulla pagina con il codice HTML che ho appena generato dal template HANDLEBARS
        $('.my-slider').append(slide);

    } // fine ciclo scansione dell'array slide_DB
}

function createSlideModals() {

    // DESCRIZIONE:
    // creo dinamicamente i modals associati ad ogni singola slide, utilizzo un template di handlebars.
    // I dati con cui valorizzare il template li leggo da una struttura dati
    // definita all'inizio di questo file js (slide_DB). E' array di oggetti dove ogni oggetto contiene i dati della slide
    // NOTA la chiave 'site-link' può essere vuota, in questo caso NON devo "appendere" codice sulla pagina HTML

    // ciclo lo slide_DB e scorro tutti gli elementi (ogni elemento è una slide)
    for (var i = 0; i < slide_DB.length; i++) {

        // creo un oggetto con i dati che mi servono, leggondoli dall'array slide_DB
        var slideModalInfo = {
            'name': slide_DB[i].name,
            'img_filename': slide_DB[i].img_filename,
            'alt_img_desc': slide_DB[i].alt_img_desc,
            'title': slide_DB[i].title,
            'description': slide_DB[i].description,
            'technologies': slide_DB[i].technologies,
            'code_link': slide_DB[i].code_link,
            'site_link': (slide_DB[i].site_link == "not_available") ?
                "" : '<a href="' + slide_DB[i].site_link + '" target="_blank" class="tooltip-on-dynamic-el" data-placement="top" title="Visualizza l\'applicazione"><i class="fas fa-desktop fa-3x text-link mr-3"></i></a>'
        };

        // leggo il codice html dal template HANDLEBARS
        var modalTemplate = $('#template-slide-modal').html();

        // do in pasto a HANDLEBARS il codice html, lui mi restituisce una funzione
        var slideModalFunction = Handlebars.compile(modalTemplate);

        // uso la funzione generata da HANDLEBARS, valorizzo l'html, ovvero i vari placeholder vengono sostituiti con il contenuto
        // della variabile che passo alla funzione, passo un oggetto, che contiene tutte le info della slide che sto creando
        var slideModal = slideModalFunction(slideModalInfo);

        // inserisco la slide sulla pagina con il codice HTML che ho appena generato dal template HANDLEBARS
        $('#slide-modals').append(slideModal);

    } // fine ciclo scansione dell'array slide_DB

}

function enableTooltipsOnDynamic() {
    // DESCRIZIONE:
    // abilito i tooltips solo dopo che tutti i modal, e in precedenza le slide, sono stati creati nel DOM

    $('.tooltip-on-dynamic-el').tooltip({
        trigger: 'hover' // evito che il tooltip rimanga visualizzato dopo un click
    });
}

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

    // intercetto click sulle voci del menu della navbar e sul BTT button

    // DA VERIFICARE SINTASSI....
    // $('.nav-item:not(.dropdown), .dropdown-item, .scroll-to-top').on('click', function () {

    $('.nav-item, .scroll-to-top').click(function () {
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
            $(scrollTopButton).addClass("d-inline-block").removeClass("d-none");
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

        "speed": 400,
        "mouseDrag": true
    });

}

function hideTooltips() {
    // DESCRIZIONE:
    // al click su di un elemento che ha un tooltip, nascondo il tooltip stesso
    // NOTA: su gli elementi creati dinamicamente (i.e. le slide dello slider e i modals)
    // i tooltip non sono associati con l'attributo data-toggle, ma con una classe (tooltip-on-dynamic-el)

    $('[data-toggle="tooltip"]').click(function () {
        $('[data-toggle="tooltip"]').tooltip('hide');
    });

    $(".tooltip-on-dynamic-el").click(function () {
        $(".tooltip-on-dynamic-el").tooltip('hide');
    });
}