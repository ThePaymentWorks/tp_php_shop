<?php

use Omnipay\Common\CreditCard;
use Omnipay\Omnipay;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ParameterBag;

require __DIR__.'/vendor/autoload.php';
$config = include('config.php');

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

$app->after(function (Request $request, Response $response) {
    $response->headers->set('Access-Control-Allow-Origin', '*');
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
    'cart' => $app['session']->get('cart'),
    'total' => $app['session']->get('total')
  ));
});

$app->get('/checkout', function () use ($app) {
  // Render the template
  return $app['twig']->render('checkout.twig', array(
    'total' => $app['session']->get('total')
  ));
});

// Make a request to the realex API
$app->post('/api/pay', function (Request $request) use ($app, $config) {
  // Create a gateway to make a request
  $gateway = Omnipay::create('Realex_Remote');

  // Check which api the user wants to use
  if($request->request->get('api') == 'testingpays') {
    // Set the default testingpays api settings
    $gateway->setEndpoint($config->testingpays_endpoint);
    $gateway->setMerchantId($config->testingpays_merchantId);
    $gateway->setAccount($config->testingpays_account);
    $gateway->setSecret($config->testingpays_secret);
  } else {
    // Set the default realex api settings
    $gateway->setMerchantId($config->realex_merchantId);
    $gateway->setAccount($config->realex_account);
    $gateway->setSecret($config->realex_secret);
  }

  $formInputData = array(
    'firstName' => $request->request->get('firstName'),
    'lastName' => $request->request->get('lastName'),
    'number' => $request->request->get('cardNumber'),
    'cvv' => $request->request->get('cvv'),
    'expiryMonth' => $request->request->get('expiryMonth'),
    'expiryYear' => $request->request->get('expiryYear')
  );

  $card = new CreditCard($formInputData);

  $response = $gateway->purchase(array(
    'transactionId' => uniqid(),
    'amount'        => $request->request->get('total'),
    'currency'      => $request->request->get('currency'),
    'card'          => $card
  ))->send();

  if ($response->isRedirect()) {
    // redirect to offsite payment gateway
    return $response->redirect();
  } else {
    // Get the XML response
    return $response->getXML();
  }
});

// Add a product to the cart
$app->post('/api/addtocart', function (Request $request) use ($app) {
  // Create an empty php object
  $product = new stdClass();

  // Assign properties to the product
  $product->name = $request->request->get('name');
  $product->price = $request->request->get('price');
  $product->quantity = $request->request->get('quantity');
  $product->total = $request->request->get('price');

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
        $value->total += $product->price;

        // Update the carts total
        $total = $app['session']->get('total');
        $total += $product->price;
        $app['session']->set('total', $total);

        // Item found break out of the loop
        break;
      } else {
        // Check if this is the final element and push the array if it is
        if ($key == $lastArrayKey) {
          // Append the new products into the array
          array_push($cart, $product);

          // Update the carts total
          $total = $app['session']->get('total');
          $total += $product->price;
          $app['session']->set('total', $total);
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

    // Update the carts total
    $total = $app['session']->get('total');
    $total += $product->price;
    $app['session']->set('total', $total);

    // Return the new cart
    return $app->json($cart, 202);
  }
});

$app->post('/api/emptycart', function () use ($app) {
  $app['session']->set('cart', null);
  $app['session']->set('total', null);
  return 'Cart emptied';
});

$app->run();

?>
