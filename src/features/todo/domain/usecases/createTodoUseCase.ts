import Todo from "../entities/todo";
import { UseCase, UseCaseCommand } from "../../../../core/domain/usecase";
import { Either, Left, Right } from "purify-ts/Either";
import failure from "../../../../core/domain/failure";
import TodoPort from "../ports/todoPort";
import { inject, injectable } from "inversify";
import TYPES from "../todoTypes";
import TodoFailure from "../todoFailure";
export default interface CreateTodoUseCase
  extends UseCase<Todo, CreateTodoUseCaseCommand> {}
@injectable()
export class CreateTodoUseCaseImpl implements CreateTodoUseCase {
  private _todoPort: TodoPort;

  public constructor(@inject(TYPES.TodoPort) _todoPort: TodoPort) {
    this._todoPort = _todoPort;
  }

  async execute(
    command: CreateTodoUseCaseCommand
  ): Promise<Either<failure, Todo>> {
    if (!command.todoName) {
      return Left(TodoFailure.emptyName);
    }
    if (command.todoName.length > 15) {
      return Left(TodoFailure.nameTooLong);
    }
    const result = await this._todoPort.createTodo(command.todoName);
    return Right(result);
  }
}
export class CreateTodoUseCaseCommand implements UseCaseCommand {
  public constructor(private readonly _todoName: string) {}

  public get todoName(): string {
    return this._todoName;
  }
}
