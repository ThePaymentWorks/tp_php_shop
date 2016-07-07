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

#### Customizing the shop

##### Products & Images
The details for products and their images are stored within the products.csv file found [here](https://www.example.com). The columns are organized as follows. Note that the images are all .JPG files, this section is added within the `<img>` tag.

|Product Name|Product Image Name|Price|
|---|---|---|
|Mug|mug|4.1|
|Cup|cup|3.5|
|Plate|plate|6.25|

##### Styling
In order to style the application you can change the theme colors

To change the colors used in the application you can change the css variables within the styles.css file found [here](https://www.example.com).
