<?php get_header(); ?>
					<div id="heading">
						<?php if ( have_posts() ) 	the_post(); ?>
						<h1><?php echo 'Error 404 - Niks gevonden!'; ?></h1>
						<div class="breadcrumbs">
							<?php if(function_exists('bcn_display')) {
								bcn_display();
							} ?>
						</div>
						<?php include (TEMPLATEPATH . '/searchform.php'); ?>
					</div>
					
					<div id="content">
						<div class="post_content">
							<p><?php echo 'De pagina kon niet worden gevonden...'; ?></p>
						</div>
						
						<div id="sidebar">
							<?php get_sidebar(); ?>
						</div>
						<div class="cleaner">&nbsp;</div>
					</div>
<?php get_footer(); ?>