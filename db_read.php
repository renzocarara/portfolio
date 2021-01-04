<?php
// ---------------------------------------------------------------------------------------

// include delle funzioni per connettersi al DB ed eseguire query
include 'db_functions.php';

// preparo una query per leggere tutta la tabella "rc_website_slides"
$sql = "SELECT * FROM rc_website_slides";

// eseguo la query
$result = run_query($sql);

if ($result && $result->num_rows > 0) {

    // preparo un array vuoto
    $data=[];

    // ciclo i risultati ottenuti dall'esecuzione della query riga per riga
    while ($row = $result->fetch_assoc()) { 
        
        // pusho la riga letta dal DB
        array_push($data, $row);  
    } 
    
    // ritorno una stringa JSON [{riga1}, {riga2}, ... {riga n}]
    echo json_encode($data);

    }
else{
    echo "lettura da DB NULLA";
}
                               
?>