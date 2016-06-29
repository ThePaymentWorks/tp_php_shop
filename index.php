<?php

use Omnipay\Common\CreditCard;
use Omnipay\Omnipay;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\ParameterBag;


require __DIR__.'/vendor/autoload.php';

// Set the timezone
date_default_timezone_set('Europe/Dublin');

// Create a basic Silex application
$app = new Application();
$app->register(new Silex\Provider\SessionServiceProvider());
$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__.'/views',
));

// Enable Silex debugging
$app['debug'] = true;

// Set the baseUrl for all templates
$app->before(function () use ($app) {
  $app['twig']->addGlobal('baseurl', $app['request']->getBaseUrl());
});

// Setup application to recieve requests as JSON
$app->before(function (Request $request) {
  if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
    $data = json_decode($request->getContent(), true);
    $request->request->replace(is_array($data) ? $data : array());
  }
});

// root route
$app->get('/', function () use ($app) {
  // Open the CSV file
  $file = fopen(__DIR__.'/assets/products/products.csv', 'r');

  // Load the CSV file
  $i = 0;
  while(! feof($file)) {
    $products[$i] = fgetcsv($file);
    $i++;
  }

  // Close the CSV file
  fclose($file);

  // Render the template
  return $app['twig']->render('index.twig', array(
    'products' => $products
  ));
});

// Display the users cart to them
$app->get('/cart', function () use ($app) {
  // Render the template
  return $app['twig']->render('cart.twig', array(
    'cart' => $app['session']->get('cart')
  ));
});

// Add a product to the cart
$app->post('/api/addtocart', function (Request $request) use ($app) {
  // Create an empty php object
  $product = new stdClass();

  // Assign properties to the product
  $product->name = $request->request->get('name');
  $product->price = $request->request->get('price');
  $product->quantity = $request->request->get('quantity');

  if(null !== $app['session']->get('cart')) {
    // Get the current array
    $cart = $app['session']->get('cart');

    // Get array keys
    $arrayKeys = array_keys($cart);
    // Fetch last array key
    $lastArrayKey = array_pop($arrayKeys);

    // Check if the item is already in the cart
    foreach ($cart as $key => $value) {
      // Check for a matching existing product
      if ($value->name == $product->name) {
        $value->quantity += $product->quantity;

        // Item found break out of the loop
        break;
      } else {
        // Check if this is the final element and push the array if it is
        if ($key == $lastArrayKey) {
          // Append the new products into the array
          array_push($cart, $product);
        }
      }
    }

    // Save the new cart into the session
    $app['session']->set('cart', $cart);

    // Return the new cart
    return $app->json($cart, 201);
  } else {
    // Set the cart to the current products
    $app['session']->set('cart', array($product));

    // Get the new carts values
    $cart = $app['session']->get('cart');

    // Return the new cart
    return $app->json($cart, 202);
  }
});

$app->get('/checkout', function () use ($app) {});

$app->run();

?>
