import {
  UseCase,
  UseCaseCommand,
} from "./../../../core/domain/usecase/usecase";
import Failure from "./../../../core/domain/failures/failure";

import Todo from "../model/todo";
import { Either } from "purify-ts/Either";
export default interface CreateTodoUseCase
  extends UseCase<Todo, CreateTodoUseCaseCommand> {
  // createTodo(todoName: string): Promise<Either<Failure, Todo>>;
}

export class CreateTodoUseCaseCommand implements UseCaseCommand {
  public constructor(private readonly _todoName: string) {}

  public get todoName(): string {
    return this._todoName;
  }
}
