import Todo from "../../domain/entities/todo";
import { TodoModel } from "./../model/todoModel";
export interface TodoDatasource {
  createTodo(todoName: string): Promise<Todo>;

  listTodo(): Promise<Todo[]>;

  deleteTodo(id: number): Promise<void>;
}
