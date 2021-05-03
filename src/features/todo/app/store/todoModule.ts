import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { lazyInject } from "../../infrastructure/inversify.config";

import Todo from "../../domain/model/todo";

import { Either, Right } from "purify-ts/Either";
import Failure from "../../../../core/domain/failure";
import ListTodoUseCase from "../../domain/usecases/listTodoUseCase";
import CreateTodoUseCase, {
  CreateTodoUseCaseCommand,
} from "../../domain/usecases/createTodoUseCase";
import DeleteTodoUseCase from "../../domain/usecases/deleteTodoUseCase";
import TYPES from "../../domain/todoTypes";
export interface TodoState {
  todos: Todo[];
}

@Module({
  name: "todoModule",
  namespaced: true,
})
export class TodoStore extends VuexModule implements TodoState {
  @lazyInject(TYPES.ListTodoUseCase)
  public listUsecase!: ListTodoUseCase;
  @lazyInject(TYPES.CreateTodoUseCase)
  public createUsecase!: CreateTodoUseCase;
  @lazyInject(TYPES.CreateTodoUseCase)
  public deleteUsecase!: DeleteTodoUseCase;

  public todos: Todo[] = [];

  @Mutation
  setTodos(items: Todo[]) {
    this.todos = items;
  }

  @Action({ rawError: true })
  async fetchTodos() {
    const list = await this.listUsecase.listTodo();
    // this.galaxies = list;
    this.setTodos(list);
  }

  @Action({ rawError: true })
  async addTodo(todoName: string): Promise<Either<Failure, Todo>> {
    const createdTodo = await this.createUsecase.execute(
      new CreateTodoUseCaseCommand(todoName)
    );

    return createdTodo.chain((r) => {
      this.todos.push(r);
      return Right(r);
    });
  }

  @Action({ rawError: true })
  async deleteTodo(id: number) {
    await this.deleteUsecase.deleteTodo(id);
    this.fetchTodos();
  }
}