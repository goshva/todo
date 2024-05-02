<template>
  <main>
    <addTask @onAddTask="addTask"></addTask>
    <ul class="task-list my-list">
      <li v-for="task in taskList" :key="task._id">
        <taskCard
          @onRemove="removeTask(task._id)"
          @onToggle="setDoneTask(task._id)"
          :task="task"
        ></taskCard>
      </li>
    </ul>
  </main>
</template>

<script>
import addTask from './components/addTask.vue';
import taskCard from './components/taskCard.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    taskCard,
    addTask,
  },
  setup() {
    const taskList = ref([]);
    const PORT = 5005;
    const API_URL = `http://localhost:${PORT}`;

    const getToDos = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/todos`);
        taskList.value = response.data;
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    const addTask = async ({ title, description }) => {
      try {
        await axios.post(`${API_URL}/api/todos`, { title, description });
        getToDos();
      } catch (error) {
        console.error('Error adding task:', error);
      }
    };

    const setDoneTask = async (id, status) => {
      try {
        await axios.put(`${API_URL}/api/todos/${id}`, { status });
        getToDos();
      } catch (error) {
        console.error('Error updating todo status:', error);
      }
    };

    const removeTask = async (id) => {
      try {
        await axios.delete(`${API_URL}/api/todos/${id}`);
        getToDos();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    };

    onMounted(getToDos);

    return {
      taskList,
      addTask,
      removeTask,
      setDoneTask,
    };
  },
};
</script>

<style scoped>
.task-list {
  list-style: none;
}
</style>
