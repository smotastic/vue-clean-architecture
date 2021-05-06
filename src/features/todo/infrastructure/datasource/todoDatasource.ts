import { TodoModel } from "./../model/todoModel";
export interface TodoDatasource {
  createTodo(todoName: string): Promise<TodoModel>;

  listTodo(): Promise<TodoModel[]>;

  deleteTodo(id: number): Promise<void>;
}
