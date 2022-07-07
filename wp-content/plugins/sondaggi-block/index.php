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
    $sondaggio = get_post_meta($post->ID, 'sondaggio', true);
    $acount = count($sondaggio);
    $encoded_sondaggio = json_encode((array)$sondaggio);
    ?>
    
    <div class="row" id = "myRow">
        <input type="hidden" id="Anscount" name="Anscount" value=<?php echo $acount ?> >
    </div>
    <input type="button" onclick="insert_Row()" value="Insert row"> 
    <script>console.log(<?= json_encode($sondaggio); ?>);</script>
    <script> 
        var elenco = <?php echo $encoded_sondaggio ?>;
        console.log(elenco);
        for (i=0; i<elenco.length; i++) {
            index = i +1 ;
            //label general
            let label1 = document.createElement('div');
            label1.className = "label";
            label1.textContent = "Answer "+index;
            var ref = document.getElementById('myRow');

            //input 1
            let input1 = document.createElement('input');
            input1.type = "text";
            input1.name= "sondaggi_answer"+index;
            input1.value = elenco[i].text;
            
            //Label Nº
            let labeln = document.createElement('label');
            labeln.for = "sondaggi_result"+index;
            labeln.textContent = " Nº: ";

            //input 2
            let input2 = document.createElement('input');
            input2.type = "number";
            input2.name= "sondaggi_result"+index;
            input2.value = elenco[i].count;
            input2.readOnly = true;

            //Delete button
            let delbutton = document.createElement('button')
            delbutton.innerHTML = "X"
            delbutton.name = index
            delbutton.onclick = function(){
                console.log("Hola"+delbutton.name);
                document.getElementById('fields_'+delbutton.name).remove();
            }
            
            //fields general
            let fieldgeneral = document.createElement('div');
            fieldgeneral.className = "fields";
            fieldgeneral.id = "fields_"+index;
            fieldgeneral.appendChild(label1);
            fieldgeneral.appendChild(input1);
            fieldgeneral.appendChild(labeln);
            fieldgeneral.appendChild(input2);
            fieldgeneral.appendChild(delbutton);
            ref.appendChild(fieldgeneral);
        }

        

        function insert_Row(){
            var acount = document.getElementById('Anscount');
            let nextEle = parseInt(acount.value) +1;
            acount.value = parseInt(acount.value) +1;


            //label general
            let label1 = document.createElement('div');
            label1.className = "label";
            label1.textContent = "Answer "+nextEle;
            var ref = document.getElementById('myRow');
            
            
            //input 1
            let input1 = document.createElement('input');
            input1.type = "text";
            input1.name= "sondaggi_answer"+nextEle;
            input1.value = "<?php {echo  "";}?>";
            
            //Label Nº
            let labeln = document.createElement('label');
            labeln.for = "sondaggi_result"+nextEle;
            labeln.textContent = " Nº: ";

            //input 2
            let input2 = document.createElement('input');
            input2.type = "text";
            input2.name= "sondaggi_result"+nextEle;
            input2.value = "<?php {echo  0;}?>";
            input2.readOnly = true;
            
            //Delete button
            let delbutton = document.createElement('button')
            delbutton.innerHTML = "X"
            delbutton.onclick = function(){
                console.log("Hola"+nextEle);
                document.getElementById('fields_'+nextEle).remove();
                nextEle = parseInt(nextEle) +1;
            }

            //fields general
            let fieldgeneral = document.createElement('div');
            fieldgeneral.className = "fields";
            fieldgeneral.id = "fields_"+nextEle;
            fieldgeneral.appendChild(label1);
            fieldgeneral.appendChild(input1);
            fieldgeneral.appendChild(labeln);
            fieldgeneral.appendChild(input2);
            fieldgeneral.appendChild(delbutton);
            ref.appendChild(fieldgeneral);
            
        }
    </script>
    <?php

}

function diwp_save_custom_metabox(){
    // Autosave + Revision check 
    global $post;
    $index = 1;
    $sondaggio = [];
    for($i=1; $i<=$_POST['Anscount'];$i=$i+1){
        if(array_key_exists( 'sondaggi_answer'.strval($i), $_POST ))
        {
            array_push($sondaggio, 
            [
                'text' => $_POST["sondaggi_answer".strval($i)],
                'count' => $_POST["sondaggi_result".strval($i)]
            ] );
        }
    }
    
    update_post_meta( $post->ID, 'sondaggio', $sondaggio );
    

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


add_action('wp_enqueue_scripts', 'insert_js');

function insert_js(){
    wp_enqueue_script('miscript',plugin_dir_url(__FILE__). '/js/script.js', array(), false, true);
    wp_localize_script('miscript','ajax_obj',[
        'resturl'=>rest_url(),
        'nonce'=> wp_create_nonce('send')
    ]);
}

add_action('rest_api_init', 'register_routes');

function register_routes(){
    register_rest_route('baseURL/v1', '/endPoint', array(
        'methods' => 'POST',
        'callback' => 'restAPI_endpoint_callback',
        'args'     => [
			'selected' => [
				'required' => false,
				'type'     => 'string',
			],
            'action' => [
				'required' => true,
				'type'     => 'string',
			],
            'idson' => [
				'required' => true,
				'type'     => 'string',
			],
            'nonce' => [
				'required' => true,
				'type'     => 'string',
			],
		],
    ));
}

function restAPI_endpoint_callback($req){
    // Check for nonce security      
    //if ( ! wp_verify_nonce( $req['nonce'], 'send' ) ) die ( 'NOPE!');
    
    if(isset($req['idson'])) $id_post = intval($req['idson']);
	$selected = strval($req['selected']);
    $boxmeta = get_post_meta($id_post, 'sondaggio',true);
    $newboxmeta = get_post_meta($id_post, 'sondaggio',true);
    if (! empty($selected))
    {
        $newboxmeta[$selected]['count'] = $newboxmeta[$selected]['count'] + 1 ;
        $status = update_post_meta( $id_post, 'sondaggio', $newboxmeta );
    }
    
    $return = [$newboxmeta,$req['nonce'], "Hello world" ];
    
    return ($return);
}
