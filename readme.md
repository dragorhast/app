# Dragorhast App

[![Build Status](https://img.shields.io/travis/dragorhast/app.svg?style=flat-square)](https://travis-ci.org/dragorhast/app)
[![GitHub License](https://img.shields.io/github/license/dragorhast/app.svg?style=flat-square)](https://github.com/dragorhast/app/blob/master/license.md)
![Typescript Version](https://img.shields.io/badge/typescript-3.0%2B-blue.svg?style=flat-square)
[![GitHub issues](https://img.shields.io/github/issues/dragorhast/app.svg?style=flat-square)](https://github.com/dragorhast/app/issues)

The app repository contains the web app as well as the android / ios apps. The app has all the day-to-day functionality needed
of the booking app from reservations to admin management.

## Building & Installing

Building the web app is handled by webpack. Simply run the required command to build:

    yarn
    yarn android
    yarn ios
    yarn web-bundle
    
Then, simply install the app or deploy the bundle to your server of choice and point it to an instance of the 
[dragorhast/server](https://github.com/dragorhast/server).

## Development

To develop locally... todo

### Testing

Testing is done with Jest

// todo

### Linting

This project uses eslint and prettier to ensure that the code is consistent.
