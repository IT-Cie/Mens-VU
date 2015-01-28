<?php get_header(); ?>
					<div id="heading">
						<h1>Home</h1>
						<div class="breadcrumbs">
							Snel naar:
							<a title="Ga naar Tentamenbundel" href="https://mens-vu.nl/onderwijs/tentamenbundel/">Tentamenbundel</a> -
							<a title="Ga naar Foto's" href="https://mens-vu.nl/media/fotos/">Foto's</a> -
							<a title="Ga naar Over Mens" href="https://mens-vu.nl/vereniging/over-mens/">Over Mens</a> -
							<a title="Ga naar Over MNW" href="https://mens-vu.nl/onderwijs/over-mnw/">Over MNW</a> -
							<a title="Ga naar Boekverkoop" href="https://mens-vu.nl/onderwijs/boekverkoop/">Boekverkoop</a> -
							<a title="Ga naar Nieuwsbrief" href="https://mens-vu.nl/media/de-nieuwsbrief/">Nieuwsbrief</a>
						</div>
						<?php include (TEMPLATEPATH . '/searchform.php'); ?>
					</div>

					<div id="content">
						<div class="post_content blog">
							<div class="sticky">
								<?php wp_reset_query(); query_posts('cat=3&showposts=1'); ?>
								<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
									<div class="entry">
										<h2><a href="<?php the_permalink() ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a></h2>
										<div class="meta">
											<?php the_time('d F \o\m G:i'); ?> door <?php the_author_posts_link(); ?> in <?php the_category(' '); ?>
											<?php edit_post_link('(Bewerken)', ' '); ?>
										</div>
										<span class="excerpt"><?php the_excerpt(); ?></span>
										<div class="cleaner">&nbsp;</div>
									</div>
								<?php endwhile; else: ?>
									<p><?php echo 'Sorry, niks om te laten zien!'; ?>.</p>
								<?php endif; ?>
								<div class="cleaner">&nbsp;</div>
							</div>

							<?php wp_reset_query(); query_posts('cat=1&showposts=4'); ?>
							<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
								<div class="entry">
									<h2><a href="<?php the_permalink() ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a></h2>
									<div class="meta">
										<?php the_time('d F \o\m G:i'); ?> door <?php the_author_posts_link(); ?> in <?php the_category(' '); ?>
										<?php edit_post_link('(Bewerken)', ' '); ?>
									</div>
									<span class="excerpt"><?php the_excerpt(); ?></span>
									<div class="cleaner">&nbsp;</div>
								</div>
								
							<?php endwhile; else: ?>
								<p><?php echo 'Sorry, niks om te laten zien!'; ?>.</p>
							<?php endif; ?>
							<div class="cleaner">&nbsp;</div>

							<a href="https://mens-vu.nl/category/nieuwsblog/" class="category_button" style="background-color: #FE4800;border: none;color: white;font-family: 'Segoe UI Bold', Arial, Sans-Serif;font-size: 13px;padding: 1px 10px;cursor: pointer; float: right; margin: 15px 15px 0px 0px;">&rarr; Nieuwsblog &larr;</a>
							<a href="https://mens-vu.nl/category/bestuursblog/" class="category_button" style="background-color: #FE4800;border: none;color: white;font-family: 'Segoe UI Bold', Arial, Sans-Serif;font-size: 13px;padding: 1px 10px;cursor: pointer; float: left; margin: 15px 0px 0px 25px;">&rarr; Bestuursblog &larr;</a>
						</div>

						<div id="sidebar"><?php get_sidebar(); ?></div>
						<div class="cleaner">&nbsp;</div>
					</div>
<?php get_footer(); ?>
