<?php
/**
 * Plugin Name: Sondaggi-Block
 * Description: This is a plugin demonstrating how to register new blocks for the Gutenberg editor.
 * Version: 1.1.0
 */
defined( 'ABSPATH' ) || exit;
require(dirname(__FILE__) . '/includes/gutenpride/gutenpride.php');
function sondaggi_block_script_register()
{
    register_block_type( __DIR__ );
}

add_action( 'init', 'sondaggi_block_script_register' );



/*
Plugin Name: Sidebar plugin

function sidebar_plugin_register() {
    wp_register_script(
        'plugin-sidebar-js',
        plugins_url( 'plugin-sidebar.js', __FILE__ ),
        array(
            'wp-plugins',
            'wp-edit-post',
            'wp-element',
            'wp-components'
        )
    );
}
add_action( 'init', 'sidebar_plugin_register' );
 
function sidebar_plugin_script_enqueue() {
    wp_enqueue_script( 'plugin-sidebar-js' );
}
add_action( 'enqueue_block_editor_assets', 'sidebar_plugin_script_enqueue' );
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
            'supports' => array(
                'custom-fields',
                'title'
            )
        )
    );
}
add_action( 'init', 'create_posttype' );

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
    $sondaggio = get_post_meta($post->ID, 'sondaggio', true)
    ?>
    <div class="row">
		<div class="label">Answer 1</div>
        <div class="fields">
            <input type="text" name="sondaggi_answer1" value="<?php if (isset($sondaggio)) {echo  $sondaggio[0]['text'];}?>"/>
			<label for="sondaggi_result1">Nº:</label>
			<input type="number" size="1" name="sondaggi_result1" value="<?php if (isset($sondaggio)) {echo $sondaggio[0]['count'];}?>"/>
		</div>
		<div class="label">Answer 2</div>
        <div class="fields">
            <input type="text" name="sondaggi_answer2" value="<?php if (isset($sondaggio)) {echo  $sondaggio[1]['text'];}?>"/>
			<label for="sondaggi_result2">Nº:</label>
			<input type="number" size="1" name="sondaggi_result2" value="<?php if (isset($sondaggio)) { echo $sondaggio[1]['count'];}?>"/>
		</div>
    </div>
    <?php

}

function diwp_save_custom_metabox(){
    // Autosave + Revision check 
    global $post;
    if ( array_key_exists( 'sondaggi_answer1', $_POST ) &&
         array_key_exists( 'sondaggi_result1', $_POST ) &&
         array_key_exists( 'sondaggi_answer2', $_POST ) &&
         array_key_exists( 'sondaggi_result2', $_POST ) 
    )
    {
    $sondaggio = [
         [
            'text' => $_POST["sondaggi_answer1"],
            'count' => $_POST["sondaggi_result1"]
        ],
        [
            'text' => $_POST["sondaggi_answer2"],
            'count' => $_POST["sondaggi_result2"]
        ],
    ];
    update_post_meta($post->ID, 'sondaggio',$sondaggio);
    }

}
 
add_action('save_post', 'diwp_save_custom_metabox');



function add_register_post_meta() {
    register_post_meta( 'sondaggi', 'sondaggio', 
        array(
            'single' => false,
            'type' => 'array',
            'show_in_rest' => array(
                'schema' => array(
                    'items' => array(
                        'type' => 'object',
                        'properties' => array(
                            'text' => array( 'type' => 'string' ),
                            'count' => array( 'type' => 'integer' )
                        )
                    )
                )
            )
        )
    ); 
}
add_action( 'init', 'add_register_post_meta' );
/*
function myguten_register_post_meta() {
    register_post_meta( 'post', 'myguten_meta_block_field', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
    ) );
}
add_action( 'init', 'myguten_register_post_meta' );
 */

//Insertar Javascript js y enviar ruta admin-ajax.php

add_action('wp_enqueue_scripts', 'insert_js');

function insert_js(){
    wp_enqueue_script('miscript',plugin_dir_url(__FILE__). '/js/script.js', array(), '3', true);
    wp_localize_script('miscript','ajax_obj',['ajaxurl'=>admin_url('admin-ajax.php')]);
}


//Devolver datos a archivo js

add_action('wp_ajax_nopriv_send','send_content');
add_action('wp_ajax_send','send_content');

function send_content()
{
    //verify nonce
    //wp_verify_nonce();

    if(isset($_POST['idson'])) $id_post = intval($_POST['idson']);
	$selected = strval($_POST['selected']);
    if (isset($selected)){
        $boxmeta = get_post_meta($id_post, 'sondaggio',true);
        $newboxmeta = get_post_meta($id_post, 'sondaggio',true);
        $newboxmeta[$selected]['count'] = $boxmeta[$selected]['count'] + 1 ;
        $status = update_post_meta($id_post, 'sondaggio',$newboxmeta);
    }

    $return = [$id_post,$selected,$boxmeta, $newboxmeta,$status ];
    wp_send_json($return);
	wp_die();
}
/*
add_action('wp_enqueue_scripts','visibility_controller');
function visibility_controller()
{
    if(isset($_COOKIE['sondaggioSent']))
    {
        wp_register_script( 'visibility-control', plugins_url( '/js/vis.js' , __FILE__ ) );
        wp_enqueue_script( 'visibility-control' );
    }
    else
    {
        wp_register_script( 'invisibility-control', plugins_url( '/js/invis.js' , __FILE__ ) );
        wp_enqueue_script( 'invisibility-control' );
    }
}
*/
