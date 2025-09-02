<template>
  <div class="app-container">
    <!-- Top Bar -->
    <header class="top-bar">
      <div class="left-section">
        <span class="logo" @click="goToHome" style="cursor: pointer;">NurseScripts</span>
      </div>
      <div class="right-section">
        <!-- Username -->
        <a @click="$router.push('/user')" style="cursor: pointer; text-decoration: none; color: inherit;">
          GwenStacy
        </a>

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

    <!-- Centered Main Section -->
    <div class="main-section">
      <!-- Timer and Customize -->
      <div class="timer-section">
        <button class="btn customize-btn" @click="goToCustomize">Customize</button>
        <span class="time-text">Respiratory System</span>
        <div class="progress-bar">
          <div class="progress" :style="{ width: progressWidth + '%' }"></div>
        </div>
      </div>

      <!-- Typing Test -->
      <div
        class="typing-box"
        tabindex="0"
        @keydown="handleKeyPress"
      >
        <span v-for="(char, index) in textToType.split('')" :key="index">
          <span :class="getCharClass(index)">
            {{ char }}
          </span>

          <!-- Cursor appears ONLY at current typing position -->
          <span
            v-if="timeLeft > 0 && index === typedText.length && typedText.length < textToType.length"
            class="cursor"
          ></span>
        </span>
      </div>

      <!-- Redo Button -->
      <div class="redo-section">
        <img
          src="@/assets/redo.png"
          alt="Redo"
          class="redo-img"
          tabindex="0"
          ref="redoBtn"
          @click="resetTyping"
          @keydown.enter.prevent="resetTyping"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RespiratorySys",
  data() {
    return {
      timeLeft: 30,
      totalTime: 30,
      typedText: "",
      typingStarted: false,
      timer: null,
      correct: 0,
      incorrect: 0,
      textToType:
        "Breath sounds were diminished at the left base with an occasional end-expiratory wheeze. The patient used accessory muscles while climbing stairs. Oxygen saturation dropped to ninety-one percent during ambulation and recovered with rest. The nurse encouraged pursed-lip breathing and correct inhaler technique. She demonstrated spacer use, timed inspiration with actuation, and instructed rinsing after corticosteroids. Education included trigger avoidance, medication adherence, early recognition of exacerbations, and when to seek urgent care. The student monitored respiratory rate, cough quality, and sputum characteristics. After nebulizer treatment, work of breathing decreased and breath sounds improved, supporting the plan of care throughout the shift."
    };
  },
  computed: {
    progressWidth() {
      return (this.timeLeft / this.totalTime) * 100;
    }
  },
  methods: {
    handleKeyPress(e) {
      if (this.timeLeft <= 0) return;

      if (e.key === "Tab") {
        e.preventDefault();
        this.$refs.redoBtn.focus();
        return;
      }

      if (!this.typingStarted) {
        this.typingStarted = true;
        this.startTimer();
      }

      if (e.key === "Backspace") {
        this.typedText = this.typedText.slice(0, -1);
        return;
      }

      if (e.key.length === 1) {
        this.typedText += e.key;

        // Track correctness as user types
        const currentIndex = this.typedText.length - 1;
        if (this.textToType[currentIndex] === e.key) {
          this.correct++;
        } else {
          this.incorrect++;
        }
      }
    },
    getCharClass(index) {
      if (index < this.typedText.length) {
        return this.typedText[index] === this.textToType[index]
          ? "correct"
          : "incorrect";
      } else {
        return "pending";
      }
    },
    startTimer() {
      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          clearInterval(this.timer);
          this.finishTest();
        }
      }, 1000);
    },
    resetTyping() {
      clearInterval(this.timer);
      this.timeLeft = this.totalTime;
      this.typedText = "";
      this.correct = 0;
      this.incorrect = 0;
      this.typingStarted = false;
    },
    finishTest() {
      const elapsed = this.totalTime;
      const wordsTyped = this.typedText.trim().split(/\s+/).length;
      const wpm = Math.round((wordsTyped / elapsed) * 60);
      const totalChars = this.typedText.length;
      const accuracy = totalChars > 0 ? Math.round((this.correct / totalChars) * 100) : 0;

      this.$router.push({
        path: "/results",
        query: {
          wpm,
          accuracy,
          time: elapsed,
          correct: this.correct,
          incorrect: this.incorrect,
          backspaces: 0
        }
      });
    },
    goToSettings() {
      this.$router.push("/settings");
    },
    goToHome() {
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
    },
    goToCustomize() {
      this.$router.push("/customize");
    }
  },
  beforeUnmount() {
    clearInterval(this.timer);
  }
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
  padding:  0px 215px;
  box-shadow: none;
}

.logo {
  font-weight: bold;
  font-size: 25px;
  color: #004aad;
}

.right-section {
  display: flex;
  align-items: center;
  gap: 15px;
}

/* Username */
.username {
  font-weight: normal;
  font-size: 18px;
  color: #333;
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

.icon-img {
  height: 30px;
  width: auto;
  cursor: pointer;
}

/* Centered Section */
.main-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 50px;
  margin-top: 100px;
}

/* Timer Section */
.timer-section {
  display: flex;
  align-items: center;
  gap: 15px;
  width: 70%;
}

.customize-btn {
  color: white;
  background: #004aad;
  padding: 6px 12px;
}

.time-text {
  font-weight: 500;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: #004aad;
  transition: width 0.3s linear;
}

/* Typing Box */
.typing-box {
  width: 70%;
  min-height: 150px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid #ddd;
  font-size: 28px;
  line-height: 1.5;
  outline: none;
  cursor: text;
  user-select: none;
  text-align: justify;
}

.pending {
  color: #bbb;
}

.correct {
  color: black;
}

.incorrect {
  color: red;
}

/* Cursor */
.cursor {
  display: inline-block;
  width: 2px;
  height: 1.2em;
  background-color: black;
  margin-left: 1px;
  animation: blink 1s infinite;
  vertical-align: bottom;
}

@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}

/* Redo Section */
.redo-section {
  margin-top: 5px;
}

.redo-img {
  height: 34px;
  cursor: pointer;
  outline: none;
}

.redo-img:focus {
  outline: 3px solid #004aad;
  border-radius: 6px;
}
</style>
