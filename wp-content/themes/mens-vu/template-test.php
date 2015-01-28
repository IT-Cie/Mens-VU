<?php
	/*
		Template Name: Test
excerpt: 15
.blog {
	width: 45%;
	position: relative;
	float: left
}
	*/
?>
<?php get_header(); ?>
						<div id="content">
							<div class="blog">
								<h1>Nieuwsblog</h1>
								<?php wp_reset_query(); query_posts('cat=1&showposts=2'); ?>
								<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
									<div class="entry two">
										<?php the_title(); ?>  
										<?php the_excerpt(); ?>
										<div class="cleaner">&nbsp;</div>
									</div>
								
								<?php endwhile; else: ?>
									<p><?php echo 'Sorry, niks om te laten zien!'; ?>.</p>
								<?php endif; ?>
								<div class="cleaner">&nbsp;</div>
							</div>

							<div class="blog">
								<h1>Bestuursblog</h1>
								<?php wp_reset_query(); query_posts('cat=3&showposts=2'); ?>
								<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
									<div class="entry two">
										<span class="title"><?php the_title(); ?></span>
										<span class="excerpt"><?php the_excerpt(); ?></span>
										<div class="cleaner">&nbsp;</div>
									</div>
								
								<?php endwhile; else: ?>
									<p><?php echo 'Sorry, niks om te laten zien!'; ?>.</p>
								<?php endif; ?>
								<div class="cleaner">&nbsp;</div>
							</div>
							<div class="cleaner">&nbsp;</div>
						</div>
<?php get_footer(); ?>
