<?php get_header(); ?>
					<div id="heading">
						<?php if ( have_posts() ) 	the_post(); ?>
						<h1><strong>'<?php the_search_query(); ?>'</strong></h1>
						<div class="breadcrumbs">
							<?php if(function_exists('bcn_display')) {
								bcn_display();
							} ?>
						</div>
						<?php include (TEMPLATEPATH . '/searchform.php'); ?>
					</div>

					<div id="content">
						<div class="post_content">
							<?php rewind_posts(); ?>
							<?php if (have_posts()) :  ?> 
								<?php while ($wp_query->have_posts()) : $wp_query->the_post(); ?>
									<div class="posts">
										<div class="postcontent">
											<h2><a href="<?php the_permalink() ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a></h2>

											<div class="meta">
												<?php the_time('d F \o\m G:i'); ?> door <?php the_author_posts_link(); ?>
												<?php edit_post_link('(Bewerken)'); ?>
											</div>

											<?php the_excerpt(); ?>
										</div>
										<div class="cleaner">&nbsp;</div>
									</div>
								<?php endwhile; ?>
								<div class="cleaner">&nbsp;</div>

								<div class="navigation">
									<div class="floatleft"><?php next_posts_link('&larr; Ouder'); ?></div>
									<div class="floatright"><?php previous_posts_link('Nieuwer &rarr;'); ?></div>
								</div>

							<?php else : ?>
								<p class="title"><?php echo 'Sorry, niks gevonden!'; ?></p>
							<?php endif; ?>
							<?php wp_reset_query(); ?>
							<div class="cleaner">&nbsp;</div>
						</div>
						
						<div id="sidebar">
							<?php get_sidebar(); ?>
						</div>
						<div class="cleaner">&nbsp;</div>
					</div>
<?php get_footer(); ?>