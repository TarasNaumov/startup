
<?php
if (isset($_POST)) {
    // echo $_POST["item"];
    foreach ($_POST['item'] as $value) {
        echo "Selected item: " . htmlspecialchars($value) . "<br>";
    }
} else {
    echo "a";
}
?>