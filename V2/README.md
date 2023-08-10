# ‘Vanilla’ Javascript Converter [![Awesome](https://awesome.re/badge.svg)

This web application allows users to convert between different currencies using
real-time exchange rates. It fetches the latest exchange rates from a public API
and provides a user-friendly interface for currency conversion.

## Features
1. Convert between various currencies using real-time exchange rates.
2. Select base and target currencies from dropdown menus.
3. Input the amount you want to convert and instantly see the converted amount.
4. Swap base and target currencies with the click of a button.
5. Display the current date and time of conversion.

## Getting Started
Follow these steps to set up and run the Currency Converter web app on your
local machine.

## Prerequisites
Basic understanding of HTML, CSS, and JavaScript.
Internet connection to fetch real-time exchange rates.

## Usage
1. Open the index.html file in your preferred web browser.
2. You'll find dropdown menus for selecting the base and target currencies. Choose the currencies you wish to convert between.
3. Enter the desired amount for conversion in the provided input field.
4. Click the "Convert" button to instantly see the converted amount along with the exchange rate.
5. For swift conversion reversal, click the "Swap" button to interchange base and target currencies.
6. The current date and time of the conversion are displayed at the top of the
page.


## How It Works
1. The application fetches the latest exchange rates using a public API and your
specified API key.
2. The fetched rates are utilized to calculate accurate conversions between the chosen base and target currencies.
3. Users input the amount they wish to convert, and the converted amount is calculated and displayed promptly.
4. The "Swap" button facilitates rapid toggling between base and target currencies
for convenient bidirectional conversion.

## Customization
You can personalize the web app by modifying the API_KEY in the JavaScript code to use your own API key for fetching exchange rates.
Tailor the visual appearance by editing the provided CSS in the styles.css file to match your preferences.

## Error Handling
If any issues arise while fetching exchange rates or performing conversions, the
application promptly communicates relevant error messages to the user.

## Credits
This project relies on exchange rate data sourced from the "Fixer API".
