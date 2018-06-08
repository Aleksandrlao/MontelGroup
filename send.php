<?
    $mailto  = 'aleksandrlao@mail.ru'; //aleksandrlao@mail.ru, s.pukalov@ya.ru

// Поля с формой, если есть
$files = $_FILES["file"];


// Заголовки
$title = 'Заявка с КорпусМебель.Гардеробные';
$mailFrom = "zakaz@".$_SERVER['HTTP_HOST'];
$mess = '';

$headers = "MIME-Version: 1.0\n";
$headers .= "From:LP <$mailFrom>\n";

if ( !empty($files) ){ // Если есть приложенные файлы
    $boundary = md5(date('r', time()));
    $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";
} else { // Обычное сообщение
    $headers .= "Content-type: text/html; charset=utf-8\n";
}


// Проверяем заполнение формы
$mess .= "<style>table{border-collapse: collapse;}td{border:1px solid #000;margin:0;padding:5px;vertical-align:middle;}tr{width:40%}</style>";
$mess .= '<table cellspacing="0"><tbody>';
if ( !empty($_POST["name"]) )
    $mess .= "<tr><td>Имя клиента: </td><td>".clean( $_POST['name'] )."</td></tr>";
if ( !empty($_POST["tel"]) )
    $mess .= "<tr><td>Телефон: </td><td>".clean( $_POST['tel'] )."</td></tr>";

if ( !empty($_POST["input_type"]) )
    $mess .= "<tr><td>Тип заявки: </td><td>".clean( $_POST['input_type'] )."</td></tr><tr><td>&nbsp;</td><td> </td></tr>";

$mess .= '</tbody></table>';


// Прикрепляем файл к письму
if ( !empty($files) ){
    $mess .= "Content-Type: multipart/mixed; boundary=\"$boundary\"

--$boundary
Content-Type: text/plain; charset=\"utf-8\"
Content-Transfer-Encoding: 7bit

$mess";
    if( is_uploaded_file($_FILES['file']['tmp_name']) ){
         $attachment = chunk_split(base64_encode(file_get_contents($_FILES['file']['tmp_name'])));
         $filename = $_FILES['file']['name'];
         $filetype = $_FILES['file']['type'];
         $filesize += $_FILES['file']['size'];
         $mess.="

--$boundary
Content-Type: \"$filetype\"; name=\"$filename\"
Content-Transfer-Encoding: base64
Content-Disposition: attachment; filename=\"$filename\"

$attachment";
    }
   $mess.="
--$boundary--";
}

// Отправляем письмо, если есть телефон
if( !empty($_POST["name"]) ) {
    mail($mailto, $title, $mess, $headers);    
    echo "Сообщение отправлено успешно!\n","Включите JavaScript в браузере!";
} else {
    echo "Заполните поля имя или телефон!\n","Включите JavaScript в браузере!";
}


// Очистка данных
function clean($value = "") {
    $value = trim($value);
    $value = stripslashes($value);
    $value = strip_tags($value);
    $value = htmlspecialchars($value);

    return $value;
}
?>