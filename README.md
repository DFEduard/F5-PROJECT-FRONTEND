# F5 PROJECT Fron-End
- client side: HTML, Angular
- layout: CSS, Bootstrap
- backend for this: https://github.com/DFEduard/F5-PROJECT

# Web app includes:
  - Login page -> authentication required: email, password
    - Users can't navigate to 'users' page if is not logged in 
  - Users pages -> CRUD operations. 
    - Logout button. When a user logs out, he needs to log back in to access back the 'users' page
    - If the first access token expires (lifetime 5 mine), by using the refresh token a new access token will be created (lifetime 24 hours)
    - If the second access token expires the user has to log back in. 
    - There is an admin user that can't be delete. 
  

# Login page
  - a user has to login using email and password

# Screenshots
![GitHub Logo](https://github.com/DFEduard/F5-PROJECT-FRONTEND/blob/master/Project%20screenshots/1%20login.png)
Format: ![Alt Text](url)


# UsersModule

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
