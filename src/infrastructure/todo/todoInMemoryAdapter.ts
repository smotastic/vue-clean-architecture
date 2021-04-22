import { injectable } from "inversify";
import Todo from "../../domain/Todo/model/todo";
import TodoPort from "../../domain/Todo/ports/todoPort";

@injectable()
export default class TodoInMemoryAdapter implements TodoPort {
  async deleteTodo(id: number): Promise<void> {
    const todos: Todo[] = await this.listTodo();
    const newTodos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    return Promise.resolve();
  }

  async createTodo(todoName: string): Promise<Todo> {
    const todos: Todo[] = await this.listTodo();
    const createdTodo: Todo = {
      name: todoName,
      id: todos.length + 1,
    };
    todos.push(createdTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
    return Promise.resolve(createdTodo);
  }

  listTodo(): Promise<Todo[]> {
    return Promise.resolve(JSON.parse(localStorage.getItem("todos") || "[]"));
  }
}
