<?php
header('Content-Type: application/json');

$data = array( 1 => array ('sunny', 19, 0),
				2 => array ('sunny', 22, 0),
				3 => array ('cloudy', 9, 2),
				4 => array ('rainy', -5, 8),
				5 => array ('sunny', 10, 1),
                6 => array("poep met bruine suiker", 0, 300)
);

if (isset($_POST['day']))
{
	$day = $_POST['day'];

	if ($day >= 1 && $day <=6) 
	{
		echo json_encode($data[$day]);
	}
	else 
	{
		echo '';
	}
}
else 
{
	echo '';
}
?>
