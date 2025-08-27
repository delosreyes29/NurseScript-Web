<template>
  <div class="app-container">
    <!-- Top Bar (DO NOT CHANGE) -->
    <header class="top-bar">
      <div class="left-section">
        <span class="logo" @click="goToLoggedIn">NurseScripts</span>
      </div>
      <div class="right-section">
        <img
          src="@/assets/about.png"
          alt="About"
          class="icon-img"
          @click="goToAbout"
        />
      </div>
    </header>

    <!-- Customize Content -->
    <div class="customize-shell">
      <!-- Keys to include -->
      <section class="group">
        <div class="group-title">keys to include</div>
        <div class="group-row">
          <button
            class="pill"
            :class="{ active: keys.numbers }"
            @click="toggleKey('numbers')"
          >
            numbers
          </button>
          <button
            class="pill"
            :class="{ active: keys.punctuation }"
            @click="toggleKey('punctuation')"
          >
            punctuation
          </button>
        </div>
      </section>

      <!-- Mode -->
      <section class="group">
        <div class="group-title">Mode</div>
        <div class="group-row wrap">
          <button
            class="pill"
            :class="{ active: mode === 'words' }"
            @click="selectMode('words')"
          >
            words
          </button>

          <button
            class="pill"
            :class="{ active: mode === 'time' }"
            @click="selectMode('time')"
          >
            time
          </button>

          <!-- Clinical scenarios -->
          <div class="dropdown-wrapper">
            <button
              class="pill with-caret"
              :class="{ active: mode === 'clinical' }"
              @click="toggleDropdown('clinical')"
            >
              clinical scenarios
              <span class="caret">▾</span>
            </button>
            <div
              v-if="showClinical"
              class="dropdown"
              @mouseleave="showClinical = false"
            >
              <div
                v-for="opt in clinicalOptions"
                :key="opt"
                class="dropdown-item"
                :class="{ selected: selectedClinical === opt }"
                @click="selectClinical(opt)"
              >
                {{ opt }}
              </div>
            </div>
          </div>

          <!-- Body system -->
          <div class="dropdown-wrapper">
            <button
              class="pill with-caret"
              :class="{ active: mode === 'body' }"
              @click="toggleDropdown('body')"
            >
              body-system
              <span class="caret">▾</span>
            </button>
            <div
              v-if="showBody"
              class="dropdown"
              @mouseleave="showBody = false"
            >
              <div
                v-for="opt in bodySystemOptions"
                :key="opt"
                class="dropdown-item"
                :class="{ selected: selectedBody === opt }"
                @click="selectBody(opt)"
              >
                {{ opt }}
              </div>
            </div>
          </div>

          <button
            class="pill"
            :class="{ active: mode === 'custom' }"
            @click="selectMode('custom')"
          >
            custom
          </button>
        </div>
      </section>

      <!-- Time -->
      <section class="group">
        <div class="group-title">Time</div>
        <div class="group-row wrap">
          <button
            class="pill"
            :class="{ active: timeSelection === 15 }"
            @click="selectTime(15)"
          >
            15
          </button>
          <button
            class="pill"
            :class="{ active: timeSelection === 30 }"
            @click="selectTime(30)"
          >
            30
          </button>
          <button
            class="pill"
            :class="{ active: timeSelection === 60 }"
            @click="selectTime(60)"
          >
            60
          </button>
          <button
            class="pill"
            :class="{ active: timeSelection === 120 }"
            @click="selectTime(120)"
          >
            120
          </button>

          <div class="custom-time">
            <button
              class="pill"
              :class="{ active: timeSelection === 'custom' }"
              @click="selectTime('custom')"
            >
              custom
            </button>
            <input
              v-if="timeSelection === 'custom'"
              class="custom-input"
              type="number"
              min="1"
              placeholder="mins"
              v-model.number="customMinutes"
            />
          </div>
        </div>
      </section>

      <!-- Footer actions -->
      <div class="footer-actions">
        <button class="secondary-btn" @click="resetAll">reset</button>
        <button class="primary-btn" @click="done">done</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomizePage",
  data() {
    return {
      // keys
      keys: {
        numbers: false,
        punctuation: false,
      },

      // mode
      mode: null,
      clinicalOptions: [
        "ABG interpretation",
        "Sepsis",
        "Medication safety",
        "Wound care",
      ],
      bodySystemOptions: [
        "Cardiovascular",
        "Respiratory",
        "GI",
        "Renal",
        "Neuro",
        "Endocrine",
      ],
      selectedClinical: null,
      selectedBody: null,
      showClinical: false,
      showBody: false,

      // time
      timeSelection: null, // 15 | 30 | 60 | 120 | 'custom'
      customMinutes: null,
    };
  },
  methods: {
    // Top-bar routes
    goToSettings() {
      this.$router.push("/settings");
    },
    goToHighscore() {
      this.$router.push("/highscore");
    },
    goToAbout() {
      this.$router.push("/aboutns");
    },
    goToLoggedIn() {
      this.$router.push("/loggedin");
    },
    goToUserPage() {
      this.$router.push("/user");
    },

    // Interactions
    toggleKey(k) {
      this.keys[k] = !this.keys[k];
    },
    selectMode(m) {
      this.mode = m;
      // close dropdowns if switching
      if (m !== "clinical") this.showClinical = false;
      if (m !== "body") this.showBody = false;
    },
    toggleDropdown(which) {
      if (which === "clinical") {
        this.mode = "clinical";
        this.showClinical = !this.showClinical;
        this.showBody = false;
      } else {
        this.mode = "body";
        this.showBody = !this.showBody;
        this.showClinical = false;
      }
    },
    selectClinical(opt) {
      this.selectedClinical = opt;
      this.mode = "clinical";
      this.showClinical = false;
    },
    selectBody(opt) {
      this.selectedBody = opt;
      this.mode = "body";
      this.showBody = false;
    },
    selectTime(val) {
      this.timeSelection = val;
      if (val !== "custom") this.customMinutes = null;
    },

    resetAll() {
      this.keys = { numbers: false, punctuation: false };
      this.mode = null;
      this.selectedClinical = null;
      this.selectedBody = null;
      this.showClinical = false;
      this.showBody = false;
      this.timeSelection = null;
      this.customMinutes = null;
    },

    done() {
      // Example payload you might save/emit if needed later
      // const payload = {
      //   keys: this.keys,
      //   mode: this.mode,
      //   clinical: this.selectedClinical,
      //   body: this.selectedBody,
      //   time: this.timeSelection === 'custom' ? this.customMinutes : this.timeSelection
      // };
      this.$router.push("/loggedin");
    },
  },
};
</script>

<style scoped>
.app-container {
  font-family: "Inter", sans-serif;
  background: #f5f7fb;
  min-height: 100vh;
  color: #1f2a44;
}

/* ---------- TOP BAR (unchanged) ---------- */
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

/* ---------- CUSTOMIZE LAYOUT ---------- */
.customize-shell {
  max-width: 1120px;
  margin: 30px auto 60px;
  padding: 0 24px;
}

.group {
  background: #ffffff;
  border: 1px solid #e5e9f2;
  border-radius: 10px;
  padding: 22px 26px;
  margin-bottom: 22px;
}

.group-title {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 12px;
  text-transform: lowercase;
}

.group-row {
  display: flex;
  align-items: center;
  gap: 14px;
}

.group-row.wrap {
  flex-wrap: wrap;
}

/* Pills (boxes) */
.pill {
  appearance: none;
  border: 1px solid #d8deeb;
  background: #f3f6fb;
  color: #203765;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.15s ease;
  min-width: 96px;
  text-align: center;
}

.pill:hover {
  filter: brightness(0.97);
}

.pill.active {
  background: #2e55a2;
  color: #ffffff;
  border-color: #2e55a2;
}

.pill.with-caret {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.caret {
  font-size: 12px;
  opacity: 0.9;
}

/* Dropdowns */
.dropdown-wrapper {
  position: relative;
}

.dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 220px;
  background: #ffffff;
  border: 1px solid #e3e8f5;
  box-shadow: 0 8px 24px rgba(25, 44, 92, 0.08);
  border-radius: 10px;
  z-index: 10;
  padding: 8px;
}

.dropdown-item {
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #1f2a44;
}

.dropdown-item:hover {
  background: #f2f6ff;
}

.dropdown-item.selected {
  background: #e7eefc;
  color: #2e55a2;
}

/* Custom time input */
.custom-time {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.custom-input {
  width: 90px;
  height: 40px;
  padding: 0 10px;
  border-radius: 8px;
  border: 1px solid #d8deeb;
  background: #ffffff;
  font-size: 14px;
  outline: none;
}

/* Footer buttons */
.footer-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 28px;
}

.primary-btn,
.secondary-btn {
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  font-size: 15px;
  padding: 12px 26px;
  transition: transform 0.05s ease, filter 0.1s ease;
}

.primary-btn {
  background: #2e55a2;
  color: #ffffff;
}

.primary-btn:active,
.secondary-btn:active {
  transform: translateY(1px);
}

.secondary-btn {
  background: #eef2f9;
  color: #274472;
}

.secondary-btn:hover {
  filter: brightness(0.98);
}

.primary-btn:hover {
  filter: brightness(0.98);
}
</style>
