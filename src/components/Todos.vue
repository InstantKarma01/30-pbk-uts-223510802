<template>
    <div>
      <h1>Daftar Kegiatan</h1>
      <form @submit.prevent="addActivity">
        <input type="text" v-model="newActivity" placeholder="Tambahkan kegiatan baru">
        <button type="submit">Tambah</button>
      </form>
      <ul>
        <li v-for="(activity, index) in filteredActivities" :key="index">
          <input type="checkbox" v-model="activity.done">
          <span :class="{ done: activity.done }">{{ activity.text }}</span>
          <button @click="deleteActivity(index)">Batal</button>
        </li>
      </ul>
      <div class="filter">
        <label>
          <input type="checkbox" v-model="showUndoneOnly"> Tampilkan hanya kegiatan yang belum selesai
        </label>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['selectedUser'],
    data() {
      return {
        activities: [],
        newActivity: '',
        showUndoneOnly: false
      };
    },
    watch: {
      selectedUser(newUser) {
        this.fetchTodos();
      }
    },
    methods: {
      fetchTodos() {
        if (this.selectedUser) {
          fetch('https://jsonplaceholder.typicode.com/todos?userId=' + this.selectedUser.id)
            .then(response => response.json())
            .then(todos => {
              this.activities = todos.map(todo => ({ text: todo.title, done: todo.completed }));
            });
        }
      },
      addActivity() {
        this.activities.push({ text: this.newActivity, done: false });
        this.newActivity = '';
      },
      deleteActivity(index) {
        this.activities.splice(index, 1);
      }
    },
    computed: {
      filteredActivities() {
        if (this.showUndoneOnly) {
          return this.activities.filter(activity => !activity.done);
        } else {
          return this.activities;
        }
      }
    },
    mounted() {
      this.fetchTodos();
    }
  };
  </script>
  
  <style scoped>
  .done {
    text-decoration: line-through;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
  li:last-child {
    border-bottom: none;
  }
  input[type="checkbox"] {
    margin-right: 10px;
  }
  button {
    background-color: #4CAF50;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  button:hover {
    background-color: #3e8e41;
  }
  .filter {
    margin-top: 20px;
  }
  </style>
  