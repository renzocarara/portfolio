<!DOCTYPE html>
<html lang="it">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, shrink-to-fit=no" />
    <meta name="Description" content="Renzo Carara - web developer - Portfolio - Invio messaggio" />
    <meta name="author" content="Renzo Carara" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link href="https://fonts.googleapis.com/css?family=Ubuntu:400,700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Tomorrow&display=swap" rel="stylesheet">

    <!-- favicon -->
    <link rel="icon" href="favicon/favicon.ico" />
    <link rel="shortcut icon" href="favicon/favicon.ico" />
    <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="favicon/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png">
    <link rel="manifest" href="/favicon/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">
    <meta name="msapplication-config" content="/favicon/browserconfig.xml">

    <!-- animate.css -->
    <link rel="stylesheet" href="node_modules/animate.css/animate.min.css">
    <!-- aos -->
    <link rel="stylesheet" href="node_modules/aos/dist/aos.css" />
    <!-- my css -->
    <link rel="stylesheet" href="public/css/style.css" />

    <title>Renzo Carara Web Developer Portfolio - Invio messaggio</title>

</head>
<?php 

if (isset($_GET)){

    switch ($_GET['sent']) {

        case 'true':
        // la pagina contact.php ha restituito "success", mail inviata
            $message = "<span class='light-color'><strong>Invio completato.</strong></span><br>
                    Risponderò nel più breve tempo possibile. <br>
                    Grazie.";
        break;
        
        case 'false':
            $message = "ATTENZIONE: invio del messaggio non riuscito. Si prega di riprovare.";
        break; 
        
        case 'data_error':
            $message = "ATTENZIONE: i dati inseriti non sono corretti. Si prega di riprovare.";
        break; 
        
        case 'antispam':
            $message = "ATTENZIONE: verifica antispam fallita! Si prega di riprovare.";
        break; 

        case 'captcha_nok':
            $message = "ATTENZIONE: captcha non spuntato! Si prega di riprovare.";
        break;
    
    default:
            $message = "";
        break;

    } 
}
?>
<body>
    <nav class="navbar bg-info bg-overlay navbar-expand-lg navbar-dark">
        <div class="container">
            <div>
                <!-- logo  e titolo -->
                <a class="navbar-brand" href="http://renzocarara.it"><img class="logo" src="public/assets/images/rc-logo.png" alt="renzocarara.it logo" />
                <h4 class="text-light d-inline-block">renzocarara.it</h4>
                </a>
            </div>
        </div>
    </nav>

    <section class="section-page bg-dark text-light">
        <div class="container">

            <h2><span class="light-color">I</span>nvio messaggio</h2>
            <div class="container mt-3">
                <div class="row">
                    <div class="col-12 col-md-8 col-lg-4 card text-secondary">
                        <div  class="card-body">
                            <h5 class="card-title text-dark">Esito:</h5>
                            <p class="card-text"><?php echo $message ?></p>
                        </div>
                    </div>
                </div> <!-- row -->
            </div> <!-- container -->
       
            <a class="text-light h4" href="https://renzocarara.it" data-toggle="tooltip" data-placement="bottom" title="Torna in Homepage">
            <i class="fas fa-arrow-alt-circle-left fa-2x mt-2"></i> Back
            </a>

        </div> <!-- container -->
    </section>

     <footer class="bg-info bg-overlay-footer text-light">
      <div class="container ">
         <div class="row">
            <div class="col-12 col-md-6 col-lg-4">
               <div class="mb-1 pt-3">
                  &copy; 2020 - Renzo Carara
               </div>
            </div>


            <div class="col-12 col-md-6 col-lg-4">
               <div class="mt-3 d-inlne-block">
                  <a href="https://www.iubenda.com/privacy-policy/11546089" class="iubenda-nostyle iubenda-embed iub-legal-only">Privacy Policy</a>
                  <script type="text/javascript">(function (w, d) { var loader = function () { var s = d.createElement("script"), tag = d.getElementsByTagName("script")[0]; s.src = "https://cdn.iubenda.com/iubenda.js"; tag.parentNode.insertBefore(s, tag); }; if (w.addEventListener) { w.addEventListener("load", loader, false); } else if (w.attachEvent) { w.attachEvent("onload", loader); } else { w.onload = loader; } })(window, document);</script>
               </div>
               <div class="d-inline-block">
                  <a title="Cookie Policy" href="https://www.iubenda.com/privacy-policy/11546089/cookie-policy" class="iubenda-nostyle iubenda-embed">Cookie Policy</a>
                  <script type="text/javascript">(function (w, d) { var loader = function () { var s = d.createElement("script"), tag = d.getElementsByTagName("script")[0]; s.src = "https://cdn.iubenda.com/iubenda.js"; tag.parentNode.insertBefore(s, tag); }; if (w.addEventListener) { w.addEventListener("load", loader, false); } else if (w.attachEvent) { w.attachEvent("onload", loader); } else { w.onload = loader; } })(window, document);</script>
               </div>
               <br>
               <a>
                  <!-- nota inserisco un data-delay di 200ms che mi ritarda la chiusura del popover quando perde il focus, altrimenti il click sul link che sta al suo interno non viene rilevato perchè la dismissione del popover arriva prima -->
                  <span id="footer-site-info" class="mb-3 d-inline-block footer-popover" tabindex="0" data-delay="200" data-html="true" data-placement="top" data-toggle="popover" data-trigger="focus" title="Questo sito utilizza le seguenti tecnologie:" data-content="<ul id='site-tech-list'>
                                  <li>HTML</li>
                                  <li>CSS3</li>
                                  <li>Sass</li>
                                  <li>Javascript</li>
                                  <li>AJAX</li>
                                  <li>Jquery</li>
                                  <li>Handlebars.js</li>
                                  <li>Bootstrap</li>
                                  <li>MySQL</li>
                                  <li>PHP</li>
                                  <li>SimpleBar (scrollbar personalizzate)</li>
                                  <li>Tiny Slider 2 (slider)</li>
                                  <li>Animate.css (animazioni al boot)</li>
                                  <li>AOS (animazioni allo scrolling)</li>
                                  <li>SendGrid (invio mail)</li>
                              </ul>
                              <a class='text-link' target='_blank' href='https://github.com/renzocarara/portfolio'>Vai al codice</a>
                          ">
                     Info sul sito
                  </span>
               </a>
            </div>

            <div class="col-12 col-md-12 col-lg-4">
               <div class="pt-3">
                  <a class="footer-link-img" href="https://www.boolean.careers/" target="_blank"><img class="footer-img" src="public/assets/images/boolean_white_logo.png" alt="logo boolean careers" data-html="true" data-toggle="tooltip" data-placement="top" title='La mia scuola <i class="fas fa-heart my-heart"></i>'></a>
                  <a class="footer-link-img" href="https://www.iubenda.com/" target="_blank"><img id="iubenda-img" src="public/assets/images/iubenda_logo.png" alt="logo iubenda" data-toggle="tooltip" data-placement="top" title="GDPR Manager"></a>
                  <a class="footer-link-img" href="https://www.altervista.org/" target="_blank"><img class="footer-img" src="public/assets/images/altervista_logo.png" alt="logo altervista" data-toggle="tooltip" data-placement="top" title="Il mio Hosting"></a>
               </div>
            </div>

         </div>
      </div>
   </footer>

    <!-- my js file -->
    <script src="public/js/main.js"></script>

</body>

</html>


                            