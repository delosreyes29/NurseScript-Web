<template> 
  <div class="app-container"> 
    <!-- Top Bar (DO NOT CHANGE) --> 
    <header class="top-bar"> 
      <div class="left-section"> 
        <span class="logo" @click="goToLoggedIn">NurseScripts</span> 
      </div> 
      <div class="right-section"> 
        <span class="username" @click="goToUserPage">{{ username }}</span> 
        <div class="progress-circle"> 
          <span class="progress-number">5</span> 
        </div> 
        <img src="@/assets/settings.png" alt="Settings" class="icon-img" @click="goToSettings" /> 
        <img src="@/assets/highscore.png" alt="Highscore" class="icon-img" @click="goToHighscore" /> 
        <img src="@/assets/about.png" alt="About" class="icon-img" @click="goToAbout" /> 
      </div> 
    </header> 

    <!-- Customize Content --> 
    <div class="customize-shell"> 
      <!-- Close Button --> 
      <button class="close-btn" @click="goBack">×</button> 

      <!-- Keys to include --> 
      <section class="group"> 
        <div class="group-title">keys to include</div> 
        <div class="group-row"> 
          <button 
            class="pill" 
            :class="{ active: keys.numbers }" 
            :disabled="disableKeys" 
            @click="toggleKey('numbers')" 
          >Numbers</button> 
          <button 
            class="pill" 
            :class="{ active: keys.punctuation }" 
            :disabled="disableKeys" 
            @click="toggleKey('punctuation')" 
          >Punctuation</button> 
        </div> 
      </section> 

      <!-- Mode --> 
      <section class="group"> 
        <div class="group-title">Mode</div> 
        <div class="group-row wrap"> 
          <button class="pill" :class="{ active: mode === 'words' }" @click="selectMode('words')">Words</button> 
          <button class="pill" :class="{ active: mode === 'time' }" @click="selectMode('time')">Time</button> 

          <!-- Clinical scenarios --> 
          <div class="dropdown-wrapper"> 
            <button 
              class="pill with-caret" 
              :class="{ active: mode === 'clinical' }" 
              @click="toggleDropdown('clinical')" 
            > 
              {{ selectedClinical ? selectedClinical : 'Clinical scenarios' }} 
              <span class="caret">▾</span> 
            </button> 
            <div v-if="showClinical" class="dropdown" @mouseleave="showClinical = false"> 
              <div 
                v-for="opt in clinicalOptions" 
                :key="opt" 
                class="dropdown-item" 
                :class="{ selected: selectedClinical === opt }" 
                @click="selectClinical(opt)" 
              >{{ opt }}</div> 
            </div> 
          </div> 

          <!-- Body system --> 
          <div class="dropdown-wrapper"> 
            <button class="pill with-caret" :class="{ active: mode === 'body' }" @click="toggleDropdown('body')"> 
              {{ selectedBody ? selectedBody : 'Body-system' }} 
              <span class="caret">▾</span> 
            </button> 
            <div v-if="showBody" class="dropdown" @mouseleave="showBody = false"> 
              <div 
                v-for="opt in bodySystemOptions" 
                :key="opt" 
                class="dropdown-item" 
                :class="{ selected: selectedBody === opt }" 
                @click="selectBody(opt)" 
              >{{ opt }}</div> 
            </div> 
          </div> 

          <!-- Documentation --> 
          <div class="dropdown-wrapper"> 
            <button class="pill with-caret" :class="{ active: mode === 'documentation' }" @click="toggleDropdown('documentation')"> 
              {{ selectedDocumentation ? selectedDocumentation : 'Documentation' }} 
              <span class="caret">▾</span> 
            </button> 
            <div v-if="showDocumentation" class="dropdown" @mouseleave="showDocumentation = false"> 
              <div 
                v-for="opt in documentationOptions" 
                :key="opt" 
                class="dropdown-item" 
                :class="{ selected: selectedDocumentation === opt }" 
                @click="selectDocumentation(opt)" 
              >{{ opt }}</div> 
            </div> 
          </div> 
        </div> 
      </section> 

      <!-- number of words --> 
      <section class="group"> 
        <div class="group-title">number of words</div> 
        <div class="group-row wrap"> 
          <button class="pill" :class="{ active: wordsSelection === 15 }" :disabled="disableWordsGroup" @click="selectWords(15)">15</button> 
          <button class="pill" :class="{ active: wordsSelection === 30 }" :disabled="disableWordsGroup" @click="selectWords(30)">30</button> 
          <button class="pill" :class="{ active: wordsSelection === 60 }" :disabled="disableWordsGroup" @click="selectWords(60)">60</button> 

          <!-- Custom words input --> 
          <div class="custom-time-wrapper"> 
            <button class="pill" :class="{ active: wordsSelection === 'custom' }" :disabled="disableWordsGroup" @click="toggleWordsCustom">custom</button> 
            <input 
              v-if="showWordsCustom" 
              type="number" 
              class="custom-input" 
              v-model.number="wordsCustom" 
              placeholder=" " 
              min="61" 
              :disabled="disableWordsGroup" 
            /> 
          </div> 
        </div> 
      </section> 

      <!-- time duration --> 
      <section class="group"> 
        <div class="group-title">time duration</div> 
        <div class="group-row wrap"> 
          <button class="pill" :class="{ active: timeSelection === 15 }" :disabled="disableTimeGroup" @click="selectTime(15)">15</button> 
          <button class="pill" :class="{ active: timeSelection === 30 }" :disabled="disableTimeGroup" @click="selectTime(30)">30</button> 
          <button class="pill" :class="{ active: timeSelection === 60 }" :disabled="disableTimeGroup" @click="selectTime(60)">60</button> 

          <!-- Custom time input --> 
          <div class="custom-time-wrapper"> 
            <button class="pill" :class="{ active: timeSelection === 'custom' }" :disabled="disableTimeGroup" @click="toggleTimeCustom">custom</button> 
            <input 
              v-if="showTimeCustom" 
              type="number" 
              class="custom-input" 
              v-model.number="timeCustom" 
              placeholder=" " 
              min="2" 
              :disabled="disableTimeGroup" 
            /> 
          </div> 
        </div> 
      </section> 

      <!-- Error Message --> 
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p> 

      <!-- Footer actions --> 
      <div class="footer-actions"> 
        <button class="secondary-btn" @click="resetAll">Reset</button> 
        <button class="primary-btn" :disabled="!isFormValid" @click="done">Done</button> 
      </div> 
    </div> 
  </div> 
</template> 

<script> 
export default { 
  name: "CustomizePage", 
  data() { 
    return { 
      username: "GwenStacy", 

      keys: { numbers: false, punctuation: false }, 

      mode: null, 
      clinicalOptions: ["Diagnosis", "Doctor’s Prescription", "Patient Interview"], 
      bodySystemOptions: ["Nervous System", "Circulatory System", "Respiratory System"], 
      documentationOptions: ["Nursing Notes", "Discharge Instructions"], 

      selectedClinical: null, 
      selectedBody: null, 
      selectedDocumentation: null, 
      showClinical: false, 
      showBody: false, 
      showDocumentation: false, 

      // words group state
      wordsSelection: null, // 15 | 30 | 60 | 'custom'
      wordsCustom: "", 
      showWordsCustom: false, 

      // time group state
      timeSelection: null, // 15 | 30 | 60 | 'custom'
      timeCustom: "", 
      showTimeCustom: false, 

      errorMessage: "", 
    }; 
  }, 
  computed: { 
    // Keys disabled in non-basic modes (unchanged)
    disableKeys() { 
      return this.mode === "clinical" || this.mode === "body" || this.mode === "documentation"; 
    }, 
    // Words group only active in Words mode
    disableWordsGroup() { 
      return this.mode !== "words"; 
    }, 
    // >>> Time pills are disabled in Words mode AND in Clinical scenarios
    disableTimeGroup() { 
      return this.mode === "words" || this.mode === "clinical"; 
    }, 

    // Validation
    isFormValid() { 
      const keysSelected = this.keys.numbers || this.keys.punctuation || this.disableKeys; 

      const modeSelected = 
        this.mode && (
          this.mode === "words" ||
          this.mode === "time" ||
          (this.mode === "clinical" && this.selectedClinical) ||
          (this.mode === "body" && this.selectedBody) ||
          (this.mode === "documentation" && this.selectedDocumentation)
        ); 

      let targetValid = false;

      if (this.mode === "words") {
        targetValid = 
          this.wordsSelection === 15 ||
          this.wordsSelection === 30 ||
          this.wordsSelection === 60 ||
          (this.wordsSelection === "custom" && Number(this.wordsCustom) >= 61);
      } else if (this.mode === "time") {
        targetValid =
          this.timeSelection === 15 ||
          this.timeSelection === 30 ||
          this.timeSelection === 60 ||
          (this.timeSelection === "custom" && Number(this.timeCustom) >= 2);
      } else if (this.mode === "clinical") {
        // >>> New: selecting a clinical scenario alone is enough
        targetValid = !!this.selectedClinical;
      } else if (this.mode === "body" || this.mode === "documentation") {
        // unchanged: require a time target for these modes
        targetValid =
          this.timeSelection === 15 ||
          this.timeSelection === 30 ||
          this.timeSelection === 60 ||
          (this.timeSelection === "custom" && Number(this.timeCustom) >= 2);
      }

      return keysSelected && modeSelected && targetValid && !this.errorMessage; 
    }, 
  }, 
  watch: {
    wordsCustom() { this.validateWords(true); },
    timeCustom() { this.validateTime(true); },
    mode() { 
      this.errorMessage = ""; 
      this.validateWords(true); 
      this.validateTime(true); 
    },
    wordsSelection() { this.validateWords(true); },
    timeSelection() { this.validateTime(true); },
  },
  methods: { 
    // Back behavior for X button
    goBack() {
      if (window.history.length > 1) this.$router.back();
      else this.$router.push("/loggedin");
    },

    goToSettings() { this.$router.push("/settings"); }, 
    goToHighscore() { this.$router.push("/highscore"); }, 
    goToAbout() { this.$router.push("/aboutns"); }, 
    goToLoggedIn() { this.$router.push("/loggedin"); }, 
    goToUserPage() { this.$router.push("/user"); }, 

    toggleKey(k) { this.keys[k] = !this.keys[k]; }, 

    selectMode(m) { 
      this.mode = m; 
      this.showClinical = false; 
      this.showBody = false; 
      this.showDocumentation = false; 
      this.errorMessage = "";
      this.validateWords(true);
      this.validateTime(true);
    }, 

    toggleDropdown(which) { 
      this.showClinical = which === "clinical" ? !this.showClinical : false; 
      this.showBody = which === "body" ? !this.showBody : false; 
      this.showDocumentation = which === "documentation" ? !this.showDocumentation : false; 

      // Set mode to which dropdown is opened
      this.mode = which; 

      // If entering Clinical, clear/ignore any time settings
      if (which === "clinical") {
        this.timeSelection = null;
        this.timeCustom = "";
        this.showTimeCustom = false;
      }

      this.errorMessage = "";
      this.validateWords(true);
      this.validateTime(true);
    }, 

    selectClinical(opt) { 
      this.selectedClinical = opt; 
      this.mode = "clinical"; 
      this.showClinical = false; 
      // Clear any time selections (not needed in Clinical)
      this.timeSelection = null;
      this.timeCustom = "";
      this.showTimeCustom = false;
      this.errorMessage = "";
      // No time validation for clinical
    }, 

    selectBody(opt) { 
      this.selectedBody = opt; 
      this.mode = "body"; 
      this.showBody = false; 
      this.errorMessage = "";
      this.validateTime(true);
    }, 

    selectDocumentation(opt) { 
      this.selectedDocumentation = opt; 
      this.mode = "documentation"; 
      this.showDocumentation = false; 
      this.errorMessage = "";
      this.validateTime(true);
    }, 

    // --- Number of words handlers ---
    selectWords(val) { 
      if (this.disableWordsGroup) return; 
      this.wordsSelection = val; 
      this.showWordsCustom = false; 
      this.wordsCustom = ""; 
      if (this.mode === "words") this.errorMessage = ""; 
    }, 
    toggleWordsCustom() { 
      if (this.disableWordsGroup) return; 
      this.wordsSelection = "custom"; 
      this.showWordsCustom = !this.showWordsCustom; 
      if (!this.showWordsCustom) this.wordsCustom = ""; 
      this.validateWords(true);
    }, 
    validateWords(clearWhenEmpty = false) {
      if (this.mode !== "words") return; 
      if (this.wordsSelection !== "custom" || !this.showWordsCustom) {
        this.errorMessage = "";
        return;
      }
      const n = Number(this.wordsCustom);
      if (!this.wordsCustom && clearWhenEmpty) { this.errorMessage = ""; return; }
      this.errorMessage = (!Number.isFinite(n) || n < 61)
        ? "Invalid input. Please input numbers above 60."
        : "";
    },

    // --- Time duration handlers ---
    selectTime(val) { 
      if (this.disableTimeGroup) return; 
      this.timeSelection = val; 
      this.showTimeCustom = false; 
      this.timeCustom = ""; 
      if (this.mode !== "words") this.errorMessage = ""; 
    }, 
    toggleTimeCustom() { 
      if (this.disableTimeGroup) return; 
      this.timeSelection = "custom"; 
      this.showTimeCustom = !this.showTimeCustom; 
      if (!this.showTimeCustom) this.timeCustom = ""; 
      this.validateTime(true);
    }, 
    validateTime(clearWhenEmpty = false) {
      // No time validation in Clinical (it's disabled & ignored)
      const shouldValidate = this.mode === "time" || this.mode === "body" || this.mode === "documentation";
      if (!shouldValidate) return;

      if (this.timeSelection !== "custom" || !this.showTimeCustom) {
        if (this.mode !== "words") this.errorMessage = ""; 
        return;
      }
      const n = Number(this.timeCustom);
      if (!this.timeCustom && clearWhenEmpty) { this.errorMessage = ""; return; }
      this.errorMessage = (!Number.isFinite(n) || n < 2)
        ? "Invalid input. Please input the number 2 and above."
        : "";
    },

    // --- route decision helper ---
    getDestinationRoute() {
      if (this.mode === "words") return "/words";
      if (this.mode === "time") return "/time";

      if (this.mode === "clinical") {
        switch (this.selectedClinical) {
          case "Diagnosis": return "/diagnosis";
          case "Doctor’s Prescription": return "/doctorsprescrip";
          case "Patient Interview": return "/patientinterview";
        }
      }

      if (this.mode === "body") {
        switch (this.selectedBody) {
          case "Nervous System": return "/nervoussys";
          case "Circulatory System": return "/circulatorysys";
          case "Respiratory System": return "/respiratorysys";
        }
      }

      if (this.mode === "documentation") {
        switch (this.selectedDocumentation) {
          case "Nursing Notes": return "/nursingnotes";
          case "Discharge Instructions": return "/dischargeinstruc";
        }
      }

      return "/loggedin";
    },

    resetAll() { 
      this.keys = { numbers: false, punctuation: false }; 
      this.mode = null; 
      this.selectedClinical = null; 
      this.selectedBody = null; 
      this.selectedDocumentation = null; 
      this.showClinical = false; 
      this.showBody = false; 
      this.showDocumentation = false; 

      this.wordsSelection = null; 
      this.wordsCustom = ""; 
      this.showWordsCustom = false; 

      this.timeSelection = null; 
      this.timeCustom = ""; 
      this.showTimeCustom = false; 

      this.errorMessage = ""; 
    }, 

    done() { 
      if (!this.isFormValid) { 
        if (!this.errorMessage) {
          this.errorMessage = "Please select at least one option from each section before continuing."; 
        }
        return; 
      } 
      this.errorMessage = ""; 
      const dest = this.getDestinationRoute();
      this.$router.push(dest); 
    }, 
  }, 
}; 
</script> 

<style scoped> 
.app-container { 
  font-family: "Inter", sans-serif; 
  background: #f9fbfd; 
  min-height: 100vh; 
  color: #1f2a44; 
} 

.top-bar { 
  width: 100%; 
  height: 80px; 
  background: #f9fbfd; 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  padding: 0px 330px; 
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
  margin: 100px auto 60px; 
  padding: 0 24px; 
  position: relative; 
} 

/* Close Button */ 
.close-btn { 
  position: absolute; 
  top: -50px; 
  right: -20px; 
  background: transparent; 
  border: none; 
  font-size: 32px; 
  color: #333; 
  cursor: pointer; 
  line-height: 1; 
} 
.close-btn:hover { color: #004aad; } 

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
.group-row.wrap { flex-wrap: wrap; } 

.pill { 
  appearance: none; 
  border: 1px solid #d8deeb; 
  background: #f3f6fb; 
  color: #203765; 
  padding: 6px 12px; 
  border-radius: 8px; 
  font-size: 14px; 
  cursor: pointer; 
  transition: all 0.15s ease; 
  min-width: 96px; 
  text-align: center; 
} 
.pill:hover { filter: brightness(0.97); } 
.pill.active { background: #004aad; color: #ffffff; border-color: #004aad; } 
.pill:disabled { background: #e9edf5; color: #a0aec0; cursor: not-allowed; } 

.pill.with-caret { display: inline-flex; align-items: center; justify-content: center; gap: 8px; } 
.caret { font-size: 12px; opacity: 0.9; } 

.custom-time-wrapper { display: flex; align-items: center; gap: 10px; } 
.custom-input { width: 90px; padding: 10px; border: 1px solid #d8deeb; border-radius: 6px; font-size: 14px; outline: none; } 
.custom-input:focus { border-color: #2e55a2; } 

.dropdown-wrapper { position: relative; } 
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
.dropdown-item { padding: 10px 12px; border-radius: 8px; cursor: pointer; font-size: 14px; color: #1f2a44; } 
.dropdown-item:hover { background: #f2f6ff; } 
.dropdown-item.selected { background: #e7eefc; color: #004aad; } 

.footer-actions { display: flex; justify-content: flex-end; gap: 16px; margin-top: 28px; } 

.primary-btn, .secondary-btn { 
  border: none; 
  border-radius: 10px; 
  font-weight: 500; 
  cursor: pointer; 
  font-size: 15px; 
  padding: 10px 25px; 
  transition: transform 0.05s ease, filter 0.1s ease; 
} 
.primary-btn { background: #004aad; color: #ffffff; } 
.primary-btn:disabled { background: #b0c3e1; cursor: not-allowed; } 
.primary-btn:active, .secondary-btn:active { transform: translateY(1px); } 
.secondary-btn { background: #eef2f9; color: #274472; } 
.secondary-btn:hover { filter: brightness(0.98); } 
.primary-btn:hover { filter: brightness(0.98); } 

.error-message { color: #d93025; font-size: 14px; margin: 10px 0; text-align: right; } 
</style>
