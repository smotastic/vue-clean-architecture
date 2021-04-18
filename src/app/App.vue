<template>
  <div class="container">
    <div>
      <button @click="todoStore.addTodo('bla')">Add</button>
    </div>
    <div v-for="todo in todoStore.todos" :key="todo.id">{{ todo.name }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import { TodoStore } from "./store/todo/todoModule";
import { useModule } from "./store";
export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
  },
  setup() {
    const todoStore: TodoStore = useModule(TodoStore);
    todoStore.fetchTodos();

    return { todoStore };
  },
});
</script>

<style>
.container {
  width: 1268px;
  background-color: rgba(230, 221, 220, 0.5);
  margin-left: auto;
  margin-right: auto;
}
</style>
