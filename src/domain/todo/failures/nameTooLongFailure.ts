import { Failure } from "../../../core/domain/failures/failure";

export class NameTooLongFailure implements Failure {
  getMessage(): String {
    throw new Error("Method not implemented.");
  }
  getCode(): String {
    throw new Error("Method not implemented.");
  }
}
