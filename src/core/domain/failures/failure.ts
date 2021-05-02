export default interface Failure {
  getMessage(): string;
  getCode(): string;
}

export class AbstractFailure implements Failure {
  getMessage(): string {
    return this.message;
  }
  getCode(): string {
    return this.code;
  }

  public constructor(
    public readonly code: string,
    public readonly message: string
  ) {}
}
