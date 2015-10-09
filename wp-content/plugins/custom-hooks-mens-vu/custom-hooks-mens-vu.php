<?php

/*
Plugin Name: Custom Hooks for mens-vu.nl
*/

// Check of form veld username wel een VU-net_ID is
add_action( 'wpmem_pre_register_data', 'check_vu_net_id' );

function check_vu_net_id( $fields )
{

	global $wpmem_themsg;
    if( !preg_match("/^[a-z]{3}\d{3}$/", $fields['username']))
	{ 
		$wpmem_themsg = __( 'Het opgegeven VU-net-ID is niet geldig', 'wp-members' );
		return $wpmem_themsg;
		exit();
	}
	
	return $fields;
}

// Zelfde check voor standaard wp registratie
function check_vu_net_id_wp_login_register( $errors, $sanitized_user_login ) {

    if( !preg_match("/^[a-z]{3}\d{3}$/", $sanitized_user_login))
	{
        $errors->add( 'vu_net_id_error', __( '<strong>MISLUKT</strong>: Het opgegeven VU-net-ID is niet geldig.' ) );
    }
    
    return $errors;
}

add_filter( 'registration_errors', 'check_vu_net_id_wp_login_register', 10, 3 );


// Laat "VU-net-ID" zien op de registreren pagina
add_filter( 'wpmem_register_form', 'gebruik_vunetid_ipv_gebruikersnaam', 10, 4 );
 
function gebruik_vunetid_ipv_gebruikersnaam( $form, $toggle, $rows, $hidden )
{
 
    $form = str_replace( "Kies Gebruikersnaam", "VU-net-ID", $form );
 
    return $form;
}


// Laat "Je bent niet ingelogd" zien boven het login ding
add_filter( 'wpmem_sidebar_form', 'bij_aanmelding' );
 
function bij_aanmelding( $form )
{
	
	$form = str_replace( "You are not logged in", "Je bent niet ingelogd", $form );
	$form = str_replace( "Gebruikersnaam", "VU-net-ID", $form );
	
    return $form;
}

// Laat "Je bent ingelogd als {naam}" zien als je ingelogd bent
add_filter( 'wpmem_sidebar_status', 'aangemeld_als' );

function aangemeld_als( $str )
{
	
	global $current_user;
	$logout = apply_filters( 'wpmem_logout_link', $url . '/?a=logout' );
	$str = '<p>' . sprintf( __( 'Hoi %s!', 'wp-members' ), $current_user->first_name ) . '<br />
	  <a href="' . $logout . '">' . __( 'click here to log out', 'wp-members' ) . '</a></p>';

    return $str;
}

?>
