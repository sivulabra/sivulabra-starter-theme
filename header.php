<?php
/**
 * Template for displaying the header
 */
?>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>
  <head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
  </head>
  <body <?php body_class(); ?>>
    <?php wp_body_open(); ?>
    <header class="site-header">
      <h1>Header</h1>
      <nav>
        <?php wp_nav_menu(
          [
            'theme_location'  => 'main-menu',
            'menu_id'         => 'main-menu'
          ]
        ); ?>
      </nav>
    </header>