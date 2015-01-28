<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr" lang="nl-NL">
	<head>
		<title><?php wp_title('|', '1', 'right'); bloginfo('name'); ?></title>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8" />

		<meta name="description" content="De website van Studievereniging Mens!" />

		<link rel="stylesheet" type="text/css" href="<?php bloginfo('stylesheet_url'); echo '?' . filemtime(get_stylesheet_directory() . '/style.css'); ?>" media="all" />
		<link rel="stylesheet" type="text/css" href="<?php bloginfo('template_directory'); ?>/_/css/segoe.css" />		
		<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Open+Sans:bold" />
		<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Droid+Sans" />
		<link rel="shortcut icon" href="<?php echo get_stylesheet_directory_uri(); ?>/favicon.ico" />

		<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />

		<?php wp_enqueue_script('jquery'); ?>
		<?php wp_head(); ?>
	</head>

	<body <?php body_class(); ?>>
		<div id="wrapper">
			<div id="inner-wrap">
				<div id="header">
					<div id="logo">
						<a href="<?php echo get_option('home'); ?>"><img src="<?php bloginfo('template_directory'); ?>/_/img/logo.png" alt="<?php bloginfo('name'); ?>" /></a>
					</div>
					
					<a href="https://www.facebook.com/pages/SV-Mens/161373863925386" target="_blank" title="Volg ons op Facebook!"><img src="<?php bloginfo('template_directory'); ?>/_/img/facebook.png" width="16" height="16" alt="Volg ons op Facebook!" /></a>

					<div id="menu">
						<?php wp_nav_menu( array('container' => 'menu', 'container_class' => '', 'menu_class' => 'dropdown', 'menu_id' => 'mainmenu', 'sort_column' => 'menu_order', 'theme_location' => 'primary' ) ); ?>
					</div>

					<div class="clear"></div>
				</div>

				<div id="main">