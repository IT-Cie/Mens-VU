<?php
/**
 * The Header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="main">
 *
 * @package WordPress
 * @subpackage Twenty_Thirteen
 * @since Twenty Thirteen 1.0
 */
?><!DOCTYPE html>
<!--[if IE 7]>
<html class="ie ie7" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 8]>
<html class="ie ie8" <?php language_attributes(); ?>>
<![endif]-->
<!--[if !(IE 7) | !(IE 8)  ]><!-->
<html <?php language_attributes(); ?>>
<!--<![endif]-->
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width">
	<title><?php wp_title( '|', true, 'right' ); ?></title>
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<link rel="shortcut icon" href="<?php echo get_stylesheet_directory_uri(); ?>/favicon.ico" />
	<!--[if lt IE 9]>
	<script src="<?php echo get_template_directory_uri(); ?>/js/html5.js"></script>
	<![endif]-->
	<?php wp_head(); ?>
<!-- This can be enabled again, when everything is set to mens-vu.nl	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script> -->
	<script src="<?php bloginfo('stylesheet_directory'); ?>/js/jquery.min.js"></script>
</head>
	<script src="<?php bloginfo('stylesheet_directory'); ?>/js/responsiveslides.min.js"></script>
</head>
<body <?php body_class(); ?>>
	<div id="page" class="hfeed site">
		<header id="masthead" class="site-header" role="banner">

<!-- The slider in the header. Upload images to /images/headers in the theme directory. I recommend a size of 1600x481. A different size can be used, but the ratio should be 1080x325. If the image has a bigger height, only the top of it will be visible. If smaller, there will be a white bar visible on some screens/at a certain zoom level. -->
			<ul class="rslides">
			  <li><img src="<?php bloginfo('stylesheet_directory'); ?>/images/headers/header1.jpg" alt=""></li>
			  <li><img src="<?php bloginfo('stylesheet_directory'); ?>/images/headers/header2.jpg" alt=""></li>
			  <li><img src="<?php bloginfo('stylesheet_directory'); ?>/images/headers/header3.jpg" alt=""></li>
			  <li><img src="<?php bloginfo('stylesheet_directory'); ?>/images/headers/header4.jpg" alt=""></li>
			</ul>
			<a class="home-link" href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home" >
				<img src="<?php bloginfo('stylesheet_directory'); ?>/images/header-logo.png" alt="Logo" class="alignlogo" width="100%" />
			</a>
			<div id="navbar" class="navbar affix" data-spy="affix" data-offset-top="325" /*data-offset-bottom="200"*/>
				<nav id="site-navigation" class="navigation main-navigation" role="navigation">
					<h3 class="menu-toggle"><?php _e( 'Menu', 'twentythirteen' ); ?></h3>
					<a class="screen-reader-text skip-link" href="#content" title="<?php esc_attr_e( 'Skip to content', 'twentythirteen' ); ?>"><?php _e( 'Skip to content', 'twentythirteen' ); ?></a>
					<?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_class' => 'nav-menu' ) ); ?>
					<?php get_search_form(); ?>

				</nav><!-- #site-navigation -->
			</div><!-- #navbar -->
		</header><!-- #masthead -->

		<div id="main" class="site-main">