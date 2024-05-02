<template>
  <div class="task-card my-style">
    <div>
      <h4>{{ task.title }}</h4>
      <p>{{ task.description }}</p>
    </div>
    <div class="task-functions">
      <button>
        <input type="checkbox" v-model="completed" @change="toggleStatus" />
      </button>
      <button @click="emitOnRemove">❌</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  emits: ['onToggle', 'onRemove'],
  props: {
    task: {
      required: true,
      type: Object,
    },
  },
  setup(props, { emit }) {
    const completed = ref(props.task.status);
    const PORT = 5005;
    const API_URL = `http://localhost:${PORT}`;

    const toggleStatus = async () => {
      try {
        // console.log('Task ID before toggleStatus:', props.task._id);
        const newStatus = completed.value;

        // Prepare the data to be sent in the request payload
        const requestData = {
          status: newStatus, // Include the new status
        };

        // Convert the task ID to a string
        const taskId = String(props.task._id);

        // Send the PUT request with the task ID and the new status
        const response = await axios.put(`${API_URL}/api/todos/${taskId}`, requestData);

        // Emit event to parent component with updated task
        emit('onToggle', response.data);

        // Update local state
        completed.value = newStatus;
        // console.log('Task ID after toggleStatus:', props.task._id);
      } catch (error) {
        console.error('Error updating todo status:', error);
      }
    };

    const emitOnRemove = () => {
      emit('onRemove', props.task._id);
    };

    return {
      completed,
      toggleStatus,
      emitOnRemove,
    };
  },
};
</script>

<style scoped>
.task-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.task-functions {
  display: flex;
  gap: 10px;
  /* justify-content: space-between; */
  /* align-items: center; */
}
</style>
