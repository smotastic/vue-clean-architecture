import TodoFailure from "./todoFailure";
import Todo from "./model/todo";
import { inject, injectable } from "inversify";
import TYPES from "./todoTypes";
import TodoPort from "./ports/todoPort";
import CreateTodoUseCase, {
  CreateTodoUseCaseCommand,
} from "./usecases/createTodoUseCase";
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
  async execute(
    command: CreateTodoUseCaseCommand
  ): Promise<Either<Failure, Todo>> {
    if (!command.todoName) {
      return Left(TodoFailure.emptyName);
    }
    if (command.todoName.length > 15) {
      return Left(TodoFailure.nameTooLong);
    }
    const result = await this._todoPort.createTodo(command.todoName);
    return Right(result);
  }

  deleteTodo(id: number): Promise<void> {
    return this._todoPort.deleteTodo(id);
  }
  listTodo(): Promise<Todo[]> {
    return this._todoPort.listTodo();
  }
}
