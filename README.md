# Online-Store REACT & NODEJS

A prototype for an ecommerce web application developed as a personal project to learn
REACT and NODEJS.

It is **NOT MAINTAINED** anymore and currently it's kept to gather the
knowledge and future reference.

## Online-Store Showcase

![showcase](/docs/images/showcase.gif "showcase")

### Designs and images

Every image and design used in this repository is **private property** and cannot be used by a third party with lucrative purposes.

## Main features and functionalities

A part from the responsive view that works for almost any of the most common
screen kinds (laptop, tablet and mobile), this web app is prepared to work
as an ecommerce platform that offers the most common features we can find in such
software:

* Product listing
* Shopping cart
* Paypal checkout
* Confirmation emails

## Architectural dependencies and details

This web application is prepared to work as the central part of an eccommerce microservice
architecture. It relies in 3 other components to be able to fulfil its purpose.

![online-store architecture](/docs/images/online-store-architecture-diagram.png "online-store architecture")

* Database (MongoDB): The system was developed using a Mongo atlas testing database to store the products
information. The connection string must be present in the "MONGO_ATLAS_URI" env var when starting
the server. The [product schema] and a [product list example] can be found in the server directory.
Please take into account that the product images are private files that I added in my local version of
the repo, you will have to provide your owns. The example json can be used with the server route "/products/addmany"
to populate the database, see the first [curl example], currently this route code is commented because no security
was added to the server.

* Payment service (Paypal): Using the paypal sandbox we can set an testing environment where every transaction is
isolated and takes place without using real money, of course. Since the website doesn't require the
clients to sign up, we take every piece of information that is needed to manage and order from paypal
(customer name, email, address, transaction details...) so Paypal is by design a mandatory piece.
The env vars that must be set are "PAYPAL_CLIENT_ID", "REACT_APP_PAYPAL_CLIENT_ID" and "PAYPAL_SECRET_ID".

* Email server (Gmail): To be able to send emails we rely on [Nodemailer]. In its team's own words "It is a
module for Node.js applications to allow easy as cake email sending". We configured the module to work
with the Gmail SMTP server, so we need to provide the application email and password as the env vars
"SELLER_EMAIL" and "SELLER_EMAIL_PASSWORD".

For developing purposes every env var can be set in the [.env] file. It is clean in the current
version of the repo and the content that it has before (password and secrets) is not valid anymore,
you will have to provide your owns.

[product schema]: /server/models/product.model.js
[product list example]: /server/testUtilities/testJsonProduct.txt
[curl example]: /server/testUtilities/curl.txt
[Nodemailer]: https://nodemailer.com/about/
[.env]: /.env

## How to use it

This project includes both the frontend (REACT) and the backend (NODEJS). In order to run
the project take a look to the [package.json] and see the scripts section to know how to
run the client (frontend), the server or both.

Remember that is a **mandatory** requirement to have **node** and **npm** both installed in your machine.
Once we have a proper DOCKERFILE to build a development image those requirements won't be needed.

[package.json]: /package.json

### Starting frontend and backend in development mode

First of all make sure you understand the [Architectural dependencies and details](#architectural-dependencies-and-details)
section and set the needed environment variables to access mongoDB, the payment service and the email server. Later with
the fresh cloned repo, you can run:

```shell
$ npm install
$ npm run dev
```

Or you can also use yarn if you fancy ;)

## TO-DOs an enhancements

In this section i will be gathering the enhancements that could be done in order to have
a functional and secure state of the art ecommerce software.

Fucntional enhancements:
* Authentication for client and seller
* Seller dashboard
* Cookie management
* Fine error handling
* Fix email format

Operational enhancements:
* Docker image
* AWS deployment: Using ECS and cloudformation (or AWS CDK)