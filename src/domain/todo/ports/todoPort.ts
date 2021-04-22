import Todo from "../model/todo";

export default interface TodoPort {
  createTodo(todoName: string): Promise<Todo>;

  listTodo(): Promise<Todo[]>;

  deleteTodo(id: number): Promise<void>;
}
