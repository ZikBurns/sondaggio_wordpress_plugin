<?php
/**
 * Plugin Name: Sondaggi
 * Description: The very first plugin that I have ever created.
 * Version: 1.0
 * Author: Pepe Calero
 */

   
function create_posttype() {
  
    register_post_type( 'sondaggi',
        array(
            'labels' => array(
                'name' => __( 'Sondaggi' ),
                'singular_name' => __( 'Sondaggi' )
            ),
            'public' => true,
            'has_archive' => true,
            'rewrite' => array('slug' => 'sondaggi'),
            'show_in_rest' => true,
  
        )
    );
}
add_action( 'init', 'create_posttype' );
//Add Custom Metabox
function diwp_custom_metabox(){
 
    add_meta_box( 
                    'diwp-metabox',
                    'Information',
                    'diwp_custom_metabox_callback',
                    'sondaggi',
                    'normal'
                );
}
 
add_action('add_meta_boxes', 'diwp_custom_metabox');
 
 
function diwp_custom_metabox_callback(){
     
    global $post;

    ?>
    <div class="row">
        <div class="label">Question</div>
        <div class="fields">
            <input type="text" name="sondaggi_question" value="<?php echo get_post_meta($post->ID, 'sondaggi_question', true)?>"/>
        </div>
		<div class="label">Answer 1</div>
        <div class="fields">
            <input type="text" name="sondaggi_answer1" value="<?php echo get_post_meta($post->ID, 'sondaggi_answer1', true)?>"/>
			<label for="sondaggi_result1">Nº:</label>
			<input type="number" size="1" name="sondaggi_result1" value="<?php echo get_post_meta($post->ID, 'sondaggi_result1', true)?>"/>
		</div>
		<div class="label">Answer 2</div>
        <div class="fields">
            <input type="text" name="sondaggi_answer2" value="<?php echo get_post_meta($post->ID, 'sondaggi_answer2', true)?>"/>
			<label for="sondaggi_result2">Nº:</label>
			<input type="number" size="1" name="sondaggi_result2" value="<?php echo get_post_meta($post->ID, 'sondaggi_result2', true)?>"/>
		</div>
    </div>
    <?php
 
}
 
function diwp_save_custom_metabox(){
 
    global $post;

    if(isset($_POST["sondaggi_question"])):
        update_post_meta($post->ID, 'sondaggi_question', $_POST["sondaggi_question"]);
    endif;
	if(isset($_POST["sondaggi_answer1"])):
        update_post_meta($post->ID, 'sondaggi_answer1', $_POST["sondaggi_answer1"]);
    endif;
	if(isset($_POST["sondaggi_answer2"])):
        update_post_meta($post->ID, 'sondaggi_answer2', $_POST["sondaggi_answer2"]);
    endif;
	if(isset($_POST["sondaggi_result1"])):
        update_post_meta($post->ID, 'sondaggi_result1', $_POST["sondaggi_result1"]);
    endif;
	if(isset($_POST["sondaggi_result2"])):
        update_post_meta($post->ID, 'sondaggi_result2', $_POST["sondaggi_result2"]);
    endif;
}
 
add_action('save_post', 'diwp_save_custom_metabox');

?> 
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>


<script>
function shoot_button(){
	var ele = document.querySelector('input[name="answer"]:checked').value;
	$.ajax({
	type: 'post',
	url: '../wp-admin/admin-ajax.php',
	data: {
		action: 'kill_em_all',
		answer: ele
	},
	success: function(data) {
		alert('AJAX call was successful!');
		alert('Data from the server' + data);
		console.log("Hello bor"+data);
	},
	error: function() {
		alert('There was some error performing the AJAX call!');
	}
	});
}
</script>
<?php

function kill_em_all(){
	$answer = $_POST['answer'];
	echo "My answer is:".$answer;
	console.log('Ciao a tutti');
	global $post;
	if(isset($_POST["sondaggi_result1"])):
        update_post_meta($post->ID, 'sondaggi_result1', 2);
    endif;
	return "My answer is:".$post;

}
add_action('wp_ajax_kill_em_all', 'kill_em_all');


function sondaggi_structure()
{
	global $post;
	$page = "/wordpress/results";
	$question = get_post_meta($post->ID, "sondaggi_question", true);
	$answer1 = get_post_meta($post->ID, "sondaggi_answer1", true);
	$answer2 = get_post_meta($post->ID, "sondaggi_answer2", true);
	$result1 = get_post_meta($post->ID, "sondaggi_result1", true);
	$result2 = get_post_meta($post->ID, "sondaggi_result2", true);
	$content = "<form>";
	$content .= "<p>$question</p>";
	$content .= "<input type='radio' id='answer1' name='answer' value='$answer1'>";
	$content .= "<label for='age1'>$answer1</label><br>	";
	$content .= "<input type='radio' id='answer2' name='answer' value='$answer2'>";
	$content .= "<label for='age1'>$answer2</label><br>	";
	$content .= "<input type='submit' value='Submit' id='submit' onClick='shoot_button()'>";
	$content .= "	</form>	";
	return $content;
}
add_shortcode('show_sondaggi','sondaggi_structure');

 ?>