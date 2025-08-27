<template>
  <div class="app-container">
    <!-- Top Bar -->
    <header class="top-bar">
      <div class="left-section">
        <span class="logo" @click="goToHome" style="cursor: pointer;">NurseScripts</span>
      </div>
      <div class="right-section">
        <a @click="$router.push('/user')" style="cursor: pointer; text-decoration: none; color: inherit;">
          GwenStacy
        </a>
        <div class="progress-circle">
          <span class="progress-number">5</span>
        </div>
        <img src="@/assets/settings.png" alt="Settings" class="icon-img" @click="goToSettings" />
        <img src="@/assets/highscore.png" alt="Highscore" class="icon-img" @click="goToHighscore" />
        <img src="@/assets/about.png" alt="About" class="icon-img" @click="goToAbout" />
      </div>
    </header>

    <!-- Profile Section -->
    <div class="profile-container">
      <!-- User Info -->
      <div class="user-info-card">
        <img class="avatar" src="https://via.placeholder.com/80" alt="User Avatar" />
        <div class="user-details">
          <h2>Gwen Stacy</h2>
          <p>gwenstacy@example.com</p>
          <span class="badge">Nursing</span>
        </div>
        <div class="user-meta">
          <p><strong>Joined:</strong> April 15 2025</p>
          <p><strong>Current Streak:</strong> 9 days</p>
          <div class="goals">
            <span class="goal">20 tests a day</span>
            <span class="goal">100 day streak</span>
            <span class="goal">Level 20</span>
          </div>
        </div>
      </div>

      <!-- All Time Stats -->
      <div class="stats-card">
        <h3>All Time Statistics</h3>
        <div class="stats-grid">
          <div class="stat-box">
            <div class="value">22:56:43</div>
            <span>Time</span>
          </div>
          <div class="stat-box">
            <div class="value">3,326</div>
            <span>Tests</span>
          </div>
          <div class="stat-box">
            <div class="value">94 wpm</div>
            <span>Top Speed</span>
          </div>
          <div class="stat-box">
            <div class="value">71 wpm</div>
            <span>Avg Speed</span>
          </div>
          <div class="stat-box">
            <div class="value">71%</div>
            <span>Top Accuracy</span>
          </div>
          <div class="stat-box">
            <div class="value">93%</div>
            <span>Avg Accuracy</span>
          </div>
        </div>
      </div>

      <!-- Today Stats -->
      <div class="stats-card">
        <h3>Statistics for Today</h3>
        <div class="stats-grid">
          <div class="stat-box">
            <div class="value">00:05:43</div>
            <span>Time</span>
          </div>
          <div class="stat-box">
            <div class="value">6</div>
            <span>Tests</span>
          </div>
          <div class="stat-box">
            <div class="value">80 wpm</div>
            <span>Top Speed</span>
          </div>
          <div class="stat-box">
            <div class="value">78 wpm</div>
            <span>Avg Speed</span>
          </div>
          <div class="stat-box">
            <div class="value">98%</div>
            <span>Top Accuracy</span>
          </div>
          <div class="stat-box">
            <div class="value">96%</div>
            <span>Avg Accuracy</span>
          </div>
        </div>
      </div>

      <!-- Achievements -->
      <div class="achievements-card">
        <h3>Achievements</h3>
        <div class="achievements-grid">
          <span class="achievement">First 10 Tests</span>
          <span class="achievement">100% Accuracy Streak</span>
          <span class="achievement">Typed 500 Medical Terms</span>
          <span class="achievement">Consistent Typist</span>
          <span class="achievement">Daily Goal Achiever</span>
          <span class="achievement">First 50 Tests</span>
        </div>
      </div>

  <!-- Typing History Graph -->
<div class="chart-card">
  <h3>Typing History</h3>
  <Line :data="chartData" :options="chartOptions" />
</div>

      <!-- Test History Table -->
      <div class="table-card">
        <h3>Test History</h3>
        <table>
          <thead>
            <tr>
              <th>WPM</th>
              <th>Accuracy</th>
              <th>Consistency</th>
              <th>Chars</th>
              <th>Mode</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(test, index) in testHistory" :key="index">
              <td>{{ test.wpm }}</td>
              <td>{{ test.accuracy }}</td>
              <td>{{ test.consistency }}</td>
              <td>{{ test.chars }}</td>
              <td>{{ test.mode }}</td>
              <td>{{ test.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale);

export default {
  name: "UserPage",
  components: { Line },
  data() {
    return {
      chartData: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "WPM",
            data: [70, 75, 80, 78, 82, 85, 88],
            borderColor: "#004aad",
            backgroundColor: "rgba(0, 74, 173, 0.2)",
            fill: true,
            tension: 0.3,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      testHistory: [
        { wpm: 88, accuracy: "88.00%", consistency: "96.23%", chars: "118/0/0/0", mode: "time 15", date: "29 Jun 2025" },
        { wpm: 96, accuracy: "96.57%", consistency: "100.00%", chars: "47/0/0/0", mode: "words 10", date: "28 Jun 2025" },
        { wpm: 93, accuracy: "63.97%", consistency: "90.75%", chars: "105/0/0/0", mode: "time 15", date: "28 Jun 2025" },
        { wpm: 91, accuracy: "97.57%", consistency: "96.60%", chars: "115/1/0/1", mode: "time 15", date: "28 Jun 2025" },
      ],
    };
  },
  methods: {
    goToSettings() {
      this.$router.push("/settings");
    },
    goToHome() {
      this.$router.push("/loggedin");
    },
    goToHighscore() {
      this.$router.push("/highscore");
    },
    goToAbout() {
      this.$router.push("/aboutns");
    },
  },
};
</script>

<style scoped>
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
.icon-img {
  height: 30px;
  width: auto;
  cursor: pointer;
}

/* Profile Section */
.profile-container {
  padding: 30px 200px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.user-info-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  gap: 20px;
  align-items: center;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.user-details h2 {
  margin: 0;
  font-size: 20px;
}
.badge {
  display: inline-block;
  background: #004aad;
  color: white;
  padding: 3px 8px;
  border-radius: 5px;
  font-size: 12px;
}
.user-meta {
  margin-left: auto;
  text-align: right;
}
.goals {
  display: flex;
  gap: 8px;
}
.goal {
  background: #f0f4ff;
  border: 1px solid #004aad;
  padding: 4px 10px;
  border-radius: 5px;
  font-size: 12px;
}

/* Stats */
.stats-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 15px;
  margin-top: 10px;
}
.stat-box {
  background: #f0f4ff;
  border: 1px solid #004aad;
  border-radius: 6px;
  padding: 10px;
  text-align: center;
}
.stat-box .value {
  font-size: 18px;
  font-weight: bold;
}
.stat-box span {
  display: block;
  font-size: 12px;
  color: #666;
}

/* Achievements */
.achievements-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
}
.achievements-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.achievement {
  background: #f0f4ff;
  border: 1px solid #004aad;
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 13px;
}

/* Chart */
.chart-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  height: 300px;
}
.chart-card canvas {
  height: 100% !important;
}

/* Table */
.table-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
}
.table-card table {
  width: 100%;
  border-collapse: collapse;
}
.table-card th,
.table-card td {
  border-bottom: 1px solid #eee;
  padding: 10px;
  text-align: center;
  font-size: 14px;
}
.table-card th {
  background: #f9fbfd;
  font-weight: bold;
}
</style>
