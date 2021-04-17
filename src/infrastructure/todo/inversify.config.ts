import "reflect-metadata";
import { Container } from "inversify";
import TYPES from "../../domain/Todo/TodoTypes";
import getDecorators from "inversify-inject-decorators";
import TodoPort from "../../domain/Todo/ports/todoPort";
import TodoInMemoryAdapter from "./todoInMemoryAdapter";
import CreateTodoUseCase from "../../domain/Todo/usecases/createTodoUseCase";
import ListTodoUseCase from "../../domain/Todo/usecases/listTodoUseCase";
import TodoService from "../../domain/Todo/TodoService";

const container = new Container();
container.bind<TodoPort>(TYPES.TodoPort).to(TodoInMemoryAdapter);
container.bind<CreateTodoUseCase>(TYPES.CreateTodoUseCase).to(TodoService);
container.bind<ListTodoUseCase>(TYPES.ListTodoUseCase).to(TodoService);
const { lazyInject } = getDecorators(container);
export { lazyInject, container };
