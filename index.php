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

// Enable Silex debugging
$app['debug'] = true;

// Setup application to recieve requests as JSON
$app->before(function (Request $request) {
  if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
    $data = json_decode($request->getContent(), true);
    $request->request->replace(is_array($data) ? $data : array());
  }
});

$app->after(function (Request $request, Response $response) use ($config) {
    $response->headers->set('Access-Control-Allow-Origin', $config->client_url);
});

// Main redirect when hitting the root
$app->get('/', function (Request $request) use ($app, $config) {
    return $app->redirect($config->main_redirect);
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

$app->run();

?>
