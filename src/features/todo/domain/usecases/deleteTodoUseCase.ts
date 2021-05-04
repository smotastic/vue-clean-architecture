import { UseCase } from "./../../../../core/domain/usecase";

import { UseCaseCommand } from "../../../../core/domain/usecase";

import TodoPort from "../ports/todoPort";
import TYPES from "../todoTypes";
import { Either, Right } from "purify-ts/Either";
import failure from "../../../../core/domain/failure";
import { inject, injectable } from "inversify";
export default interface DeleteTodoUseCase
  extends UseCase<void, DeleteTodoUseCaseCommand> {}
@injectable()
export class DeleteTodoUseCaseImpl implements DeleteTodoUseCase {
  private _todoPort: TodoPort;

  public constructor(@inject(TYPES.TodoPort) _todoPort: TodoPort) {
    this._todoPort = _todoPort;
  }

  async execute(
    command: DeleteTodoUseCaseCommand
  ): Promise<Either<failure, void>> {
    await this._todoPort.deleteTodo(command.id);
    return Right(undefined);
  }
}
export class DeleteTodoUseCaseCommand implements UseCaseCommand {
  public constructor(private readonly _id: number) {}

  public get id(): number {
    return this._id;
  }
}
