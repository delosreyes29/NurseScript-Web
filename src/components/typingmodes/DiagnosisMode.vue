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

    <!-- Main -->
    <div class="main-section">
      <div class="timer-section">
        <button class="btn customize-btn" @click="goToCustomize">Customize</button>
        <span class="time-text">Diagnosis</span>
        <div class="progress-bar">
          <div class="progress" :style="{ width: progressWidth + '%' }"></div>
        </div>
      </div>

      <!-- The ECG report is the typing area -->
      <div
        class="ecg-card"
        tabindex="0"
        @keydown="handleKeyPress"
        ref="card"
        aria-label="Electrocardiographic report typing test"
      >
        <div class="ecg-header">
          <div class="ecg-title">DIAGNOSTIC CENTER</div>
          <div class="ecg-subtitle">SAMPLE HOSPITAL</div>
          <div class="ecg-address">118 E. Quirino Ave., Davao City</div>
        </div>

        <div class="ecg-section-title">ELECTROCARDIOGRAPHIC REPORT</div>

        <!-- Patient Info Rows -->
        <div class="ecg-row">
          <div class="ecg-col">
            <span class="label">Name:</span>
            <span class="value">
              <template v-for="(ch,i) in valueChars(idx.name)" :key="'n'+i">
                <span :class="getValueCharClass(idx.name, i, ch)">{{ ch }}</span>
                <span v-if="isCursorHere(idx.name, i)" class="cursor"></span>
              </template>
            </span>
            <span v-if="isCursorOnSpaceAfter(idx.name)" class="cursor"></span>
          </div>
          <div class="ecg-col">
            <span class="label">Blood Pressure:</span>
            <span class="value">
              <template v-for="(ch,i) in valueChars(idx.bp)" :key="'bp'+i">
                <span :class="getValueCharClass(idx.bp, i, ch)">{{ ch }}</span>
                <span v-if="isCursorHere(idx.bp, i)" class="cursor"></span>
              </template>
            </span>
            <span v-if="isCursorOnSpaceAfter(idx.bp)" class="cursor"></span>
          </div>
        </div>

        <div class="ecg-row">
          <div class="ecg-col">
            <span class="label">Age:</span>
            <span class="value">
              <template v-for="(ch,i) in valueChars(idx.dob)" :key="'dob'+i">
                <span :class="getValueCharClass(idx.dob, i, ch)">{{ ch }}</span>
                <span v-if="isCursorHere(idx.dob, i)" class="cursor"></span>
              </template>
            </span>
            <span v-if="isCursorOnSpaceAfter(idx.dob)" class="cursor"></span>
          </div>
          <div class="ecg-col">
            <span class="label">Drugs being taken:</span>
            <span class="value">
              <template v-for="(ch,i) in valueChars(idx.drug)" :key="'drug'+i">
                <span :class="getValueCharClass(idx.drug, i, ch)">{{ ch }}</span>
                <span v-if="isCursorHere(idx.drug, i)" class="cursor"></span>
              </template>
            </span>
            <span v-if="isCursorOnSpaceAfter(idx.drug)" class="cursor"></span>
          </div>
        </div>

        <div class="ecg-row">
          <div class="ecg-col">
            <span class="label">Date:</span>
            <span class="value">
              <template v-for="(ch,i) in valueChars(idx.date)" :key="'date'+i">
                <span :class="getValueCharClass(idx.date, i, ch)">{{ ch }}</span>
                <span v-if="isCursorHere(idx.date, i)" class="cursor"></span>
              </template>
            </span>
            <span v-if="isCursorOnSpaceAfter(idx.date)" class="cursor"></span>
          </div>
          <div class="ecg-col">
            <span class="label">Physician:</span>
            <span class="value">
              <template v-for="(ch,i) in valueChars(idx.physician)" :key="'phy'+i">
                <span :class="getValueCharClass(idx.physician, i, ch)">{{ ch }}</span>
                <span v-if="isCursorHere(idx.physician, i)" class="cursor"></span>
              </template>
            </span>
            <span v-if="isCursorOnSpaceAfter(idx.physician)" class="cursor"></span>
          </div>
        </div>

        <div class="ecg-mid-title">DESCRIPTION OF TRACING</div>

        <div class="ecg-row">
          <div class="ecg-col">
            <span class="label">Atrial Rate:</span>
            <span class="value">
              <template v-for="(ch,i) in valueChars(idx.atrialRate)" :key="'ar'+i">
                <span :class="getValueCharClass(idx.atrialRate, i, ch)">{{ ch }}</span>
                <span v-if="isCursorHere(idx.atrialRate, i)" class="cursor"></span>
              </template>
            </span>
            <span v-if="isCursorOnSpaceAfter(idx.atrialRate)" class="cursor"></span>
          </div>
          <div class="ecg-col">
            <span class="label">QRS Duration:</span>
            <span class="value">
              <template v-for="(ch,i) in valueChars(idx.qrsDuration)" :key="'qrsd'+i">
                <span :class="getValueCharClass(idx.qrsDuration, i, ch)">{{ ch }}</span>
                <span v-if="isCursorHere(idx.qrsDuration, i)" class="cursor"></span>
              </template>
            </span>
            <span v-if="isCursorOnSpaceAfter(idx.qrsDuration)" class="cursor"></span>
          </div>
        </div>

        <div class="ecg-row">
          <div class="ecg-col">
            <span class="label">Ventricular Rate:</span>
            <span class="value">
              <template v-for="(ch,i) in valueChars(idx.ventricularRate)" :key="'vr'+i">
                <span :class="getValueCharClass(idx.ventricularRate, i, ch)">{{ ch }}</span>
                <span v-if="isCursorHere(idx.ventricularRate, i)" class="cursor"></span>
              </template>
            </span>
            <span v-if="isCursorOnSpaceAfter(idx.ventricularRate)" class="cursor"></span>
          </div>
          <div class="ecg-col">
            <span class="label">QRS Axis:</span>
            <span class="value">
              <template v-for="(ch,i) in valueChars(idx.qrsAxis)" :key="'qrsa'+i">
                <span :class="getValueCharClass(idx.qrsAxis, i, ch)">{{ ch }}</span>
                <span v-if="isCursorHere(idx.qrsAxis, i)" class="cursor"></span>
              </template>
            </span>
            <span v-if="isCursorOnSpaceAfter(idx.qrsAxis)" class="cursor"></span>
          </div>
        </div>

        <div class="ecg-row">
          <div class="ecg-col">
            <span class="label">PPR Interval:</span>
            <span class="value">
              <template v-for="(ch,i) in valueChars(idx.pprInterval)" :key="'ppr'+i">
                <span :class="getValueCharClass(idx.pprInterval, i, ch)">{{ ch }}</span>
                <span v-if="isCursorHere(idx.pprInterval, i)" class="cursor"></span>
              </template>
            </span>
            <span v-if="isCursorOnSpaceAfter(idx.pprInterval)" class="cursor"></span>
          </div>
          <div class="ecg-col">
            <span class="label">QT Interval:</span>
            <span class="value">
              <template v-for="(ch,i) in valueChars(idx.qtInterval)" :key="'qt'+i">
                <span :class="getValueCharClass(idx.qtInterval, i, ch)">{{ ch }}</span>
                <span v-if="isCursorHere(idx.qtInterval, i)" class="cursor"></span>
              </template>
            </span>
            <span v-if="isCursorOnSpaceAfter(idx.qtInterval)" class="cursor"></span>
          </div>
        </div>

        <div class="ecg-mid-title">DIAGNOSIS DESCRIPTION:</div>
        <div class="dx-line">
          -<span class="value no-underline">
            <template v-for="(ch,i) in valueChars(idx.dx1)" :key="'dx1'+i">
              <span :class="getValueCharClass(idx.dx1, i, ch)">{{ ch }}</span>
              <span v-if="isCursorHere(idx.dx1, i)" class="cursor"></span>
            </template>
          </span>
          <span v-if="isCursorOnSpaceAfter(idx.dx1)" class="cursor"></span>
        </div>
        <div class="dx-line">
          -<span class="value no-underline">
            <template v-for="(ch,i) in valueChars(idx.dx2)" :key="'dx2'+i">
              <span :class="getValueCharClass(idx.dx2, i, ch)">{{ ch }}</span>
              <span v-if="isCursorHere(idx.dx2, i)" class="cursor"></span>
            </template>
          </span>
          <!-- final cursor position not shown after the last segment -->
        </div>
      </div>

      <!-- Redo -->
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
  name: "DiagnosisMode",
  data() {
    return {
      timeLeft: 30,
      totalTime: 30,
      typedText: "",
      typingStarted: false,
      timer: null,
      correct: 0,
      incorrect: 0,

      // randomized report values (gray text)
      report: {
        name: "",
        bp: "",
        dob: "",
        drug: "",
        date: "",
        physician: "",
        atrialRate: "",
        qrsDuration: "",
        ventricularRate: "",
        qrsAxis: "",
        pprInterval: "",
        qtInterval: "",
        dx1: "",
        dx2: ""
      },

      // index mapping for readability in template
      idx: {
        name: 0, bp: 1, dob: 2, drug: 3, date: 4, physician: 5,
        atrialRate: 6, qrsDuration: 7, ventricularRate: 8, qrsAxis: 9,
        pprInterval: 10, qtInterval: 11, dx1: 12, dx2: 13
      }
    };
  },
  computed: {
    progressWidth() {
      return (this.timeLeft / this.totalTime) * 100;
    },
    parts() {
      return [
        this.report.name,
        this.report.bp,
        this.report.dob,
        this.report.drug,
        this.report.date,
        this.report.physician,
        this.report.atrialRate,
        this.report.qrsDuration,
        this.report.ventricularRate,
        this.report.qrsAxis,
        this.report.pprInterval,
        this.report.qtInterval,
        this.report.dx1,
        this.report.dx2
      ];
    },
    // Concatenated target with single spaces between values
    textToType() {
      return this.parts.join(" ");
    },
    // Segment start/end indices (global char positions in textToType)
    segments() {
      const segs = [];
      let cursor = 0;
      this.parts.forEach((t, i) => {
        const start = cursor;
        const end = start + t.length - 1;
        segs.push({ start, end });
        cursor = end + 1; // move to next char position
        if (i < this.parts.length - 1) cursor += 1; // space separator
      });
      return segs;
    }
  },
  created() {
    this.generateRandomReport();
  },
  methods: {
    // ----- Typing mechanics attached to the ECG card -----
    handleKeyPress(e) {
      if (this.timeLeft <= 0) return;

      if (e.key === "Tab") {
        e.preventDefault();
        this.$refs.redoBtn?.focus();
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

        const i = this.typedText.length - 1;
        if (this.textToType[i] === e.key) {
          this.correct++;
        } else {
          this.incorrect++;
        }
      }
    },
    valueChars(segIndex) {
      return this.parts[segIndex]?.split("") ?? [];
    },
    getValueCharClass(segIndex, localIdx, ch) {
      const globalIdx = this.segments[segIndex].start + localIdx;
      if (globalIdx < this.typedText.length) {
        return this.typedText[globalIdx] === ch ? "correct" : "incorrect";
      }
      return "pending";
    },
    isCursorHere(segIndex, localIdx) {
      const globalIdx = this.segments[segIndex].start + localIdx;
      return (
        this.timeLeft > 0 &&
        globalIdx === this.typedText.length &&
        this.typedText.length < this.textToType.length
      );
    },
    isCursorOnSpaceAfter(segIndex) {
      // show a cursor after the value when the *next* expected char is the space between segments
      const spaceIdx = this.segments[segIndex].end + 1;
      return (
        this.timeLeft > 0 &&
        this.typedText.length === spaceIdx &&
        this.typedText.length < this.textToType.length
      );
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
      // keep focus on the card so the user can type again
      this.$nextTick(() => this.$refs.card?.focus());
    },
    finishTest() {
      const elapsed = this.totalTime;
      const wordsTyped = this.typedText.trim().split(/\s+/).filter(Boolean).length;
      const wpm = Math.round((wordsTyped / elapsed) * 60);
      const totalChars = this.typedText.length;
      const accuracy = totalChars > 0 ? Math.round((this.correct / totalChars) * 100) : 0;

      this.$router.push({
        path: "/results",
        query: { wpm, accuracy, time: elapsed, correct: this.correct, incorrect: this.incorrect, backspaces: 0 }
      });
    },

    // ----- Navigation -----
    goToSettings() { this.$router.push("/settings"); },
    goToHome() { this.$router.push("/loggedin"); },
    goToUserPage() { this.$router.push("/user"); },
    goToHighscore() { this.$router.push("/highscore"); },
    goToAbout() { this.$router.push("/aboutns"); },
    goToCustomize() { this.$router.push("/customize"); },

    // ----- Random values (frontend-only) -----
    generateRandomReport() {
      const names = ["Antonelli, Charles R.", "Rivera, Maria L.", "Lopez, Daniel P.", "Santos, Angela V.", "Mendoza, Patrick K."];
      const bps = ["120/80", "138/86", "110/70", "128/82", "142/90"];
      const dobs = ["01/10/1991", "08/22/1988", "05/03/1979", "12/15/1994", "03/30/1985"];
      const drugs = ["Metformin", "Amlodipine", "Atorvastatin", "Warfarin", "Losartan"];
      const dates = ["01/23/2025", "02/14/2025", "11/30/2024", "10/05/2024", "03/01/2025"];
      const physicians = ["Dr. Villanueva, Anita", "Dr. Cruz, Ramon", "Dr. Tan, Celina", "Dr. Reyes, Victor", "Dr. Navarro, Liza"];
      const atrialRates = ["141 /min", "98 /min", "120 /min", "75 /min", "132 /min"];
      const qrsDurations = ["0.08 sec.", "0.10 sec.", "0.09 sec.", "0.07 sec.", "0.12 sec."];
      const ventricularRates = ["136 /min", "92 /min", "118 /min", "74 /min", "128 /min"];
      // Keep "sec" per the photo even though axis is usually in degrees
      const qrsAxes = ["45 sec", "30 sec", "60 sec", "15 sec", "-10 sec"];
      const pprIntervals = ["0.12 sec", "0.16 sec", "0.14 sec", "0.11 sec", "0.20 sec"];
      const qtIntervals = ["0.28 sec", "0.32 sec", "0.30 sec", "0.36 sec", "0.40 sec"];
      const dx1s = [
        "Right atrial enlargement; right ventricular hypertrophy.",
        "Left ventricular hypertrophy; strain pattern.",
        "Sinus tachycardia; possible right atrial enlargement.",
        "First-degree AV block; nonspecific intraventricular delay.",
        "Right bundle branch block; possible RVH."
      ];
      const dx2s = [
        "ST–T wave changes.",
        "No acute ST–T elevations.",
        "T-wave inversions anterolateral leads.",
        "Nonspecific ST–T abnormalities.",
        "Prolonged QT noted."
      ];

      const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

      this.report = {
        name: pick(names),
        bp: pick(bps),
        dob: pick(dobs),
        drug: pick(drugs),
        date: pick(dates),
        physician: pick(physicians),
        atrialRate: pick(atrialRates),
        qrsDuration: pick(qrsDurations),
        ventricularRate: pick(ventricularRates),
        qrsAxis: pick(qrsAxes),
        pprInterval: pick(pprIntervals),
        qtInterval: pick(qtIntervals),
        dx1: pick(dx1s),
        dx2: pick(dx2s)
      };

      // autofocus the card so users can immediately type
      this.$nextTick(() => this.$refs.card?.focus());
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
  padding: 0px 215px;
}

.logo { font-weight: bold; font-size: 30px; color: #004aad; } /* +5px */

.right-section { display: flex; align-items: center; gap: 15px; }
.progress-circle { width: 34px; height: 34px; background-color: #004aad; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.progress-number { color: white; font-weight: bold; font-size: 20px; } /* +5px */
.icon-img { height: 35px; width: auto; cursor: pointer; } /* +5px */

/* Main layout */
.main-section { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 36px; margin-top: 60px; }

/* Timer Section */
.timer-section { display: flex; align-items: center; gap: 15px; width: 70%; }
.customize-btn { color: white; background: #004aad; padding: 8px 14px; font-size: 17px; border-radius: 8px; } /* +5px total feel */
.time-text { font-weight: 600; font-size: 20px; } /* +5px */
.progress-bar { flex: 1; height: 10px; background: #ddd; border-radius: 5px; overflow: hidden; }
.progress { height: 100%; background: #004aad; transition: width 0.3s linear; }

/* ECG Report Card (centered text, bigger fonts) */
.ecg-card {
  width: 72%;
  background: #fff;
  border: 1px solid #dfe5ef;
  border-radius: 12px;
  padding: 34px 38px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  outline: none;
  text-align: center; /* center everything */
}

.ecg-header { margin-bottom: 12px; }
.ecg-title { font-weight: 700; letter-spacing: 0.03em; font-size: 25px; } /* +5px */
.ecg-subtitle { font-weight: 700; font-size: 23px; } /* +5px */
.ecg-address { color: #6b7280; font-size: 19px; margin-top: 2px; } /* +5px */

.ecg-section-title { font-weight: 700; margin: 18px 0 12px; font-size: 21px; } /* +5px */
.ecg-mid-title { font-weight: 700; margin: 20px 0 10px; font-size: 21px; } /* +5px */

.ecg-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px 24px;
  align-items: baseline;
  margin: 10px 0;
  justify-items: center; /* center columns */
}

.label {
  color: #111827; /* black fixed text */
  margin-right: 6px;
  font-size: 21px; /* +5px */
}

.value {
  color: #9aa3af;           /* gray typing text */
  text-decoration: underline;
  text-underline-offset: 4px;
  font-size: 21px;          /* +5px */
}

.value.no-underline { text-decoration: none; }

.dx-line {
  color: #6b7280;
  margin: 4px 0;
  font-size: 21px; /* +5px */
}

/* Typing color feedback directly on the values */
.pending { color: #9aa3af; }    /* gray until typed */
.correct { color: #000; }       /* black when correct */
.incorrect { color: #d93025; }  /* red when incorrect */

/* Cursor shown inline within the report */
.cursor {
  display: inline-block;
  width: 2px;
  height: 1.2em;
  background-color: #111827;
  margin-left: 1px;
  animation: blink 1s infinite;
  vertical-align: bottom;
}
@keyframes blink { 0%{opacity:1;} 50%{opacity:0;} 100%{opacity:1;} }

/* Redo */
.redo-section { margin-top: 8px; }
.redo-img { height: 39px; cursor: pointer; outline: none; } /* +5px */
.redo-img:focus { outline: 3px solid #004aad; border-radius: 6px; }
</style>
