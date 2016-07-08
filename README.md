## Testing Pays - PHP Shop Example

#### Setup the App
In order to install the application ensure that you have[ php v5.5](http://php.net/downloads.php) installed and [composer](https://getcomposer.org/download/). Then follow these steps :

- Clone the repo
- cd into the directory
- run `composer install`


#### Running the app
Once inside the apps directory run this command

`$ php -S localhost:8001`

This will launch the application which you can see at [localhost:8001](http://localhost:8001/).


#### Integrating with Realex / Testing Pays
In order to integrate with Realex we will use a [fork of omnipay-realex](https://github.com/ThePaymentWorks/omnipay-realex). This allows us to use both Testing Pays and Realex at once. In order to switch between them simply change the configuration settings as shown in the below example.

```js
// Create a gateway to make a request
$gateway = Omnipay::create('Realex_Remote');

// Choose an API to use
if(useTestingPays) {
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
  'firstName' => 'John',
  'lastName' => 'Doe',
  'number' => '4263970000005262', // Realex test card
  'cvv' => '222',
  'expiryMonth' => '08',
  'expiryYear' => '2017'
);

// Create a card from the form input data
$card = new CreditCard($formInputData);

$response = $gateway->purchase(array()
  'transactionId' => uniqid(), // A unique id
  'amount'        => '123',
  'currency'      => 'EUR', // 'USD', 'GBP' ect
  'card'          => $card
))->send();

if ($response->isRedirect()) {
  // redirect to offsite payment gateway
  return $response->redirect();
} else {
  // get the xml response
  return $response->getXML();
}
```


#### Customizing the shop

##### Products & Images
The details for products and their images are stored within the products.csv file found [here](assets/products/products.csv). The columns are organized as follows.

|Product Name|Product Image Name|Price|
|---|---|---|
|Mug|mug.jpg|4.1|
|Cup|cup.jpg|3.5|
|Plate|plate.jpg|6.25|

##### Styling
In order to style the application you can change the theme colors

To change the colors used in the application you can change the css variables within the styles.css file found [here](assets/styles/styles.css).
