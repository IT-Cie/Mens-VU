<?php

/**
 * The functions.php of a child theme  is loaded in addition to the parent’s functions.php. 
 * (Specifically, it is loaded right before the parent’s file.)
 */


function remove_more_link_scroll( $link ) {
	$link = preg_replace( '|#more-[0-9]+|', '', $link );
	return $link;
}
add_filter( 'the_content_more_link', 'remove_more_link_scroll' );
?>