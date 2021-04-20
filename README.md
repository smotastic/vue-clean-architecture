# Infrastructure

Simple TODO App showcasing a clean architecture approach in VueJs.

Technologies used:

- **VueJs** with **TypeScript**
- **Vite** as Buildtool
- **Vuex** for state management with **Vuex Module Decorators**
- **Inversify** for dependency injection
- **Tailwindcss** for a pretty and simple UI

# Clean Architecture

This project is seperated into 3 layers.

## App

The entrypoint, and most outer layer for the application.
Includes all Vue specific code, such as .vue files, vuex configuration and their modules.

## Domain

The inner containing all services to handle business logic, and business rules.

The layer in itself is seperated into **model**, **ports** and **usecases**.

The package structure is **feature driven**. This means that for every feature, one package resides in the domain.
In this case, there is only one feature 'todo', which handles creating, reading, updating and deleting todos.

### Model

The representation of data retrieved in the ports, and used in the usecases.

### Port

Or outer ports, are the port interfaces to communicate with the outside world.
(Dependency inversion rule)

### Usecases

Or inner ports, defining the interfaces for the business logic, and business rules.
Every usecase is implemented by a Service, which resided in the root package of the current feature.

## Infrastructure

Framework specific code, and or implementation of the outer ports of the domain, to access the data of the "outer world".
