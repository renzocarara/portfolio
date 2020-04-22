<!-- MOTA: questo file è una versione alternativa del file contact.php,
utilizza la funzione php "mail()", anzichè sfruttare la libreria SendGrid,
per l'invio delle mail -->

<?php
session_start();

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
                $user_text = ($_POST['msg']);
                $user_agree = $_POST['agree'];

                $txt = utf8_decode("Hai ricevuto una richiesta dal tuo modulo di contatto.
                Nome: $user_name
                Email: $user_email
                Oggetto: $user_subject
                Messaggio: $user_text
                Trattamento dati: $user_agree");

                // invio l'email al gestore del sito (io!)
                $to = "renzo.carara@libero.it";
                $subject = "Messaggio dal sito renzocarara.it";
                $headers = "From: $user_email";
                $mail_to_admin_result = mail($to, $subject, $txt, $headers);
                $status = $mail_to_admin_result ? 'sent=true' : 'sent=false';
                // echo '<script>alert("Messaggio inviato correttamente");window.history.go(-1)</script>';

                sleep(3); // dò fiato al server php mail()

                // // invio l'email di conferma all'utente che ha lasciato un messaggio
                $to = $user_email;
                $subject = "Conferma ricezione messaggio";
                $headers = "From: info@renzocarara.it";
                $txt =  utf8_decode("Buongiorno,
Le confermo la ricezione del Suo messaggio.
La ricontatterò il prima possibile.
Grazie.
Di seguito i dettagli del Suo messaggio:
    Nome: $user_name
    Email: $user_email
    Oggetto: $user_subject
    Messaggio: $user_text
ATTENZIONE: non risponda a questo messaggio: è stato generato automaticamente e inviato da un indirizzo mail non abilitato a ricevere posta.");


                $mail_to_user_result = mail($to, $subject, $txt, $headers);
            }
            else
            {
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
