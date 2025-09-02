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
        <!-- Update Account Name -->
        <section class="setting-block">
          <h3>Update Account Name</h3>
          <p>Update your account name. You can only do this once every 7 days.</p>
          <button @click="toggleSection('name')" class="action-btn">Update Name</button>
          <div v-if="activeSection === 'name'" class="reauth-block">
            <input
              type="text"
              v-model="newName"
              placeholder="Enter new name"
              class="input-box"
            />
            <button class="reauth-btn" @click="openReauthModal('name')">Reauthenticate to Update</button>
          </div>
        </section>

        <!-- Update Password or Email -->
        <section class="setting-block">
          <h3>Update your Password or Email</h3>
          <p>Keep your account secure by updating your password or email address.</p>
          <button @click="toggleSection('credentials')" class="action-btn">Update Password or Email</button>
          <div v-if="activeSection === 'credentials'" class="reauth-block">
            <input
              type="email"
              v-model="newEmail"
              placeholder="Enter new email"
              class="input-box"
            />
            <input
              type="password"
              v-model="newPassword"
              placeholder="Enter new password"
              class="input-box"
            />
            <input
              type="password"
              v-model="confirmPassword"
              placeholder="Confirm new password"
              class="input-box"
            />
            <button class="reauth-btn" @click="openReauthModal('credentials')">Reauthenticate to Update</button>
          </div>
        </section>

        <!-- Reset Account -->
        <section class="setting-block">
          <h3>Reset Account</h3>
          <p>Reset your account to a blank state. This action cannot be undone!</p>
          <button @click="toggleSection('reset')" class="danger-btn">Reset Account</button>
          <div v-if="activeSection === 'reset'" class="reauth-block">
            <button class="reauth-btn danger-btn" @click="openReauthModal('reset')">Reauthenticate to Reset</button>
          </div>
        </section>

        <!-- Delete Account -->
        <section class="setting-block">
          <h3>Delete Account</h3>
          <p>Permanently delete your account along with all associated data. This action cannot be undone!</p>
          <button @click="toggleSection('delete')" class="danger-btn">Delete Account</button>
          <div v-if="activeSection === 'delete'" class="reauth-block">
            <button class="reauth-btn danger-btn" @click="openReauthModal('delete')">Reauthenticate to Delete</button>
          </div>
        </section>

        <!-- Logout Button -->
        <section class="logout-section">
          <button class="logout-btn" @click="logoutUser">Logout</button>
        </section>
      </main>
    </div>

    <!-- Reauthentication Modal -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Reauthenticate</h3>
        <p>Please log in again to save your changes.</p>
        <input
          type="email"
          v-model="reauthEmail"
          placeholder="Enter your email"
          class="input-box"
        />
        <input
          type="password"
          v-model="reauthPassword"
          placeholder="Enter your password"
          class="input-box"
        />
        <div class="modal-actions">
          <button class="action-btn" @click="confirmReauth">Confirm</button>
          <button class="danger-btn" @click="closeReauthModal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SettingsPage",
  data() {
    return {
      username: "GwenStacy",
      activeSection: null,
      newName: "",
      newEmail: "",
      newPassword: "",
      confirmPassword: "",
      showModal: false,
      reauthEmail: "",
      reauthPassword: "",
      updateType: null // Track which update is being performed
    };
  },
  methods: {
    toggleSection(section) {
      this.activeSection = this.activeSection === section ? null : section;
    },
    openReauthModal(type) {
      this.updateType = type;
      this.showModal = true;
    },
    closeReauthModal() {
      this.showModal = false;
      this.reauthEmail = "";
      this.reauthPassword = "";
    },
    confirmReauth() {
      if (!this.reauthEmail || !this.reauthPassword) {
        alert("Please fill in your credentials.");
        return;
      }

      if (this.updateType === "name") {
        if (this.newName) {
          this.username = this.newName;
          alert(`Name updated to: ${this.newName}`);
        } else {
          alert("Please enter a new name.");
        }
      }

      if (this.updateType === "credentials") {
        if (this.newEmail || this.newPassword) {
          if (this.newPassword && this.newPassword !== this.confirmPassword) {
            alert("Passwords do not match.");
            return;
          }
          alert(`Credentials updated! New Email: ${this.newEmail || "unchanged"}`);
        } else {
          alert("Please provide at least a new email or password.");
        }
      }

      if (this.updateType === "reset") {
        alert("Your account has been reset!");
      }

      if (this.updateType === "delete") {
        alert("Your account has been deleted!");
      }

      this.closeReauthModal();
    },
    logoutUser() {
      this.$router.push("/"); // Redirect to login or home page
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
/* General container */
.app-container {
  font-family: "Inter", sans-serif;
  background: #f9fbfd;
  color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Top Bar */
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
  cursor: pointer;
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

/* Settings container */
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

/* Setting blocks */
.setting-block {
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.setting-block h3 {
  font-size: 18px;
  margin-bottom: 8px;
  color: #333;
}

.setting-block p {
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
}

/* Buttons */
.action-btn {
  background: #24488b;
  color: #fff;
  border: none;
  padding: 10px 18px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.danger-btn {
  background: #cc0000;
  color: #fff;
  border: none;
  padding: 10px 18px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.logout-btn {
  background: #ADB1C4;
  color: #fff;
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  margin-top: 30px;
}

.logout-btn:hover {
  background: #003680;
}

.action-btn:hover {
  background: #003680;
}

.danger-btn:hover {
  background: #a30000;
}

/* Reauthenticate block */
.reauth-block {
  margin-top: 10px;
}

.reauth-btn {
  background: #444;
  color: #fff;
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  font-size: 14px;
  cursor: pointer;
}

.reauth-btn:hover {
  background: #222;
}

/* Input box */
.input-box {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  width: 400px;
  text-align: center;
}

.modal-content h3 {
  margin-bottom: 10px;
}

.modal-actions {
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
}

/* Logout section */
.logout-section {
  margin-top: 40px;
  text-align: center;
}
</style>
