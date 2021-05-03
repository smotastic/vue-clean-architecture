import Todo from "../model/todo";

export default interface ListTodoUseCase {
  listTodo(): Promise<Todo[]>;
}
