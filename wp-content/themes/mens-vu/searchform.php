<form method="get" id="searchform" action="<?php bloginfo('url'); ?>/">
	<fieldset>
		<input id="s" type="text" name="s" value="<?php echo 'Site doorzoeken'; ?>" maxlength="500" onfocus="if (this.value == '<?php echo 'Site doorzoeken'; ?>') {this.value = '';}" onblur="if (this.value == '') {this.value = '<?php echo 'Site doorzoeken'; ?>';}" />
		<input title="Zoeken" id="searchsubmit" type="submit" style="background-image:url('http://mens-vu.nl/wp-content/themes/mens-vu/_/img/search.png');" value="" />
	</fieldset>
</form>