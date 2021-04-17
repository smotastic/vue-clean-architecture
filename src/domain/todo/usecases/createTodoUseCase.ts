import Todo from "../model/todo";
export default interface CreateTodoUseCase {
  createTodo(todoName: string): Promise<Todo>;
}
