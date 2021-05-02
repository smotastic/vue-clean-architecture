import Todo from "./model/todo";
import { inject, injectable } from "inversify";
import TYPES from "./todoTypes";
import TodoPort from "./ports/todoPort";
import CreateTodoUseCase from "./usecases/createTodoUseCase";
import ListTodoUseCase from "./usecases/listTodoUseCase";
import DeleteTodoUseCase from "./usecases/deleteTodoUseCase";
import { Either, Left, Right } from "purify-ts/Either";
import Failure from "../../core/domain/failures/failure";

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

  async createTodo(todoName: string): Promise<Either<Failure, Todo>> {
    const result = await this._todoPort.createTodo(todoName);
    // const f: Failure = {
    //   getMessage() {
    //     return "hallo";
    //   },
    //   getCode() {
    //     return "1";
    //   },
    // };
    // return Promise.resolve(Left(f));
    return Promise.resolve(Right(result));
  }
}
