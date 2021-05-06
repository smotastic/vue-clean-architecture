<template>
  <div class="container mx-auto px-4">
    <div class="my-2 flex flex-row">
      <div class="flex-col flex-grow mr-4">
        <input
          type="text"
          autofocus
          id="todo"
          class="rounded-sm px-4 py-3 focus:outline-none bg-gray-100 w-full"
          placeholder="Todo"
          v-model="todoInput"
        />
      </div>
      <div class="flex-col pt-1">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="addTodo"
        >
          Add
        </button>
      </div>
    </div>

    <div class="flex-row text-red-500 font-bold" v-if="error">
      <div class="flex justify-center">{{ error }}</div>
    </div>
    <div class="grid grid-cols-3 gap-4">
      <div
        class="flex flex-row px-3 py-2 h-32 rounded border bg-gray-200"
        v-for="todo in todoStore.todos"
        :key="todo.id"
      >
        <div class="flex-grow text-lg font-medium">
          {{ todo.name }}
        </div>
        <div>
          <button
            @click="deleteTodo(todo.id)"
            class="trash hover:bg-red-700"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useModule } from "../../../../core/app/store";
import { TodoStore } from "../store/todoModule";

export default defineComponent({
  name: "App",
  setup() {
    const todoStore: TodoStore = useModule(TodoStore);
    todoStore.fetchTodos();

    const todoInput = ref("");
    const error = ref("");

    async function addTodo() {
      const result = await todoStore.addTodo(todoInput.value);
      result.either(
        (l) => {
          error.value = l.getMessage();
        },
        (_) => {
          todoInput.value = "";
          error.value = "";
        }
      );
    }

    function deleteTodo(id: number) {
      todoStore.deleteTodo(id);
    }

    return { todoStore, todoInput, addTodo, deleteTodo, error };
  },
});
</script>

<style>
.trash {
  width: 32px;
  height: 32px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>');
}
</style>
