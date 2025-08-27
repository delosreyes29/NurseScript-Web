<template>
  <div class="app-container">
    <!-- Top Bar -->
    <header class="top-bar">
      <div class="left-section">
        <span class="logo" @click="goToLoggedIn">NurseScripts</span>
      </div>
      <div class="right-section">
        <!-- Username -->
        <span class="username clickable" @click="goToUserPage">{{ username }}</span>

        <!-- Progress Circle -->
        <div class="progress-circle">
          <span class="progress-number">5</span>
        </div>

        <!-- Icons -->
        <img
          src="@/assets/settings.png"
          alt="Settings"
          class="icon-img"
          @click="goToSettings"
        />
        <img
          src="@/assets/highscore.png"
          alt="Highscore"
          class="icon-img"
          @click="goToHighscore"
        />
        <img
          src="@/assets/about.png"
          alt="About"
          class="icon-img"
          @click="goToAbout"
        />
      </div>
    </header>

    <!-- Settings Content -->
    <div class="settings-container">
      <header class="settings-header">
        <h1>Settings</h1>
      </header>

      <main class="settings-content">
        <section class="profile-section">
          <h2>Profile</h2>
          <div class="setting-item">
            <label for="username">Username:</label>
            <input id="username" type="text" placeholder="Enter your username" v-model="username" />
          </div>

          <div class="setting-item">
            <label for="email">Email:</label>
            <input id="email" type="email" placeholder="Enter your email" v-model="email" />
          </div>
        </section>

        <div class="button-group">
          <button class="save-btn" @click="saveSettings">Save Changes</button>
          <button class="logout-btn" @click="logout">Log Out</button>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: "SettingsPage",
  data() {
    return {
      username: "GwenStacy",
      email: "gwen@example.com",
      darkMode: false
    };
  },
  methods: {
    saveSettings() {
      alert("Settings saved successfully!");
    },
    logout() {
      this.$router.push({ name: 'NotLoggedIn' })
    },
    goToSettings() {
      this.$router.push("/settings");
    },
    goToLoggedIn() {
      this.$router.push("/loggedin");
    },
    goToUserPage() {
      this.$router.push("/user");
    },
    goToHighscore() {
      this.$router.push("/highscore");
    },
    goToAbout() {
      this.$router.push("/aboutns");
    }
  }
};
</script>

<style scoped>
/* Container */
.app-container {
  font-family: "Inter", sans-serif;
  background: #f9fbfd;
  color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Top bar */
.top-bar {
  width: 100%;
  height: 80px;
  background: #f9fbfd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 215px;
  box-shadow: none;
}

.logo {
  font-weight: bold;
  font-size: 25px;
  color: #004aad;
  cursor: pointer;
}

.right-section {
  display: flex;
  align-items: center;
  gap: 15px;
}

/* Username */
.username {
  font-weight: normal;
  font-size: 16px;
  color: #333;
}

.clickable {
  cursor: pointer;
  color: #333;
}

.clickable:hover {
  text-decoration: none;
}

/* Progress Circle */
.progress-circle {
  width: 30px;
  height: 30px;
  background-color: #004aad;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-number {
  color: white;
  font-weight: bold;
  font-size: 15px;
}

/* Icons */
.icon-img {
  height: 30px;
  width: auto;
  cursor: pointer;
}

/* Settings Container */
.settings-container {
  padding: 20px;
  max-width: 800px;
  margin: 40px auto;
}

.settings-header {
  text-align: center;
  margin-bottom: 20px;
}

.settings-header h1 {
  font-size: 28px;
  color: #24488b;
  font-weight: bold;
}

.settings-content {
  background: #fff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

section {
  margin-bottom: 20px;
}

section h2 {
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
}

.setting-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.setting-item label {
  font-size: 14px;
  margin-bottom: 6px;
  color: #555;
}

.setting-item input[type="text"],
.setting-item input[type="email"] {
  padding: 8px 10px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
  outline: none;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
}

.save-btn {
  background: #24488b;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}

.logout-btn {
  background: #ddd;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}

.save-btn:hover {
  background: #003680;
}

.logout-btn:hover {
  background: #cc0000;
}
</style>
