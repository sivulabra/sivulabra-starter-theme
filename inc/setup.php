<?php

add_action( 'after_setup_theme', function() {
  
  // Let WordPress manage the document title
  add_theme_support( 'title-tag' );

  // Enable support for Post Thumbnails on posts and pages
  add_theme_support( 'post-thumbnails' );

  // Switch default markup to output valid HTML5
  add_theme_support(
    'html5',
    [
      'search-form',
      'comment-form',
      'comment-list',
      'gallery',
      'caption',
      'style',
      'script'
    ]
  );

  // Register nav menus
  register_nav_menus([
    'main-menu' => 'Päävalikko'
  ]);

} );