import { Either } from "purify-ts/Either";
import Failure from "./failure";

export interface UseCase<T, C extends UseCaseCommand> {
  execute(command: C): Promise<Either<Failure, T>>;
}

export interface UseCaseCommand {}

export class EmptyUseCaseCommand implements UseCaseCommand {}
