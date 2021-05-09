import "reflect-metadata";
import { TodoInMemoryDataSource } from "./datasource/todoInMemoryDataSource";
import { TodoDatasource } from "./datasource/todoDatasource";
import { ListTodoUseCaseImpl } from "./../domain/usecases/listTodoUseCase";
import { DeleteTodoUseCaseImpl } from "./../domain/usecases/deleteTodoUseCase";
import { CreateTodoUseCaseImpl } from "./../domain/usecases/createTodoUseCase";
import { Container } from "inversify";

import getDecorators from "inversify-inject-decorators";
import TodoAdapter from "./todoAdapter";
import TYPES from "../domain/todoTypes";
import DeleteTodoUseCase from "../domain/usecases/deleteTodoUseCase";
import ListTodoUseCase from "../domain/usecases/listTodoUseCase";
import CreateTodoUseCase from "../domain/usecases/createTodoUseCase";
import TodoPort from "../domain/ports/todoPort";

const container = new Container();
container.bind<TodoPort>(TYPES.TodoPort).to(TodoAdapter);
container.bind<TodoDatasource>(TYPES.TodoDataSource).to(TodoInMemoryDataSource);
// .toConstructor<TodoInMemoryDataSource>(TodoInMemoryDataSource);
container
  .bind<CreateTodoUseCase>(TYPES.CreateTodoUseCase)
  .to(CreateTodoUseCaseImpl);
container.bind<ListTodoUseCase>(TYPES.ListTodoUseCase).to(ListTodoUseCaseImpl);
container
  .bind<DeleteTodoUseCase>(TYPES.DeleteTodoUseCase)
  .to(DeleteTodoUseCaseImpl);
const { lazyInject } = getDecorators(container);
export { lazyInject, container };
