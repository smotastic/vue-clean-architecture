import Failure from "./../../../core/domain/failures/failure";

import Todo from "../model/todo";
import { Either } from "purify-ts/Either";
export default interface CreateTodoUseCase {
  createTodo(todoName: string): Promise<Either<Failure, Todo>>;
}
