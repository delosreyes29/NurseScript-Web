<template>
  <div class="app-container">
    <!-- Top Bar -->
    <header class="top-bar">
      <div class="left-section">
        <span class="logo" @click="goToLoggedIn">NurseScripts</span>
      </div>
      <div class="right-section">
        <span class="username" @click="goToUserPage">{{ username }}</span>
        <div class="progress-circle">
          <span class="progress-number">5</span>
        </div>
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
        />
        <img
          src="@/assets/about.png"
          alt="About"
          class="icon-img"
          @click="goToAbout"
        />
      </div>
    </header>

    <!-- High Score Content -->
    <div class="highscore-container">
      <h1 class="highscore-title">Leaderboard</h1>
      <table class="highscore-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(player, index) in players"
            :key="index"
            :class="{ highlight: player.username === username }"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ player.username }}</td>
            <td>{{ player.score }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "HighScorePage",
  data() {
    return {
      username: "GwenStacy",
      players: [
        { username: "PeterParker", score: 1200 },
        { username: "TonyStark", score: 1100 },
        { username: "Natasha", score: 1050 },
        { username: "BruceBanner", score: 1000 },
        { username: "GwenStacy", score: 980 },
        { username: "ClintBarton", score: 900 },
        { username: "SteveRogers", score: 850 }
      ]
    };
  },
  methods: {
    goToSettings() {
      this.$router.push("/settings");
    },
    goToLoggedIn() {
      this.$router.push("/loggedin");
    },
    goToUserPage() {
      this.$router.push("/user");
    },
    goToAbout() {
      this.$router.push("/aboutns");
    }
  }
};
</script>

<style scoped>
.app-container {
  font-family: "Inter", sans-serif;
  background: #f9fbfd;
  min-height: 100vh;
  color: #333;
}

/* Top Bar */
.top-bar {
  width: 100%;
  height: 80px;
  background: #f9fbfd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 215px;
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

.username {
  font-size: 16px;
  color: #333;
  cursor: pointer;
  text-decoration: none;
}

.username:hover {
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

/* High Score Table */
.highscore-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.highscore-title {
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  color: #24488b;
  margin-bottom: 20px;
}

.highscore-table {
  width: 100%;
  border-collapse: collapse;
}

.highscore-table th,
.highscore-table td {
  padding: 12px 15px;
  text-align: center;
  font-size: 16px;
  border-bottom: 1px solid #ddd;
}

.highscore-table th {
  background-color: #f4f6fa;
  font-weight: bold;
  color: #333;
}

.highlight {
  background-color: #e8f0fe;
  font-weight: bold;
}
</style>
