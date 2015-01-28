				</div><!-- / #main -->
			</div><!-- / #inner-wrap -->

			<div id="footer">
				<div class="widgets">
					<div class="column">
						<?php dynamic_sidebar('Footer: Column 1'); ?>
					</div>
					<div class="column">
						<?php dynamic_sidebar('Footer: Column 2'); ?>
					</div>
					<div class="column">
						<?php dynamic_sidebar('Footer: Column 3'); ?>
					</div>
					<div class="column last">
						<?php dynamic_sidebar('Footer: Column 4'); ?>
					</div>
					<div class="cleaner">&nbsp;</div>
				</div>

				<div class="copyright">
					<div class="left"><p class="copy"><?php echo 'Copyright '; ?>&copy;<?php echo date(" 2008 - Y",time()); ?><b><?php echo ' Studievereniging Mens'; ?></b><br /><?php echo "*Deze pagina's vereisen een login."; ?></p></div>
					<div class="right"><p class="adres"><?php echo 'De Boelelaan 1081'; ?><br /><?php echo 'Kamer TK-18'; ?><br /><?php echo '1081 HV Amsterdam'; ?></p></div>
				</div>
			</div>
		</div><!-- / #wrapper -->

		<script type="text/javascript">
			var _gaq = _gaq || [];
			_gaq.push(['_setAccount', 'UA-33886139-1']);
			_gaq.push(['_trackPageview']);
			(function() {
				var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
				ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
				var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
			})();
		</script>
		<script type="text/javascript" src="http://mens-vu.nl/wp-content/themes/mens-vu/_/js/slides.js"></script>
		<script type="text/javascript" src="http://mens-vu.nl/wp-content/themes/mens-vu/_/js/schedule.js"></script>
		<script type="text/javascript" src="http://mens-vu.nl/wp-includes/js/jquery/ui/jquery.ui.core.min.js"></script>
		<script type="text/javascript" src="http://mens-vu.nl/wp-includes/js/jquery/ui/jquery.ui.widget.min.js"></script>
		<script type="text/javascript" src="http://mens-vu.nl/wp-includes/js/jquery/ui/jquery.ui.accordion.min.js"></script>
		<script type="text/javascript">
			jQuery(document).ready(function($) {
				$("#tentamenbundel").accordion ({
					autoHeight: false,
					navigation: true,
					collapsible: true,
					active: false
				});
			});
		</script>
		<?php wp_footer(); ?>
	</body>
</html>