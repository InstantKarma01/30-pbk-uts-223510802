// Parent
<template>
  <div class="container">
    <header>
      <nav>
        <button :class="{ active: currentView === 'posts' }" @click="currentView = 'posts'">Post</button>
        <button :class="{ active: currentView === 'todos' }" @click="currentView = 'todos'">Todos</button>
      </nav>
    </header>
    <div class="user-selector">
      <label for="user-select">Pilih user:</label>
      <select id="user-select" v-model="selectedUser">
        <option v-for="user in users" :key="user.id" :value="user">{{ user.name }}</option>
      </select>
    </div>
    <Posts v-if="currentView === 'posts'" :selectedUser="selectedUser" />
    <div v-else>
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
  </div>
</template>

<script>
import Posts from './Posts.vue';

export default {
  components: {
    Posts
  },
  data() {
    return {
      activities: [],
      newActivity: '',
      showUndoneOnly: false,
      users: [],
      selectedUser: null,
      currentView: 'posts'
    };
  },
  methods: {
    fetchUsers() {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
          this.users = users;
          this.selectedUser = users[0];
        })
        .then(() => {
          this.fetchTodos();
        });
    },
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
  watch: {
    selectedUser(newUser) {
      this.fetchTodos();
    }
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>


<style scoped>
.done {
  text-decoration: line-through;
}
.container {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
.user-selector {
  margin-bottom: 20px;
}
header {
  background-color: #4CAF50;
  color: white;
  padding: 10px 0;
  text-align: center;
  margin-bottom: 20px;
}
nav {
  display: flex;
  justify-content: center;
  gap: 10px;
}
nav button {
  background-color: transparent;
  border: none;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
}
nav button.active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
