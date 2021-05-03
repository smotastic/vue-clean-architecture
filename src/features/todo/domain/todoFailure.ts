import { AbstractFailure } from "../../../core/domain/failure";

export default class TodoFailure extends AbstractFailure {
  public static readonly nameTooLong = new TodoFailure(
    "1",
    "Name should not exceed 15 characters."
  );

  public static readonly emptyName = new TodoFailure(
    "2",
    "Name cannot be empty."
  );
}
