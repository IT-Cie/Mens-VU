<?php
	/*
		Template Name: Inloggen
	*/
?>
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

					<?php if(is_user_logged_in()):?>
						<div id="content">
							<div class="post_content">
								<?php wp_reset_query(); if (have_posts()) : while (have_posts()) : the_post(); ?>
									<div class="entry">
										<?php the_content(); ?>
										<div class="cleaner">&nbsp;</div>
									</div>
								
								<?php endwhile; else: ?>
									<p><?php echo 'Sorry, niks om te laten zien!'; ?>.</p>
								<?php endif; ?>
								<div class="cleaner">&nbsp;</div>        
							</div>

							<div id="sidebar">
								<?php get_sidebar(); ?>
							</div>
							<div class="cleaner">&nbsp;</div>
						</div>

					<?php else: ?>
						<div id="content">
							<div class="post_content">
								<div class="entry">
									<p>Om deze pagina te bezichtigen moet je eerst inloggen.
									Heb je nog geen account? Klik dan op 'Registreer'!</p>
									<div class="cleaner">&nbsp;</div>
								</div>
								<div class="cleaner">&nbsp;</div>
							</div>

							<div id="sidebar">
								<?php get_sidebar(); ?>
							</div>
							<div class="cleaner">&nbsp;</div>
						</div>
					<?php endif; ?>
<?php get_footer(); ?>