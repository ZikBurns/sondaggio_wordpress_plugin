<?php

/* Template Name: Products*/

?>

<?php get_header(); ?>

<?php

$args = array ( 
    'post_type' => 'post',
    'post_status' => 'publish',
    'posts_per_page' => 3
);

$loop = new WP_Query($args);

if ($loop->have_posts()):
    while ($loop->have_posts() ): $loop-> the_post();
        the_title();
        the_post_thumbnail();
    endwhile;
endif;
?>
<?php get_footer(); ?>