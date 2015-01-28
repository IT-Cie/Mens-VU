<?php
	
  if ($_FILES["file"]["error"] > 0)
	{echo "Error: " . $_FILES["file"]["error"] . "<br>";}
  elseif (empty($_POST["course"]))
    {echo "Vak is verplicht";}
  elseif (empty($_POST["date"]))
    {echo "Datum is verplicht";}
  elseif (empty($_POST["new"]))
    {echo "Keuze of het een nieuw vak is is verplicht";}
  elseif ($_FILES["file"]["type"] != "application/pdf")
	{echo "Tentamens kunnan alleen geüpload worden in pdf formaat";}

  else{
  
    $course = $course1 = $date = $year = $new = "";
	$course1 = test_input(utf8_decode($_POST["course"]));
	$date = test_input($_POST["date"]);
	$year = test_input($_POST["year"]);
  	$new = test_input($_POST["new"]);
	
  if (preg_match("/[0-9]{2}\-[0-9]{2}\-[0-9]{4}/", $date))
  {list($dd,$mm,$yyyy) = explode('-',$date);
	if (!checkdate($mm,$dd,$yyyy)) {
        echo "Datum ongeldig";
		}}
  elseif (preg_match("/[0-9]{4}\-[0-9]{2}\-[0-9]{2}/", $date))
  {list($yyyy,$mm,$dd) = explode('-',$date);
	if (!checkdate($mm,$dd,$yyyy)) {
        echo "Datum ongeldig";
		}}
  else
  {echo "Datum is niet het juiste formaat";
  exit;}
  
  $course = str_replace("ë", "e", $course1);
	
  echo "Upload: " . $_FILES["file"]["name"] . "<br>";
  echo "Type: " . $_FILES["file"]["type"] . "<br>";
  echo "Size: " . ($_FILES["file"]["size"] / 1024) . " kB<br>";
  echo "Stored in: " . $_FILES["file"]["tmp_name"] . "<br><br>";
  
  echo " Vak: " . $course . "<br>";
  echo " Datum: " . $dd . "-" . $mm . "-" . $yyyy. "<br>";
  echo " Jaar: " . $year . "<br>";
  echo " Nieuw: " . $new . "<br>";

	//ftp
	$ftp_server = "top.few.vu.nl";
	$ftp_user = "menscie";
	$ftp_pass = "Mens13!";
	// set up a connection or die
	$conn_id = ftp_connect($ftp_server) or die("Couldn't connect to $ftp_server");
	// try to login
	if (@ftp_login($conn_id, $ftp_user, $ftp_pass)) {
		echo "Connected as $ftp_user@$ftp_server\n";}
	else {
		echo "Couldn't connect as $ftp_user\n";}
		
	// upload a file
	$dir = "www/mens-vu.nl/Tentamenbundel/" . $year . "/" . $course . "/";
	$name = $course . " " . $dd . "-" . $mm . "-" . $yyyy . ".pdf";
	
	echo $name;
	exit;
	
	ftp_chdir($conn_id, $dir);
	if (ftp_put($conn,'file.html', 'c:/wamp/www/site/file.html', FTP_ASCII)) {
		echo "successfully uploaded $file\n";}
	else {
		echo "There was a problem while uploading $file\n";}
		
		
	// close the connection
	ftp_close($conn_id);  

  }
  
  function test_input($data)
{
  $data = trim($data);
  $data = stripslashes($data);
  #$data = htmlspecialchars($data);
  return $data;
}
?>