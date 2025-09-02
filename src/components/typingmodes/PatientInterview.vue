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
        <div class="progress-circle"><span class="progress-number">5</span></div>
        <img src="@/assets/settings.png" alt="Settings" class="icon-img" @click="goToSettings" />
        <img src="@/assets/highscore.png" alt="Highscore" class="icon-img" @click="goToHighscore" />
        <img src="@/assets/about.png" alt="About" class="icon-img" @click="goToAbout" />
      </div>
    </header>

    <!-- Body -->
    <div class="main-section">
      <!-- Keep customize + page title -->
      <div class="timer-section">
        <button class="btn customize-btn" @click="goToCustomize">Customize</button>
        <span class="time-text">Patient Interview (Speech-to-text)</span>
      </div>

      <!-- Play/Pause + Scrubbable progress bar -->
      <div class="audio-row">
        <button
          class="play-btn"
          :aria-label="isPlaying ? 'Pause' : 'Play'"
          @click="togglePlay"
        >
          <span v-if="!isPlaying" class="icon-play"></span>
          <span v-else class="icon-pause"></span>
        </button>

        <div
          class="seekbar"
          ref="seekbar"
          @click="seekFromEvent"
          @mousedown="beginDrag"
          @touchstart.prevent="beginDrag"
        >
          <div class="seekbar-track"></div>
          <div class="seekbar-fill" :style="{ width: progressPct + '%' }"></div>
          <div class="seekbar-knob" :style="{ left: 'calc(' + progressPct + '% - 6px)' }"></div>
        </div>
      </div>

      <!-- Sheet (ONLY typing surface) -->
      <div
        class="sheet"
        tabindex="0"
        ref="sheet"
        @keydown="handleKeyPress"
      >
        <span v-for="(ch, i) in textToType.split('')" :key="i">
          <span :class="getCharClass(i)">{{ ch }}</span>
          <span
            v-if="i === typedText.length && typedText.length < textToType.length"
            class="cursor"
          ></span>
        </span>
      </div>

      <!-- Submit -->
      <div class="actions">
        <button class="submit-btn" @click="submit">submit</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PatientInterview",
  data() {
    return {
      // typing session
      typedText: "",
      startedAt: null,
      typingStarted: false,
      correct: 0,
      incorrect: 0,

      // audio (frontend-only mock)
      isPlaying: false,
      duration: 120, // seconds
      currentTime: 10,
      audioTimer: null,
      dragging: false,

      // passage
      textToType:
        " "
    };
  },
  computed: {
    progressPct() {
      return Math.min(100, Math.max(0, (this.currentTime / this.duration) * 100));
    }
  },
  methods: {
    /* ---------- Typing ---------- */
    handleKeyPress(e) {
      if (e.key === "Tab") { e.preventDefault(); return; }

      if (!this.typingStarted) {
        this.typingStarted = true;
        this.startedAt = Date.now();
      }

      if (e.key === "Backspace") {
        if (this.typedText.length > 0) this.typedText = this.typedText.slice(0, -1);
        return;
      }

      if (e.key.length === 1) {
        this.typedText += e.key;
        const idx = this.typedText.length - 1;
        if (this.textToType[idx] === e.key) this.correct++;
        else this.incorrect++;
      }
    },
    getCharClass(i) {
      if (i < this.typedText.length) {
        return this.typedText[i] === this.textToType[i] ? "correct" : "incorrect";
      }
      return "pending";
    },

    /* ---------- Audio mock ---------- */
    togglePlay() {
      this.isPlaying = !this.isPlaying;
      if (this.isPlaying) this.startAudioTimer();
      else this.stopAudioTimer();
    },
    startAudioTimer() {
      this.stopAudioTimer();
      this.audioTimer = setInterval(() => {
        if (this.currentTime < this.duration) {
          this.currentTime += 0.1;
        } else {
          this.currentTime = this.duration;
          this.isPlaying = false;
          this.stopAudioTimer();
        }
      }, 100);
    },
    stopAudioTimer() {
      if (this.audioTimer) {
        clearInterval(this.audioTimer);
        this.audioTimer = null;
      }
    },
    seekFromEvent(ev) {
      const el = this.$refs.seekbar;
      const rect = el.getBoundingClientRect();
      const x = (ev.touches ? ev.touches[0].clientX : ev.clientX) - rect.left;
      const pct = Math.min(1, Math.max(0, x / rect.width));
      this.currentTime = pct * this.duration;
    },
    beginDrag(ev) {
      this.dragging = true;
      const move = (e) => { if (this.dragging) this.seekFromEvent(e); };
      const up = () => {
        this.dragging = false;
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", up);
        window.removeEventListener("touchmove", move);
        window.removeEventListener("touchend", up);
      };
      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);
      window.addEventListener("touchmove", move, { passive: false });
      window.addEventListener("touchend", up);
      this.seekFromEvent(ev);
    },

    /* ---------- Submit ---------- */
    submit() {
      const elapsedSec = this.startedAt ? Math.max(1, Math.round((Date.now() - this.startedAt) / 1000)) : 60;
      const wordsTyped = this.typedText.trim().split(/\s+/).filter(Boolean).length || 0;
      const wpm = Math.round((wordsTyped / elapsedSec) * 60);
      const totalChars = this.typedText.length;
      const accuracy = totalChars ? Math.round((this.correct / totalChars) * 100) : 0;

      this.$router.push({
        path: "/results",
        query: { wpm, accuracy, time: elapsedSec, correct: this.correct, incorrect: this.incorrect, backspaces: 0 }
      });
    },

    /* ---------- Nav ---------- */
    goToSettings() { this.$router.push("/settings"); },
    goToHome() { this.$router.push("/loggedin"); },
    goToUserPage() { this.$router.push("/user"); },
    goToHighscore() { this.$router.push("/highscore"); },
    goToAbout() { this.$router.push("/aboutns"); },
    goToCustomize() { this.$router.push("/customize"); }
  },
  beforeUnmount() {
    this.stopAudioTimer();
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
  padding: 0 215px;
}
.logo { font-weight: bold; font-size: 25px; color: #004aad; cursor: pointer; }
.right-section { display: flex; align-items: center; gap: 15px; }
.progress-circle { width: 30px; height: 30px; background:#004aad; border-radius:50%; display:flex; align-items:center; justify-content:center; }
.progress-number { color:#fff; font-weight: bold; font-size:15px; }
.icon-img { height:30px; width:auto; cursor:pointer; }

/* Layout */
.main-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;            /* original spacing */
  margin-top: 100px;    /* original spacing */
}

/* Title row (kept) */
.timer-section {
  width: 70%;
  display: flex;
  align-items: center;
  gap: 15px;            /* original */
  justify-content: flex-start;
}
.customize-btn { color:#fff; background:#004aad; padding:6px 12px; }
.time-text { font-weight:500; } /* original weight */

/* Audio controls */
.audio-row {
  width: 70%;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 10px;
}
.play-btn {
  width: 22px; height: 22px;
  border: none; background: transparent;
  display: grid; place-items: center;
  cursor: pointer;
}
.icon-play {
  width: 0; height: 0;
  border-left: 12px solid #2e55a2;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
}
.icon-pause { width: 12px; height: 14px; position: relative; }
.icon-pause::before, .icon-pause::after {
  content: ""; position: absolute; top: 0; width: 4px; height: 14px; background: #2e55a2;
}
.icon-pause::before { left: 0; }
.icon-pause::after  { right: 0; }

.seekbar { position: relative; height: 10px; border-radius:999px; cursor: pointer; }
.seekbar-track { position: absolute; inset: 0; background:#d9dfef; border-radius:999px; }
.seekbar-fill { position: absolute; left:0; top:0; bottom:0; background:#2e55a2; border-radius:999px; }
.seekbar-knob { position:absolute; top:50%; width:12px; height:12px; border-radius:50%; background:#fff; border:2px solid #2e55a2; transform: translateY(-50%); }

/* Sheet – keep ORIGINAL font size & weight */
.sheet {
  width: 70%;
  min-height: 260px;
  padding: 20px;                 /* original padding */
  background: #ffffff;
  border: 1px solid #ddd;        /* original border color */
  border-radius: 10px;           /* original radius */
  box-shadow: 0px 2px 10px rgba(0,0,0,0.05);  /* original shadow */
  text-align: justify;           /* original alignment */
  line-height: 1.5;              /* original line-height */
  font-size: 28px;               /* ORIGINAL font-size */
  user-select: none;
  outline: none;
  cursor: text;
  color: #333;                   /* original text color */
}

/* Typing feedback – original colors */
.pending { color: #bbb; }
.correct { color: #000; }
.incorrect { color: #d93025; }

/* Caret */
.cursor {
  display: inline-block;
  width: 2px;
  height: 1.2em;
  background-color: #000;
  margin-left: 1px;
  animation: blink 1s infinite;
  vertical-align: bottom;
}
@keyframes blink { 0%{opacity:1;} 50%{opacity:0;} 100%{opacity:1;} }

/* Bottom submit */
.actions {
  width: 70%;
  display: flex;
  justify-content: flex-end;
}
.submit-btn {
  background: #004aad;
  color: white;
  border: none;
  padding: 8px 22px;
    border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
}
.submit-btn:active { transform: translateY(1px); }
</style>
