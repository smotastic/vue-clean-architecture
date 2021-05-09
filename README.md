# Clean Architecture

Simple TODO App showcasing a clean architecture approach in VueJs.

Technologies used:

- **VueJs** with **TypeScript**
- **Vite** as Buildtool
- **Vuex** for state management with **Vuex Module Decorators**
- **Inversify** for dependency injection
- **Tailwindcss** for a pretty and simple UI
- **PurifyTs** for usage of Either in Usecases

This project is seperated into 3 layers.

The package structure is **feature driven**.
This means that for every feature, one package exists.
In each feature, the 3 layers are represented as their own sub-packages.

In this case, there is only one feature 'todo', which handles creating, reading, updating and deleting todos.

```
├── core
│ └── app
│       ├── App.vue
│       ├── components
│       ├── store
│ └── domain
│       ├── failure.ts
│       ├── usecase.ts
│ └── infrastructure
├── features
│ └── foofeature
│       └── application
│       └── domain
│           ├── model
│           ├── port
│           ├── usecase
│       └── infrastructure
│           ├── entity
```

## App

The entrypoint, and most outer layer for the application.
Includes all Vue specific code, such as .vue files, vuex configuration and their modules.

The entrypoint in a SPA is in this case the App.vue, which resides in the **core/app** package.

### Store

State-Management is handled by vuex, which in turn handles the communication to the domain, aka the usecases.
Each feature is represented by its own module, therefore for the Todo Feature, a todoModule.ts exists.

## Domain

The inner layer containing all services to handle business logic, and business rules.

The layer in itself is seperated into **model**, **ports** and **usecases**.

### Model

The representation of data retrieved in the ports, and used in the usecases.

### Port

Or outer ports, are the port interfaces to communicate with the outside world (infrastructure).
(Dependency inversion rule)

### Usecases

Or inner ports, defining the interfaces for the business logic, and business rules.
Every usecase is implemented by it's service.

## Infrastructure

Framework specific code, and or implementation of the outer ports of the domain, to access the data of the "outer world".
Most prominent example would be the layer to access some external server via http/s.
