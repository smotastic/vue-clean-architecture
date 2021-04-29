import Todo from "./model/todo";
import { inject, injectable } from "inversify";
import TYPES from "./todoTypes";
import TodoPort from "./ports/todoPort";
import CreateTodoUseCase from "./usecases/createTodoUseCase";
import ListTodoUseCase from "./usecases/listTodoUseCase";
import DeleteTodoUseCase from "./usecases/deleteTodoUseCase";

@injectable()
export default class TodoService
  implements CreateTodoUseCase, ListTodoUseCase, DeleteTodoUseCase {
  private _todoPort: TodoPort;

  public constructor(@inject(TYPES.TodoPort) _todoPort: TodoPort) {
    this._todoPort = _todoPort;
  }
  deleteTodo(id: number): Promise<void> {
    return this._todoPort.deleteTodo(id);
  }
  listTodo(): Promise<Todo[]> {
    return this._todoPort.listTodo();
  }

  createTodo(todoName: string): Promise<Todo> {
    return this._todoPort.createTodo(todoName);
  }
}
