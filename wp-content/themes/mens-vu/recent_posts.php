<?php rewind_posts(); ?>

<?php if (is_front_page()) {
	$z = count($wpzoom_exclude_cats_home);if ($z > 0) {
		$x = 0; $que = ""; while ($x < $z) {
			$que .= "-".$wpzoom_exclude_cats_home[$x]; $x++;
		if ($x < $z) {$que .= ",";} } 
	}
	query_posts($query_string . "&cat=$que"); }
	if (have_posts()) :
?>
<?php $odd_or_even = 'odd'; ?>
<?php while ($wp_query->have_posts()) : $wp_query->the_post(); ?>
	<div class="posts <?php echo $odd_or_even; ?>">
		<?php $odd_or_even = ('odd'==$odd_or_even) ? 'even' : 'odd'; ?>
		<div class="postcontent blog">
			<h2><a href="<?php the_permalink() ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a></h2>

			<div class="meta">
				<?php the_time('d F \o\m G:i'); ?> door <?php the_author_posts_link(); ?> in <?php the_category(' '); ?>
				<?php edit_post_link('(Bewerken)', ' '); ?>
			</div>

			<?php the_excerpt(); ?>
		</div>
		<div class="cleaner">&nbsp;</div>
	</div>
<?php endwhile; ?>
<div class="cleaner">&nbsp;</div>

<div class="navigation">
	<div class="floatleft"><?php next_posts_link('&larr; Oudere Berichten'); ?></div>
	<div class="floatright"><?php previous_posts_link('Nieuwere Berichten &rarr;'); ?></div>
</div>

<?php else : ?>
	<p class="title"><?php echo 'Sorry, niks om te laten zien!'; ?></p>
<?php endif; ?>

<?php wp_reset_query(); ?>
<div class="cleaner">&nbsp;</div>