<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'seriewp' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

define('SCRIPT_DEBUG', true);

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'Ib<(r;qK5S3nucKUhw?n]Uv:1F}LG9lSr=m|1^I0:mI@2VeojaUjC6qBzqt*F<hX' );
define( 'SECURE_AUTH_KEY',  'FTVW7l) 6KR4N+aK9|kRdOcd)y2Ku.FETFz`~b D|ww<>W/??`>w]lCOg>W{AzKZ' );
define( 'LOGGED_IN_KEY',    '.Wa<A7U1]]{p%`#n:s^3@py]hr@h=W%VR>mJQ]u[fs*GQ13:[iCDL1N^I[ N=Q60' );
define( 'NONCE_KEY',        'V,&Y,#b=I[n++VRYBRh,CnL4KAI0)_;}{FR*dWMoh9?8[h@m)Tw{qSKOH.yZA5CL' );
define( 'AUTH_SALT',        ' Ba^h8u:v=WQ^N?1f#GYR-1imGv-(0?Y >nupJ0;g^-;Zkj!:E,2NK(hBLj,6SR(' );
define( 'SECURE_AUTH_SALT', 'C17Qm)??!0OXf 2tcc%MLNo(5g TyJts+STg&$<DWr y(ulL#7:Cv fI7)3D;>M5' );
define( 'LOGGED_IN_SALT',   '([_*ot%3K]p0:;_TUoqv$k>1XT2}e<)WSk>kZX!S^If)xL{(:JBhr5(H9BI]nq6T' );
define( 'NONCE_SALT',       'NVT>L3#ri]rebQv3Y<+n*(c@Z+_1MwXf6c7Rp0?KeT{nA7IOfg#f{RZAhcmJtmKV' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'serieword';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', true );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
