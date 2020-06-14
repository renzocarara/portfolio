// requires e inizializzazioni ---------------------------------------------
//
// jquery
var $ = require("jquery");
//
// Bootstrap
require("../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js");
//
// abilito Boostrap tooltip
$(function() {
    $('[data-toggle="tooltip"]').tooltip({
        trigger: "hover",
    });
});
//
// abilito Boostrap Popover
$(function() {
    $('[data-toggle="popover"]').popover();
});
//
// simplebar - customize scrollbars
require("simplebar");
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
$(document).ready(function() {
    // verifico se sono sulla pagina iniziale index.html
    if ($("#home").length > 0) {
        // chiamata AJAX per recuperare dati dal DB
        $.ajax({
            url: "db_read.php",
            method: "get",
            success: function(slidesData) {
                // trasformo i dati da stringa JSON in un oggetto JS
                var slidesDataJSObj = JSON.parse(slidesData);
                // creo dinamicamente le slides dello slider (uso Handlebars.js)
                createSlides(slidesDataJSObj);
                // creo dinamicamente i modals associati alle slides dello slider (uso Handlebars.js)
                createSlideModals(slidesDataJSObj);
                // creo lo slider per la sezione portfolio (uso libreria Tiny Slider 2)
                createSlider();
                // abilito i tooltips sugli elementi dinamici creati (slides e modals)
                enableTooltipsOnDynamic();
                // al click faccio sparire i tooltip visualizzati
                hideTooltips();
            },
            error: function(error) {
                alert("ERRORE! non sono riuscito a recuperare i dati...");
            },
        });

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
    }
});

// -------------------------------- FUNCTIONs ---------------------------------

function createSlides(slidesDataJSObj) {
    // DESCRIZIONE:
    // creo dinamicamente gli elementi che compongono lo slider, sono dei <div> con all'interno un'immagine
    // utilizzo un template di handlebars. I dati con cui valorizzare il template li leggo da una struttura dati
    // che ricevo in ingresso (slidesDataJSObj). E' array di array dove ogni elemento contiene i dati della slide.

    // ciclo lo slidesDataJSObj e scorro tutti gli elementi (ogni elemento è una slide)
    for (var i = 0; i < slidesDataJSObj.length; i++) {
        // creo un oggetto con i dati che mi servono
        var slideInfo = {
            name: slidesDataJSObj[i].name,
            title: slidesDataJSObj[i].title,
            img_filename: slidesDataJSObj[i].img_filename,
            alt_img_desc: slidesDataJSObj[i].alt_img_desc,
        };

        // leggo il codice html dal template HANDLEBARS
        var slideTemplate = $("#template-slide").html();

        // do in pasto a HANDLEBARS il codice html, lui mi restituisce una funzione
        var slideFunction = Handlebars.compile(slideTemplate);

        // uso la funzione generata da HANDLEBARS, valorizzo l'html, ovvero i vari placeholder vengono sostituiti con il contenuto
        // della variabile che passo alla funzione, passo un oggetto, che contiene tutte le info della slide che sto creando
        var slide = slideFunction(slideInfo);

        // inserisco la slide sulla pagina con il codice HTML che ho appena generato dal template HANDLEBARS
        $(".my-slider").append(slide);
    } // fine ciclo scansione dell'array slidesDataJSObj
}

function createSlideModals(slidesDataJSObj) {
    // DESCRIZIONE:
    // creo dinamicamente i modals associati ad ogni singola slide, utilizzo un template di handlebars.
    //  I dati con cui valorizzare il template li leggo da una struttura dati
    // che ricevo in ingresso (slidesDataJSObj). E' array di array dove ogni elemento contiene i dati della slide
    // NOTA la chiave 'site-link' può valere "not_available", in questo caso NON devo "appendere" codice sulla pagina HTML

    // ciclo lo slidesDataJSObj e scorro tutti gli elementi (ogni elemento è una slide)
    for (var i = 0; i < slidesDataJSObj.length; i++) {
        // creo un oggetto con i dati che mi servono, leggondoli dall'array slidesDataJSObj
        var slideModalInfo = {
            name: slidesDataJSObj[i].name,
            img_filename: slidesDataJSObj[i].img_filename,
            alt_img_desc: slidesDataJSObj[i].alt_img_desc,
            title: slidesDataJSObj[i].title,
            description: slidesDataJSObj[i].description,
            technologies: slidesDataJSObj[i].technologies,
            code_link: slidesDataJSObj[i].code_link,
            site_link: slidesDataJSObj[i].site_link == "not_available" ?
                "" :
                '<a href="' +
                slidesDataJSObj[i].site_link +
                '" target="_blank" class="tooltip-on-dynamic-el" data-placement="top" title="Visualizza l\'applicazione"><i class="fas fa-desktop fa-3x text-link mr-3"></i></a>',
        };

        // leggo il codice html dal template HANDLEBARS
        var modalTemplate = $("#template-slide-modal").html();

        // do in pasto a HANDLEBARS il codice html, lui mi restituisce una funzione
        var slideModalFunction = Handlebars.compile(modalTemplate);

        // uso la funzione generata da HANDLEBARS, valorizzo l'html, ovvero i vari placeholder vengono sostituiti con il contenuto
        // della variabile che passo alla funzione, passo un oggetto, che contiene tutte le info della slide che sto creando
        var slideModal = slideModalFunction(slideModalInfo);

        // inserisco la slide sulla pagina con il codice HTML che ho appena generato dal template HANDLEBARS
        $("#slide-modals").append(slideModal);
    } // fine ciclo scansione dell'array slidesDataJSObj
}

function enableTooltipsOnDynamic() {
    // DESCRIZIONE:
    // abilito i tooltips solo dopo che tutti i modal, e in precedenza le slide, sono stati creati nel DOM

    $(".tooltip-on-dynamic-el").tooltip({
        trigger: "hover", // evito che il tooltip rimanga visualizzato dopo un click
    });
}

function handleNavbarOnScroll() {
    // DESCRIZIONE:
    // applica o rimuove un background color 'non-trasparente' per la navbar,
    // quando l'utente scrolla la pagina

    var navbar = $(".navbar");
    $(window).scroll(function() {
        var positionFromTop = $(this).scrollTop();

        // quando l'utente inizia a scrollare verso il basso
        // rendo lo sfondo della navbar visibile, anzichè trasparente, gli do' un colore
        if (positionFromTop > 15) {
            // NOTA: bg-info è una classe (colore) di Bootstrap
            navbar.addClass("bg-info navbar-shadow");
            // rendo visibile anche il site name "renzocarara.it"
            $("#site-name")
                .addClass("d-inline-block")
                .removeClass("d-none");
        } else if ($(".navbar-toggler").hasClass("collapsed")) {
            // il menu hamburger non è aperto, cioè non ha classe collapsed e l'utente
            // ha scrollato quasi fino in cima. allora rimuovo il colore di sfondo
            navbar.removeClass("bg-info navbar-shadow");
            // rimuovo anche il site name "renzocarara.it"
            $("#site-name")
                .removeClass("d-inline-block")
                .addClass("d-none");
        }
    });
}

function closeHamburgerMenu() {
    // DESCRIZIONE:
    // al click chiudo (collasso) le voci dell'hamburger menu

    // intercetto click sulle voci del menu della navbar e sul BTT button

    $(".nav-item, .scroll-to-top").click(function() {
        $("#navbar-menu").collapse("hide");
    });
}

function handleClickOnHamburgerMenu() {
    // DESCRIZIONE:
    // al click sull'icona hamburger setto il background color della navigation bar

    // intercetto click sull'icona hamburger
    $(".navbar-toggler").click(function() {
        if (!$(".navbar").hasClass("bg-info")) {
            // se non ce l'ha già, applico lo sfondo solido alla navbar
            $(".navbar").addClass("bg-info navbar-shadow");
        }
    });
}

function internalLinkSmoothScroll() {
    // DESCRIZIONE:
    // versione w3schools, applico uno smooth scroll quando viene cliccato un link interno alla pagina

    // Add smooth scrolling to internal links with class smooth-link
    $("a.smooth-link").on("click", function(event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number
            // of milliseconds it takes to scroll to the specified area
            $("html, body").animate({
                    scrollTop: $(hash).offset().top,
                },
                800,
                function() {
                    // Add hash (#) to URL when done scrolling (default click behavior)
                    window.location.hash = hash;
                }
            );
        } // End if
    });
}

function handleBTTButton() {
    // DESCRIZIONE:
    // gestisco la visualizzazione del bottone per tornare in cima alla pagina

    // visualizza e nasconde il bottone "back to top in base allo scroll
    var scrollTopButton = $(".scroll-to-top");
    $(window).scroll(function() {
        var topPos = $(this).scrollTop();
        if (topPos > 500) {
            // visualizzo il bottone back to top
            $(scrollTopButton)
                .addClass("d-inline-block")
                .removeClass("d-none");
        } else {
            // nascondo il bottone
            $(scrollTopButton)
                .removeClass("d-inline-block")
                .addClass("d-none");
        }
    });
}

function showContactSpinner() {
    // DESCRIZIONE:
    // visualizza lo spinner dopo che il form è stato "submittato" (tutti i campi compilati)

    $("#contact-form").submit(function(event) {
        // qui si potrebbe fare un prevent event.preventDefault(); per bloccare il submit
        // fare controlli di validazione sui campi del form
        // se tutto ok fare un $("#contact-form").submit
        // altrimenti buttar fuori un errore a video

        // se il form è stato "submittato" allora visualizzo lo spinner e cambio la dicitua del bottone
        $("#contact-send-btn-txt").text("Attendi...");
        $("#contact-spinner")
            .removeClass("hidden")
            .addClass("visible");
    });
}

function createSlider() {
    // DESCRIZIONE:
    // creo lo slider con la libreria tiny slider 2

    var slider = tns({
        container: ".my-slider",
        items: 1,
        gutter: 20,
        controlsPosition: "bottom",
        controlsContainer: ".slider-buttons",

        navPosition: "bottom",
        navAsThumbnails: true, // 1 dot per ogni slide

        preventActionWhenRunning: true,

        // breakpoint che scatta da n px in su
        responsive: {
            "768": {
                items: 2,
            },
            "1200": {
                items: 3,
            },
        },

        speed: 400,
        mouseDrag: true,
    });
}

function hideTooltips() {
    // DESCRIZIONE:
    // al click su di un elemento che ha un tooltip, nascondo il tooltip stesso
    // NOTA: su gli elementi creati dinamicamente (i.e. le slide dello slider e i modals)
    // i tooltip non sono associati con l'attributo data-toggle, ma con una classe (tooltip-on-dynamic-el)

    $('[data-toggle="tooltip"]').click(function() {
        $('[data-toggle="tooltip"]').tooltip("hide");
    });

    $(".tooltip-on-dynamic-el").click(function() {
        $(".tooltip-on-dynamic-el").tooltip("hide");
    });
}