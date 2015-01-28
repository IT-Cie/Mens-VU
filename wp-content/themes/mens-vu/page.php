<?php get_header(); ?>
					<div id="heading">
						<h1><?php the_title(); ?></h1>
						<div class="breadcrumbs">
							<?php if(function_exists('bcn_display')) {
								bcn_display();
							} ?>
						</div>
						<?php include (TEMPLATEPATH . '/searchform.php'); ?>
					</div>
					
					<div id="content">
						<div class="post_content">
							<?php wp_reset_query(); if (have_posts()) : while (have_posts()) : the_post(); ?>
								<div class="entry">
									<?php the_content(); ?>
									<div class="cleaner">&nbsp;</div>
								</div>
								
							<?php endwhile; else: ?>
								<p><?php echo 'Sorry, niks om te laten zien!'; ?></p>
							<?php endif; ?>
							<div class="cleaner">&nbsp;</div>        
						</div>
					
						<div id="sidebar">
							<?php get_sidebar(); ?>
						</div>
						<div class="cleaner">&nbsp;</div>
					</div>
<?php get_footer(); ?>