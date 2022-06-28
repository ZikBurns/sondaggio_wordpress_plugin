<?php
$answer = $_POST['answer'];

echo "Hola"$answer;
global $post;
if($answer==$answer1){
    $result1 = get_post_meta($post->ID, "sondaggi_result1", true);
    $result1 = $result1 + 1;
    if(isset($_POST["sondaggi_result1"])):
        update_post_meta($post->ID, 'sondaggi_result1', $result1);
    endif;
}
if($answer.tagName==$answer2){
    $result2 = get_post_meta($post->ID, "sondaggi_result2", true);
    $result2 = $result2 + 1;
    if(isset($_POST["sondaggi_result2"])):
        update_post_meta($post->ID, 'sondaggi_result2',$result2);
    endif;
}

$question = get_post_meta($post->ID, "sondaggi_question", true);
$answer1 = get_post_meta($post->ID, "sondaggi_answer1", true);
$answer2 = get_post_meta($post->ID, "sondaggi_answer2", true);
$result1 = get_post_meta($post->ID, "sondaggi_result1", true);
$result2 = get_post_meta($post->ID, "sondaggi_result2", true);
$results_summary = "<p>$sonsaggi_answer1 : $sondaggi_result1 </p>";
$results_summary .= "<p>$sonsaggi_answer2 : $sondaggi_result2 </p>";

return $results_summary;

?>