# dive-and-collect


## Table of contents
* [Introduction](#introduction)
* [Technologies](#technologies)
* [Setup](#setup)
  

## Introduction
DIVE & COLLECTION BACKEND API & Backoffice

## Technologies
Project is created with:

- PHP: 8.1 or higher.
- MySQL
- Composer
- Symfony 6.2 has a _build-in web server_ you do not need Apache or Ngnx to run this project. Thanks Symfony :)


## Setup

### Install Composer Mac

```sh
$ sudo curl -sS https://getcomposer.org/installer | php
$ mv composer.phar /usr/local/bin/composer
$ sudo nano /etc/bashrc
$ add this content to the file above alias composer="php /usr/local/bin/composer"
$ source /etc/bashrc
```

### Install Project

```sh
$ cd my-project-name
$ composer install
$ php bin/console cache:clear
```

### Environment

Open the file .env and configure your database connection (user, password and database_name)

```sh
DATABASE_URL=mysql://user:password@127.0.0.1:3306/database_name
```

### Creating database

> execute the command line to create your database

```sh
$ php bin/console doctrine:database:create
```

> lets commit the migration

```sh
$ php bin/console doctrine:migrations:migrate
```

### Load fixtures

> execute the command line to hydrate your database

```sh
$ php bin/console doctrine:fixtures:load
```

### Running

```sh
$ php bin/console server:run
```


