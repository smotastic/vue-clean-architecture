import "reflect-metadata";
import { Container } from "inversify";

import getDecorators from "inversify-inject-decorators";
import TodoInMemoryAdapter from "./todoInMemoryAdapter";
import TodoService from "../domain/todoService";
import TYPES from "../domain/todoTypes";
import DeleteTodoUseCase from "../domain/usecases/deleteTodoUseCase";
import ListTodoUseCase from "../domain/usecases/listTodoUseCase";
import CreateTodoUseCase from "../domain/usecases/createTodoUseCase";
import TodoPort from "../domain/ports/todoPort";

const container = new Container();
container.bind<TodoPort>(TYPES.TodoPort).to(TodoInMemoryAdapter);
container.bind<CreateTodoUseCase>(TYPES.CreateTodoUseCase).to(TodoService);
container.bind<ListTodoUseCase>(TYPES.ListTodoUseCase).to(TodoService);
container.bind<DeleteTodoUseCase>(TYPES.DeleteTodoUseCase).to(TodoService);
const { lazyInject } = getDecorators(container);
export { lazyInject, container };
