// Child
<template>
    <div>
      <h1>Daftar Postingan</h1>
      <ul>
        <li v-for="(post, index) in posts" :key="index">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      selectedUser: Object
    },
    data() {
      return {
        posts: []
      };
    },
    watch: {
      selectedUser: {
        handler(newUser) {
          if (newUser) {
            this.fetchPosts(newUser.id);
          }
        },
        immediate: true
      }
    },
    methods: {
      fetchPosts(userId) {
        if (userId) {
          fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            .then(response => response.json())
            .then(posts => {
              this.posts = posts;
            });
        }
      }
    },
    mounted() {
      if (this.selectedUser) {
        this.fetchPosts(this.selectedUser.id);
      }
    }
  };
  </script>
  
  <style scoped>
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
  </style>
  