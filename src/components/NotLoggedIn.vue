<template>
  <div class="app-container">
    <!-- Top Bar -->
    <header class="top-bar">
      <div class="left-section">
        <span class="logo">NurseScripts</span>
      </div>
      <div class="right-section">
        <button class="btn login-btn" @click="goToLogin">Log In</button>
      </div>
    </header>

    <!-- Centered Main Section -->
    <div class="main-section">
      <!-- Timer and Customize -->
      <div class="timer-section">
        <button class="btn customize-btn" @click="showWarning">Customize</button>
        <span class="time-text">Time</span>
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

      <!-- Warning Message -->
      <transition name="fade">
        <div v-if="warningVisible" class="warning-message">
          Please login to use the customize menu and save your progress.
        </div>
      </transition>

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
  name: "NotLoggedIn",
  data() {
    return {
      timeLeft: 30,
      totalTime: 30,
      typedText: "",
      typingStarted: false,
      timer: null,
      warningVisible: false,
      textToType:
        "NurseScripts is a typing test website designed specifically for nursing students to improve both their typing speed and medical terminology skills. Unlike regular typing platforms that use random words, NurseScripts focuses on real-world clinical scenarios, patient cases, and medical vocabulary that nurses encounter in their daily work. By practicing here, students not only become faster and more accurate typists but also gain confidence in documenting patient information, writing orders, and handling critical records. This makes the practice directly relevant to their profession and more beneficial than other typing test sites. With NurseScripts, nursing students can build efficiency, accuracy, and confidence—skills that carry over into real-world healthcare settings where precision and speed truly matter."
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
        this.$refs.redoBtn && this.$refs.redoBtn.focus();
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
        }
      }, 1000);
    },
    resetTyping() {
      clearInterval(this.timer);
      this.timeLeft = this.totalTime;
      this.typedText = "";
      this.typingStarted = false;
    },
    goToLogin() {
      this.$router.push("/login");
    },
    showWarning() {
      this.warningVisible = true;
      setTimeout(() => {
        this.warningVisible = false;
      }, 3000);
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

.top-bar {
  width: 100%;
  height: 80px;
  background: #f9fbfd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 330px;
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
  gap: 12px;
}

.btn {
  background: #004aad;
  border: none;
  color: white;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  opacity: 0.9;
}

.icon-img {
  height: 30px;
  width: auto;
  cursor: pointer;
}

.main-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 25px;
  margin-top: 100px;
}

.timer-section {
  display: flex;
  align-items: center;
  gap: 15px;
  width: 70%;
}

.customize-btn {
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

.typing-box {
  width: 70%;
  min-height: 150px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid #ddd;
  font-size: 21px;
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

/* Warning Message */
.warning-message {
  color: #d9534f;
  font-weight: 500;
  margin-top: 10px;
  background: #f8d7da;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #f5c6cb;
}

/* Fade transition for warning */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
