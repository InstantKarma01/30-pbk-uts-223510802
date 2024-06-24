<template>
  <div>
    <h1>Posts</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['selectedUser'],
  data() {
    return {
      posts: []
    };
  },
  watch: {
    selectedUser(newUser) {
      this.fetchPosts();
    }
  },
  methods: {
    fetchPosts() {
      if (this.selectedUser) {
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser.id}`)
          .then(response => response.json())
          .then(posts => {
            this.posts = posts;
          });
      }
    }
  },
  mounted() {
    this.fetchPosts();
  }
};
</script>
