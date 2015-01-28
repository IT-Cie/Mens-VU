<?php get_header(); ?>
					<div id="heading">
						<?php if ( have_posts() ) 	the_post(); ?>
						<h1>
							<?php /* category archive */ if (is_category()) { ?><?php single_cat_title(); ?>
							<?php /* author archive */ } elseif (is_author()) { ?><?php printf( get_the_author() ); ?><?php } ?>
						</h1>
						<div class="breadcrumbs">
							<?php if(function_exists('bcn_display')) {
								bcn_display();
							} ?>
						</div>
						<?php include (TEMPLATEPATH . '/searchform.php'); ?>
					</div>

					<div id="content">
						<div class="post_content blog">
							<?php include(TEMPLATEPATH . '/recent_posts.php'); ?>
						</div>

						<div id="sidebar">
							<?php get_sidebar(); ?>
						</div>
						<div class="cleaner">&nbsp;</div>
					</div>
<?php get_footer(); ?>