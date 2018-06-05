## Testing Pays - PHP Shop Backend Example

#### Setup the App
In order to install the application ensure that you have[ php v5.5](http://php.net/downloads.php) installed and [composer](https://getcomposer.org/download/). Then follow these steps :

- Clone the repo
- CD into the directory
- Run `composer install`
- Copy the [config.php.examle](config.php.example) file as `config.php` and add your own credentials such as:
  - Realex Merchant ID
  - Realex secret
  - [Testing Pays](https://www.testingpays.com) API Key

#### Running the app
Once inside the apps directory run this command

`$ php -S localhost:8001`

The application consists of a single endpoint `/api/pay` where you can trigger payments being sent to Realex. The following parameters are needed for the API to function correctly:

* **firstName** - First name of the customer
* **lastName** - Last name of the customer
* **cardNumber** - Card number in text, without spaces, i.e. 4111111111111111
* **cvv** - 3 or 4 digit card verification code
* **expiryMonth** - 2 digit, zero padded month of the card's expiry date
* **expiryYear** - 2 digit, zero padded year of the card's expiry date
* **total** - amount to be charged, minimum 2 digits, sent as cent (i.e for €1.22 you should sent 122)
* **currency** - 3 letter ISO code of currency (EUR, USD, GBP, etc...)


#### Integrating with Realex / Testing Pays
In order to integrate with Realex we will use a [fork of omnipay-realex](https://github.com/ThePaymentWorks/omnipay-realex). This allows us to use both Testing Pays and Realex at once. In order to switch between them simply change the configuration settings as shown in the below example.

```php
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
  'currency'      => 'EUR', // 'USD', 'GBP' etc
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
