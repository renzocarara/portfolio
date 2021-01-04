<?php

function connect_to_db()
{
    // includo il file con i parametri di connessione
    include 'db_config.php';

    // eseguo la connessione al DB
    $conn = new mysqli($servername, $username, $password, $dbname);
    return $conn;
}

function run_query($query)
{
    // DESCRIZIONE:
    // mi connetto al DB e se tutto ok eseguo la query ricevuta in ingresso

    // Connect
    $conn = connect_to_db();

    // Check connection
    if ($conn && $conn->connect_error) {
        return null;
    } else {
        // echo "Connection established";

        // Change character set to utf8 (per problema su lettere accentate..)
        $conn -> set_charset("utf8");

        $result = $conn->query($query);
        $conn->close();
        return $result;
    }
}

?>