## WIP SaaS Project 

This project is focused around providing a management service for the vendors and dashboarding for both, existing clients and the service providers.
Think of this platform like Amazon shop for small or specilised companies that are unable to invest in the dev team but would like to have a seperated system that would enable to sell and manage products.

Currently there are still areas that needs improvement and do not represent the final look of the platform.

### Motivation:
- Create a SaaS platform independently using only React js
- Create the backend and database server that will provide an access to carry out CRUD operations.
- Use handcrafted components without any UI libraries to test the ability and study potential problems around each of the components and their requirements.
- Study the requirements of backend to create specific API points
- Create full scale project to study the pitfals of poor project management



### What full service will offer?
#### Service 
A subscription based model providing an access for the vendor. (service provider)
Ability to register and onboard Clients using the dynamic approach.
Possibility of adding the products along with the image and stock information.
Communication with the company members and clients using built in messaging system.
Manage stock of the products and update their price or discount.

#### Client
Ability to view the products, purchase them and create company structure within the platform to effectively manage the stocks and provide statistics based on the purchase trends including the potential savings and change in the businees stock requirements.
Keep track of invoices and generate them for accounting purposes.

#### Everyone

Message using built in messaging service.
Edit user details and add user avatar.
Edit company details and it's structure.
View products and reference them in the messages as a point of interest.
View and manage users involved.
Provide user privileges to ensure that certain information will not be exposed.
Share statistics and overview of the platform externally.
Search contents of the platform using tags or special namespaces such as product, invoice, user name 

### Project
Currently the project consists of the main features but there is still a lot of work to do.
Managed using simple concepts.
Platform has simple system of adding and buying the products and their transactions are being tracked on the client side.
Users can send messages accros but it lacks functionality such as delete, draft and favourite.
Messaging system will have implemented channel that will allow to load new messages instantly.
There is missing attachement system for each message which will be implemented shortly.
Certain Widgets are not functinal and are placed there only provisionally.

In order to limit the number of unnecessary styling, I have created a globals.css stylesheet which in future will be broken down in to smaller chunks to allow loading of different styles based on the categories such as spacing, borders, colours or typography in general.

Platform does not possess the ability to filter content using general components such as tables. I intend to create a serverside lazyloading feature to manage the data expectations.

### Bugs
The list of the bugs is currently kept in the private location and will be shared later once the project will have first official test run.

#### Notes
This project has no intention of shipping to production officially and certain methods used inside are not save for production!!!
This is a side project and it's intention was to demonstrate the pitfalls of developing complex service with limited manpower and time.
The case study will be described shortly in private blog post.