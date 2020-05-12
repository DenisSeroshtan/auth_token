<template>
  <div>
    <form @submit.prevent="register()">
      <label for="name">Name:</label>
      <input v-model="name" type="text" name="name" value>

      <label for="email">Email:</label>
      <input v-model="email" type="email" name="email" value>

      <label for="password">Password:</label>
      <input v-model="password" type="password" name value>
      <ul v-if="error">
        <li v-for="(err, index) in error" :key="index">
          {{ err }}
        </li>
      </ul>
      <button type="submit" name="button">
        Register
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    register () {
      this.$store
        .dispatch('register', {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: 'dashboard' })
        })
        .catch(err => {
          this.error = err.response.data.error
        })
    }
  }
}
</script>
