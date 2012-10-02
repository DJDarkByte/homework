<?php

$data = array( 'KGH03' => 'Hieke Keuning',
				'ERR01' => 'Reindert-Jan Ekker',
				'AKB01' => 'Bram Abbekerk',
				'MLM01' => 'Mischa Mol',
				'OPC01' => 'Caroline Oosterkamp'
				);
				
if (isset($_GET['code'])) 
{
	$code = strtoupper($_GET['code']);
	if (isset($data[$code]))
	{				
		echo $data[$code];
	}
	else 
	{
		echo 'Onbekende code';
	}
}
else 
{
	echo '';
}
?>