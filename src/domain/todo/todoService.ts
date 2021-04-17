import Todo from "./model/todo";
import { inject, injectable } from "inversify";
import TYPES from "./TodoTypes";
import TodoPort from "./ports/todoPort";
import CreateTodoUseCase from "./usecases/createTodoUseCase";
import ListTodoUseCase from "./usecases/listTodoUseCase";

@injectable()
export default class TodoService implements CreateTodoUseCase, ListTodoUseCase {
  private _todoPort: TodoPort;

  public constructor(@inject(TYPES.TodoPort) _TodoPort: TodoPort) {
    this._todoPort = _TodoPort;
  }
  listTodo(): Promise<Todo[]> {
    return this._todoPort.listTodo();
  }

  createTodo(TodoName: string): Promise<Todo> {
    return this._todoPort.createTodo(TodoName);
  }
}
