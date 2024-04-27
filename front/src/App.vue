<template>
  <main>
    <addTask @onAddTask="addTask"></addTask>
    <ul class="task-list my-list">
      <li v-for="item in taskList" :key="item.id">
        <taskCard @onRemove="removeTask(item.id)" @onDone="setDoneTask(item.id)" :model="item"></taskCard>
      </li>
    </ul>
  </main>
</template>

<script>
import addTask from "./components/addTask.vue";
import taskCard from "./components/taskCard.vue";
import {ref} from 'vue'
import axios from "axios"

export default {
  name: 'App',
  components: {
    taskCard,
    addTask
  },
  setup() {
    const taskList = ref([])
    const PORT = 5005 
    const API_URL = `http://localhost:${PORT}`; 
    const  getToDos = async () => {
        await axios.get(`${API_URL}/api/todos`).then((res) => {
        taskList.value = res.data
      })
    }
    getToDos()
    const addTask = async ({title, description}) => {
      await axios.post(`${API_URL}/api/todos`,{title,description}).then(function (response) {
      console.log(response);
      })
    }
    const setDoneTask = (id) => {
      axios.put(`${API_URL}/api/todos/${id}`, {
        status: true
      })
        .catch(error => {
          console.error('Произошла ошибка при обновлении:', error);
          });
          getToDos()
    }
    const removeTask = (id) => {
      axios.delete(`${API_URL}/api/todos/${id}`)
      getToDos()
    }

    return {
      taskList,
      addTask,
      removeTask,
      setDoneTask
    }
  }
}
</script>

<style scoped>
  .task-list {
    list-style: none;
  }
</style>