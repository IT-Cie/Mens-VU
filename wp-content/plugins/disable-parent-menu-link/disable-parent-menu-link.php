<?php
/*
Plugin Name: Disable Parent Menu Link
Description: A plugin which allows you to disable parent menu link created through wp_nav_menu function.
Author: Kapil Chugh
Plugin URI: http://www.mediologysoftware.com/wp-concierge/wp-concierge.html
Version: 0.1.3
*/

  add_action('wp_footer', 'disable_parent_menu_link');

  function disable_parent_menu_link () {
      wp_print_scripts('jquery');
?>
      <script type="text/javascript">
	if (jQuery("li.page_item").has("ul.children").length > 0) {
	  jQuery("li.page_item").has("ul.children").hover(function () {
            jQuery(this).children("a").removeAttr('href');
            jQuery(this).children("a").css('cursor', 'pointer');
            jQuery(this).children("a").click(function () {
              return false;
            });
          });
 	}
	else if (jQuery("li.menu-item").has("ul.sub-menu").length > 0) {
          jQuery("li.menu-item").has("ul.sub-menu").hover(function () {
            jQuery(this).children("a").removeAttr('href');
            jQuery(this).children("a").css('cursor', 'pointer');
            jQuery(this).children("a").click(function () {
              return false;
            });
          });
	}
      </script> 
<?php    
  }
?>
