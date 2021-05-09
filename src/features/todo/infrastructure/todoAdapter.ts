import { inject, injectable } from "inversify";
import Todo from "../domain/entities/todo";
import TodoPort from "../domain/ports/todoPort";
import TYPES from "../domain/todoTypes";
import { TodoDatasource } from "./datasource/todoDatasource";

@injectable()
export default class TodoAdapter implements TodoPort {
  public todoDataSource!: TodoDatasource;

  public constructor(
    @inject(TYPES.TodoDataSource) todoDatasource: TodoDatasource
  ) {
    this.todoDataSource = todoDatasource;
  }

  async createTodo(todoName: string): Promise<Todo> {
    return this.todoDataSource.createTodo(todoName);
  }

  listTodo(): Promise<Todo[]> {
    return this.todoDataSource.listTodo();
  }

  async deleteTodo(id: number): Promise<void> {
    return this.todoDataSource.deleteTodo(id);
  }
}
