<template>
  <div>
    <form @submit.prevent="login">
      <label for="email">Email:</label>
      <input v-model="email" type="email" name="email" value>

      <label for="password">Password:</label>
      <input v-model="password" type="password" name value>
      <p v-if="error">
        {{ error }}
      </p>
      <button type="submit" name="button">
        Login
      </button>
      <router-link to="/register">
        Don't have an account? Register.
      </router-link>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        await this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        })
        this.$router.push({ name: 'dashboard' })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>
