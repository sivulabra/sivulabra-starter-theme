<?php

// Get an array of JS and CSS assets
function get_manifest( $path ) {

  // Open manifest.json and decode it to get an array
  $manifest = file_get_contents( $path );
  $manifest = json_decode( $manifest, true );

  return $manifest;
}

// Get asset filename from the manifest
function get_asset_uri( $manifest, $asset ) {
  $manifest_asset = $manifest[ $asset ];
  return get_template_directory_uri() . '/assets/dist/' . '' . $manifest_asset;
}

add_action( 'wp_enqueue_scripts', function() {
  
  // Get assets manifest
  $manifest = get_manifest( get_template_directory() . '/assets/dist/manifest.json' );

  // Load runtime.js and each vendor package
  wp_enqueue_script( 'runtime-js', get_asset_uri( $manifest, 'runtime.js' ), [], null, true );

  $count = 1;

  foreach ( $manifest as $name => $path ) {
    if ( strpos( $name, 'package' ) !== false ) {
      wp_enqueue_script( 'sivulabra/package-' . $count, get_asset_uri( $manifest, $name ), [ 'jquery' ], null, true );
      $count++;
    }
  }

  // Load main stylesheet and JavaScript
  wp_enqueue_style( 'sivulabra-main-styles', get_asset_uri( $manifest, 'styles/main.css' ), false, null );
  wp_enqueue_script( 'sivulabra-main-js', get_asset_uri( $manifest, 'scripts/main.js' ), [ 'jquery' ], null, true );

} );