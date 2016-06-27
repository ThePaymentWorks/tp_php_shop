<?php

use Omnipay\Common\CreditCard;
use Omnipay\Omnipay;
use Silex\Application;

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

// root route
$app->get('/', function () use ($app) {
  $products = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  return $app['twig']->render('index.twig', array(
    'products' => $products
  ));
});

$app->get('/cart', function () use ($app) {
  // Cart page
});

$app->get('/checkout', function () use ($app) {
  // Cart page
  // $gateway = Omnipay::create('Realex_Remote');
  //
  // $formData = array('number' => '4242424242424242', 'expiryMonth' => '6', 'expiryYear' => '2016', 'cvv' => '123', 'transactionId' => '1');
  //
  // $response = $gateway->purchase(array('amount' => '10.00', 'currency' => 'USD', 'card' => $formData, 'transactionId' => '1'))->send();
  //
  // if ($response->isSuccessful()) {
  //   // payment was successful: update database
  //   print_r($response);
  // } elseif ($response->isRedirect()) {
  //   // redirect to offsite payment gateway
  //   $response->redirect();
  // } else {
  //   // payment failed: display message to customer
  //   echo $response->getMessage();
  // }

});

$app->run();

?>
