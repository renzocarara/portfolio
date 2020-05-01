<?php
// array di array, un singolo array è una slide
//
$slide_DB = [[
    'name' => 'class8',
    'img_filename' => 'animated_class8_snap.png',
    'alt_img_desc' => 'animated class8',
    'title' => 'Animazione CSS',
    'description' => 'esempio basico di animazione CSS. Responsive.',
    'technologies' => 'HTML, CSS',
    'code_link' => 'https://github.com/renzocarara/animated-class8',
    'site_link' => 'https://renzocarara.github.io/animated-class8/'
], [
    'name' => 'boolflix',
    'img_filename' => 'boolflix_snap.png',
    'alt_img_desc' => 'boolflix',
    'title' => 'Boolflix - interrogazione di TheMovieDB',
    'description' => "applicazione simil-Netflix che legge tramite API da un DB di movies e serieTV e permette all'utente di effettuare ricerche filtrate tramite un 'interfaccia. Realizzato con HTML, CSS, JS, Jquery, Handlebars, Ajax. Responsive",
    'technologies' => 'HTML, CSS, JS, Handlebars, API, AJAX',
    'code_link' => 'https://github.com/renzocarara/ajax-ex-boolflix',
    'site_link' => 'https://renzocarara.github.io/ajax-ex-boolflix/'
], [
    'name' => 'boolzapp',
    'img_filename' => 'boolzap_snap.png',
    'alt_img_desc' => 'bolzapp',
    'title' => 'Boolzapp, chat application',
    'description' => "replica dell'interfaccia grafica dell'applicazione WhatsApp Web. Non responsive.",
    'technologies' => 'HTML, CSS, JS, Jquery, Handlebars',
    'code_link' => 'https://github.com/renzocarara/js-html-css-boolzap',
    'site_link' => 'https://renzocarara.github.io/js-html-css-boolzap/'
], [
    'name' => 'digital_ocean',
    'img_filename' => 'digital_ocean_snap.png',
    'alt_img_desc' => 'digital ocean website',
    'title' => 'Digital Ocean website replica',
    'description' => "replica della pagina principale del sito digitalocean.com, dopo ca 30gg di formazione col corso Boolean Careers.",
    'technologies' => 'HTML, CSS',
    'code_link' => 'https://github.com/renzocarara/html-css-digitalocean',
    'site_link' => 'https://renzocarara.github.io/html-css-digitalocean'
], [
    'name' => 'music_card',
    'img_filename' => 'js-jq-ajax-api-musica_snap.png',
    'alt_img_desc' => 'music cards',
    'title' => ' Music cards selezionabili per genere',
    'description' => "appliczione che tramite API e chiamate AJAX, legge informazioni su dischi musicali e li visualizza. Usato JavaScript per filtrare i risultati.",
    'technologies' => 'HTML, CSS, JS, AJAX, API',
    'code_link' => 'https://github.com/renzocarara/js-jq-ajax-api-musica',
    'site_link' => 'https://renzocarara.github.io/js-jq-ajax-api-musica/'
], [
    'name' => 'boolpress',
    'img_filename' => 'laravel-boolpress_snap.png',
    'alt_img_desc' => 'Boolpress',
    'title' => 'Boolpress Blog',
    'description' => " realizzazione di un simil-Blog. Utilizzati i componenti preconfenzionati per la parte di autenticazione. Gestita traduzione bilingua del sito. Implementate CRUD. Implementate API per soggetto esterno che vuole accedere al DB. Disegnato DB con relazioni uno a uno, uno a molti e molti a molti. Tramite Laravel, realizzata sezione contatti con invio e-mail di conferma ad amministratore ed utente.",
    'technologies' => 'LARAVEL, BOOTSTRAP, MySQL',
    'code_link' => 'https://github.com/renzocarara/laravel-boolpress',
    'site_link' => 'not_available'
], [
    'name' => 'hotel_crud',
    'img_filename' => 'php-hotel-crud_snap.png',
    'alt_img_desc' => 'Hotel DB',
    'title' => 'Gestione Hotel DB',
    'description' => "gestione di un DB di un hotel tramite applicativo in PHP. Implementazione delle operazioni CRUD, utilizzo di query MySQL per interagire con il DB.",
    'technologies' => 'PHP, MySQL',
    'code_link' => 'https://github.com/renzocarara/php-hotel-crud',
    'site_link' => 'not_available'
], [
    'name' => 'spotifyweb',
    'img_filename' => 'spotifyweb_snap.png',
    'alt_img_desc' => 'spotifyweb',
    'title' => "Spotify web replica UI",
    'description' => "replica della pura interfaccia grafica della pagina principale del sito spotify web",
    'technologies' => 'HTML, CSS',
    'code_link' => 'https://github.com/renzocarara/html-css-spotifyweb',
    'site_link' => 'https://renzocarara.github.io/html-css-spotifyweb/'
], [
    'name' => 'rc_oldsite',
    'img_filename' => 'renzocarara_oldsite.png',
    'alt_img_desc' => 'renzo carara vecchi sito web',
    'title' => 'Renzo Carara, il mio primo sito web',
    'description' => "il mio primo sito web sviluppato completamente da autodidatta. Partendo da zero.",
    'technologies' => 'HTML, CSS, JS, PHP',
    'code_link' => 'https://github.com/renzocarara/cv-classic-rc',
    'site_link' => 'https://renzocarara.github.io/cv-classic-rc/'
]];
// ---------------------------------------------------------------------------------------

// ritorno una stringa JSON
echo json_encode($slide_DB);
?>