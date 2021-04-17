<template>
  <div>Hallo</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "./app/components/HelloWorld.vue";
import { TodoStore } from "./app/store/todo/todoModule";
import { useModule } from "./app/store/";
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
