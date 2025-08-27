<template>
  <div class="d-flex justify-content-center align-items-center vh-100" style="background-color: #f8f9fa;">
    <div class="card shadow border" style="width: 400px; border-color: #33374C;">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="card-title mb-0 fw-semibold">Welcome back!</h5>
          <router-link to="/" class="btn-close" aria-label="Close"></router-link>
        </div>

        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="email" class="form-label text-uppercase small">Email Address</label>
            <input
              type="email"
              id="email"
              class="form-control custom-input"
              v-model="email"
              placeholder="name@email.com"
              required
            />
          </div>

          <div class="mb-4">
            <label for="password" class="form-label text-uppercase small">Password</label>
            <input
              type="password"
              id="password"
              class="form-control custom-input"
              v-model="password"
              placeholder="Password"
              required
            />
          </div>

          <button type="submit" class="btn w-100 custom-btn">Login</button>
        </form>

        <p class="text-center mt-4 mb-0 text-muted small">
          Don’t have an account?
          <router-link to="/register" class="text-decoration-none">Register</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    handleLogin() {
      // TODO: You can add real authentication here later
      if (this.email && this.password) {
        // Redirect to LoggedIn.vue page
        this.$router.push('/loggedin')
      } else {
        alert("Please enter your credentials.")
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');

.card {
  border-width: 2px !important;
  font-family: 'DM Sans', sans-serif;
}

.custom-input {
  background-color: #CCCEDA;
  border: 1px solid #ccc;
  font-family: 'DM Sans', sans-serif;
}

.custom-btn {
  background-color: #2D539E;
  color: white;
  font-family: 'DM Sans', sans-serif;
}

.custom-btn:hover {
  background-color: #24488b;
}
</style>
