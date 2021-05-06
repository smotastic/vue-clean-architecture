import { injectable } from "inversify";
import { TodoModel } from "../model/todoModel";
import { TodoDatasource } from "./todoDatasource";
// ListModel und DetailModel einbauen
// dataSource (inMemoryAdapter?) checken
@injectable()
export class TodoInMemoryDataSource implements TodoDatasource {
  async createTodo(todoName: string): Promise<TodoModel> {
    const todos: TodoModel[] = await this.listTodo();
    const createdTodo: TodoModel = {
      name: todoName,
      id: todos.length + 1,
    };
    todos.push(createdTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
    return Promise.resolve(createdTodo);
  }
  listTodo(): Promise<TodoModel[]> {
    return Promise.resolve(JSON.parse(localStorage.getItem("todos") || "[]"));
  }
  async deleteTodo(id: number): Promise<void> {
    const todos: TodoModel[] = await this.listTodo();
    const newTodos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    return Promise.resolve();
  }
}
