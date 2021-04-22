import Todo from "../model/todo";
export default interface DeleteTodoUseCase {
  deleteTodo(id: number): Promise<void>;
}
