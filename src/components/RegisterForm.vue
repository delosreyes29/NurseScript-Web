<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow border" style="width: 400px; border-color: #33374C;">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="card-title mb-0 fw-semibold">Create an Account</h5>
          <!-- Close back to home (NotLoggedIn) -->
          <router-link to="/" class="btn-close" aria-label="Close"></router-link>
        </div>

        <form @submit.prevent="handleRegister">
          <div class="mb-3">
            <label for="name" class="form-label text-uppercase small">Full Name</label>
            <input
              type="text"
              id="name"
              class="form-control custom-input"
              v-model="name"
              placeholder="Juan Dela Cruz"
              required
            />
          </div>

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

          <button type="submit" class="btn w-100 custom-btn">Register</button>
        </form>

        <p class="text-center mt-4 mb-0 text-muted small">
          Already have an account?
          <!-- Redirect explicitly to LoginForm.vue -->
          <router-link :to="{ name: 'LoginForm' }" class="text-decoration-none">Log In</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterForm',
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    handleRegister() {
      // Example: handle registration logic here
      console.log(`Registered ${this.name} with ${this.email}`)

      // On success, redirect to LoggedIn page (adjust to your desired flow)
      this.$router.push({ name: 'LoggedIn' })
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');

.card {
  border-width: 2px !important;
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
