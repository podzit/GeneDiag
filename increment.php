<?php

// Values
$file = 'assets/count.csv';
$length = 1024;

// Get form values
$value = htmlspecialchars($_POST['value']);

// Array construction
if (!empty($value)){
	$array = array(
		array($value)
	);
}

// File writing
if (!empty($value)){
	if ($f = @fopen($file, 'a')) {
        foreach ($array as $line) {
			fputcsv($f, $line);
		}
		fclose($f);
	}
}

?>