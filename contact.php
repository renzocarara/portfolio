<?php
// include delle funzioni per connettersi al DB ed eseguire query
include 'db_functions.php';

session_start();

// SendGrid
require("./sendgrid-php/sendgrid-php.php");
// includo la apiKey di SendGrid
include('send_grid_api_key.php');


// faccio qualcosa solo se è stato effettivamente premuto il bottone di invio
// if(isset($_POST['submit']) && !empty($_POST['submit'])){

// controllo se il re-captcha è flaggato
if(isset($_POST['g-recaptcha-response']) && !empty($_POST['g-recaptcha-response'])){

    $secret = '6LclxrMUAAAAAHes-fC6pgtNJab5O_lYNSa9fHrR'; // la mia chiave per il recaptcha (secret key)
    // tramite la mia chiave segreta, faccio la verifica re-captcha
    $verifyResponse = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=" . $secret . "&response=" . $_POST['g-recaptcha-response'] . "&remoteip=" . $_SERVER['REMOTE_ADDR']);

    $response = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret=__CHIAVE_SEGRETA__&response='.$_POST['g-recaptcha-response'].'&remoteip='.$_SERVER['REMOTE_ADDR']);

        $responseData = json_decode($verifyResponse);

        // verifico se la chiamata a google per il recaptcha a dato esito OK
        if($responseData->success){

            // controllo che tutti i campi del form siano fillati
            if(isset($_POST) && !empty($_POST['name'])
                                && !empty($_POST['email'])
                                && !empty($_POST['subject'])
                                && !empty($_POST['msg'])
                                && !empty($_POST['agree'])) {

                $user_name = $_POST['name'];
                $user_email = $_POST['email'];
                $user_subject = $_POST['subject'];
                $user_text = $_POST['msg'];
                $user_agree = $_POST['agree'];

                $txt = "Hai ricevuto una richiesta dal tuo modulo di contatto.

                Nome: $user_name
                Email: $user_email
                Oggetto: $user_subject
                Messaggio: $user_text
                Trattamento dati: $user_agree";

                $to = "renzo.carara@libero.it";
                $subject = "Messaggio dal sito renzocarara.it";

                // ////////////////////////////////////////// SENDGRID ///////////////////////////////////////////////////////
                // invio una email al gestore del sito (io!)
                $email = new \SendGrid\Mail\Mail();
                $email->setFrom("info@renzocarara.it", "renzocarara.it");     // indirizzo mittente
                $email->setSubject($subject);                                 // oggetto email
                $email->addTo($to);                                           // indirizzo destinatario
                $email->addContent("text/plain", $txt);                       // testo della email
                $sendgrid = new \SendGrid($send_grid_api_key);                // SendGrid api key
                try {
                    $response = $sendgrid->send($email);
                    // print $response->statusCode() . "\n";
                    // print_r($response->headers());
                    // print $response->body() . "\n";
                } catch (Exception $e) {
                    echo 'Caught exception: '. $e->getMessage() ."\n";
                }

                $status = $response->statusCode() == 202 ? 'sent=true' : 'sent=false';
                // ////////////////////////////////////////// SENDGRID ///////////////////////////////////////////////////////

                // scrivo nel DB il messaggio dell'utente
                // preparo una query per scrivere nella tabella "rc_website_msgs"
                $sql = "INSERT INTO rc_website_msgs (nome, email, oggetto, messaggio, quando, esito) VALUES ('$user_name', '$user_email', '$user_subject', '$user_text', NOW(), '$status')";
          
                 // eseguo la query
                $result = run_query($sql);

                if ($result) {
                    echo "scrittura nel DB riuscita";
                    }
                else{
                    echo "scrittura nel DB non riuscita";
                }

                if ($status == 'sent=true') { // l'invio della mail all'amministratore è andato bene
                    // invio l'email di conferma all'utente che ha lasciato il messaggio
                    $to = $user_email;
                    $subject = "Conferma ricezione messaggio";
                    // preparo anche la versione "plain/text" nel caso il gestore di posta dell'utente non interpreti la versione HTML
                    $txt = "Buongiorno,

Le confermo la ricezione del Suo messaggio.
La ricontatterò il prima possibile.
Grazie.
Renzo Carara

Di seguito i dettagli del Suo messaggio:

    Nome: $user_name
    Email: $user_email
    Oggetto: $user_subject
    Messaggio: $user_text

ATTENZIONE: non risponda a questo messaggio: è stato generato automaticamente e inviato da un indirizzo mail non abilitato a ricevere posta.";

// versione HTML del messaggio
// NOTA: anzichè questo codice HTML uso un template HTML costruito sul server Sendgrid
// ed al quale accedo tramite un ID che identifica quello specifico template
$txt_html = "<p>Buongiorno,</p>

<p>Le confermo la ricezione del Suo messaggio. <br>
    La ricontatterò il prima possibile. <br>
    Grazie. <br>
    Renzo Carara</p>

<p>Di seguito i dettagli del Suo messaggio:</p>

<ul>
    <li>Nome:  $user_name</li>
    <li>Email: $user_email</li>
    <li>Oggetto: $user_subject</li>
    <li>Messaggio: $user_text</li>
</ul>

<small>ATTENZIONE: non risponda a questo messaggio: è stato generato automaticamente e inviato da un indirizzo mail non abilitato a ricevere posta.</small>";

                    // ////////////////////////////////////////// SENDGRID ///////////////////////////////////////////////////////
                    $email = new \SendGrid\Mail\Mail();
                    $email->setFrom("info@renzocarara.it", "Renzo Carara");       // indirizzo mittente (virtuale)
                    $email->setSubject($subject);                                 // oggetto email
                    $email->addTo($to);                                           // indirizzo destinatario
                    $email->addContent("text/plain", $txt);                       // testo plain della email
                    $email->addContent("text/html", $txt_html);                   // testo HTML della mail
   
                    // uso il template che ho costruito sul sito di Sendgrid e che identifico tramite ID
                    $email->setTemplateId("d-87bf32e64bce48959c5f4d96d1ce74a4");
   
                    $sendgrid = new \SendGrid($send_grid_api_key);                // SendGrid api key
                    try {
                        $response = $sendgrid->send($email);
                        // print $response->statusCode() . "\n";
                        // print_r($response->headers());
                        // print $response->body() . "\n";
                    } catch (Exception $e) {
                        echo 'Caught exception: '. $e->getMessage() ."\n";
                    }
                    // ////////////////////////////////////////// SENDGRID ///////////////////////////////////////////////////////
                }
            }
            else
            {   // dati del form incompleti
                $status = 'sent=data_error';
                //  echo '<script>alert("ATTENZIONE: i dati inseriti non sono corretti. Pregasi riprovare.");window.history.go(-1)</script>';
            }
        }
        else {   // captcha not successful
            $status = 'sent=antispam';
            // echo '<script>alert("ATTENZIONE: verifica antispam fallita! Pregasi riprovare.");window.history.go(-1)</script>';
        }
}
else{ // captcha non flaggato
    $status = 'sent=captcha_nok';
    // echo '<script>alert("ATTENZIONE: Captcha non spuntato!");window.history.go(-1)</script>';
}

   header('Location: contact_result.php?' . $status);

//}

?>