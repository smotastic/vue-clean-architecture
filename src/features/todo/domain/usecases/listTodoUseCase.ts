import {
  EmptyUseCaseCommand,
  UseCase,
  UseCaseCommand,
} from "./../../../../core/domain/usecase";

import { inject, injectable } from "inversify";
import { Either, Right } from "purify-ts/Either";
import Failure from "../../../../core/domain/failure";
import Todo from "../entities/todo";
import TodoPort from "../ports/todoPort";
import TYPES from "../todoTypes";

export default interface ListTodoUseCase
  extends UseCase<Todo[], EmptyUseCaseCommand> {}
@injectable()
export class ListTodoUseCaseImpl implements ListTodoUseCase {
  private _todoPort: TodoPort;

  public constructor(@inject(TYPES.TodoPort) _todoPort: TodoPort) {
    this._todoPort = _todoPort;
  }
  async execute(
    command: EmptyUseCaseCommand
  ): Promise<Either<Failure, Todo[]>> {
    const todos = await this._todoPort.listTodo();
    return Right(todos);
  }
}
