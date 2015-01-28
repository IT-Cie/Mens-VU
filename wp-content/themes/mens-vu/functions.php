<?php

/*-----------------------------------------------------------------------------------*/
/* Initializing Widgetized Areas (Sidebars)																			 */
/*-----------------------------------------------------------------------------------*/
 
/*----------------------------------*/
/* Homepage widgetized areas		*/
/*----------------------------------*/
 
register_sidebar(array(
'name'=>'Homepage Widgets',
'id' => 'home',
'before_widget' => '<div class="widget %1$s" id="%2$s">',
'after_widget' => '<div class="cleaner">&nbsp;</div></div>',
'before_title' => '<h3 class="title"><span>',
'after_title' => '</span></h3>',
));

 
/*----------------------------------*/
/* Sidebar							*/
/*----------------------------------*/
 
 register_sidebar(array(
'name'=>'Sidebar',
'id' => 'sidebar',
'before_widget' => '<div class="widget %1$s" id="%2$s">',
'after_widget' => '<div class="cleaner">&nbsp;</div></div>',
'before_title' => '<h3 class="title"><span>',
'after_title' => '</span></h3>',
));

/*----------------------------------*/
/* Footer widgetized areas		*/
/*----------------------------------*/

register_sidebar(array('name'=>'Footer: Column 1',
'before_widget' => '<div class="widget %1$s">',
'after_widget' => '</div>',
'before_title' => '<h3>',
'after_title' => '</h3>',
));

register_sidebar(array('name'=>'Footer: Column 2',
'before_widget' => '<div class="widget %1$s">',
'after_widget' => '</div>',
'before_title' => '<h3>',
'after_title' => '</h3>',
));

register_sidebar(array('name'=>'Footer: Column 3',
'before_widget' => '<div class="widget %1$s">',
'after_widget' => '</div>',
'before_title' => '<h3>',
'after_title' => '</h3>',
));

register_sidebar(array('name'=>'Footer: Column 4',
'before_widget' => '<div class="widget %1$s">',
'after_widget' => '</div>',
'before_title' => '<h3>',
'after_title' => '</h3>',
));


	function recent_news($args) {
		extract($args);
		$settings = get_option( 'widget_recent_news' );
		$number = $settings[ 'number' ];

		echo $before_widget;
		echo "$before_title"."$settings[title]"."$after_title"; ?>

		<ul class="news_widget">
			<?php
				$recent = new WP_Query( 'caller_get_posts=1&showposts=' . $number );
				while( $recent->have_posts() ) : $recent->the_post(); 
				global $post; global $wp_query;
			?>
			<li>
				<a href="<?php the_permalink(); ?>" rel="bookmark" title="<?php the_title(); ?>"><?php the_title(); ?></a>
				<span class="meta"><?php the_time('d F \o\m G:i'); ?></span>
			    <span class="category">
				    <?php if (in_category(get_cat_ID('Bestuursblog'))) { ?><a href="<?php echo esc_url(get_category_link(get_cat_ID('Bestuursblog'))); ?>"><img src="<?php bloginfo('template_directory'); ?>/_/img/bestuursblog.png" alt="Bestuursblog"/></a>
					<?php } else if (in_category(get_cat_ID('Nieuwsblog'))) { ?><a href="<?php echo esc_url(get_category_link(get_cat_ID('Nieuwsblog'))); ?>"><img src="<?php bloginfo('template_directory'); ?>/_/img/nieuwsblog.png" alt="Nieuwsblog" /></a><?php } ?>
				</span>
			</li>
			<?php endwhile; ?>
		</ul>

		<?php echo $after_widget;
	}
	
	function recent_news_admin() {
		$settings = get_option( 'widget_recent_news' );
		if( isset( $_POST[ 'update_recent_news' ] ) ) {
			$settings[ 'title' ] = strip_tags( stripslashes( $_POST[ 'widget_recent_news_title' ] ) );
			$settings[ 'number' ] = strip_tags( stripslashes( $_POST[ 'widget_recent_news_number' ] ) );
			update_option( 'widget_recent_news', $settings );
		} ?>

		<p>
			<label for="widget_recent_news_title">Title</label><br />
			<input type="text" id="widget_recent_news_title" name="widget_recent_news_title" value="<?php echo $settings['title']; ?>" size="40" /><br />
			<label for="widget_recent_news_number">How many items would you like to display?</label><br />
			<select id="widget_recent_news_number" name="widget_recent_news_number">
				<?php
					$settings = get_option( 'widget_recent_news' );
					$number = $settings[ 'number' ];
					$numbers = array( "1", "2", "3", "4", "5", "6", "7", "8", "9", "10" );
					foreach ($numbers as $num ) {
						$option = '<option value="' . $num . '" ' . ( $number == $num? " selected=\"selected\"" : "") . '>';
						$option .= $num;
						$option .= '</option>';
						echo $option;
					}
				?>
			</select>
		</p>

		<input type="hidden" id="update_recent_news" name="update_recent_news" value="1" />
	<?php }

	register_sidebar_widget( 'WPZOOM: Recent News', 'recent_news' );
	register_widget_control( 'WPZOOM: Recent News', 'recent_news_admin', 300, 200 );

	function my_login_head() {
		remove_action('login_head', 'wp_shake_js', 12);
	}
	add_action('login_head', 'my_login_head');
	function custom_excerpt_length( $length ) {
		return 70;
	}
	add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );
	function new_excerpt_more($more) {
		global $post;
		return ' [...]';
	}
	add_filter('excerpt_more', 'new_excerpt_more');	
	remove_action('wp_head', 'feed_links', 2);
	remove_action('wp_head', 'feed_links_extra', 3);
	remove_action('wp_head', 'rsd_link');
	remove_action('wp_head', 'wp_generator');
	remove_action('wp_head', 'wlwmanifest_link');

function change_display_name( $user_id ) {
    $info = get_userdata( $user_id );
	$args = array(
		'ID' => $user_id,
		'display_name' => $info->first_name . ' ' . $info->last_name
	);
    wp_update_user( $args );
}
add_action('user_register','change_display_name');
?>