<template>
  <div class="app-container">
    <!-- Top Bar -->
    <header class="top-bar">
      <div class="left-section">
        <span class="logo">NurseScripts</span>
      </div>
      <div class="right-section">
        <button class="btn login-btn" @click="goToLogin">Log In</button>
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
        <span class="time-text">Time: {{ timeLeft }}</span>
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
  name: "NotLoggedIn",
  data() {
    return {
      timeLeft: 30,
      totalTime: 30,
      typedText: "",
      typingStarted: false,
      timer: null,
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
      if (this.timeLeft <= 0) return; // stop typing if timer is up

      // Prevent tab from leaving
      if (e.key === "Tab") {
        e.preventDefault();
        this.$refs.redoBtn && this.$refs.redoBtn.focus();
        return;
      }

      if (!this.typingStarted) {
        this.typingStarted = true;
        this.startTimer();
      }

      // Backspace
      if (e.key === "Backspace") {
        this.typedText = this.typedText.slice(0, -1);
        return;
      }

      // Normal typing (ignore control keys)
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
    goToAbout() {
      // Redirect to the About page for not-logged-in users
      this.$router.push("/aboutnsnolog");
    },
    goToCustomize() {
      // Redirect to the Customize page for not-logged-in users
      this.$router.push("/customizenolog");
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

/* Top bar - seamless with background */
.top-bar {
  width: 100%;
  height: 80px;
  background: #f9fbfd; /* same as body */
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

/* Centered Section */
.main-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 25px;
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
