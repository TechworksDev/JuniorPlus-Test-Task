<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { ref } from 'vue'
import { useNoteStore } from '@/stores/noteStore'
import IconLogout2 from '@/assets/icons/IconLogout2.vue'
import IconTrash from '@/assets/icons/IconTrash.vue'
import IconSave from '@/assets/icons/IconSave.vue'
import router from '@/router'

const showModal = ref(false)
const userStore = useUserStore()
const noteStore = useNoteStore()
const avatarUrl = ref('')

function deleteAccount() {
  userStore.deleteAccount()
  showModal.value = false
  userStore.logout()
  router.replace('LoginPage')
}

function updateAvatar() {
  userStore.user!.avatar = avatarUrl.value
  userStore.updateAccount(avatarUrl.value)
}

function logout() {
  userStore.logout()
  router.replace('LoginPage')
}

const date = new Date(userStore.user!.created_at!)
const formattedDate = `${date.getDay() > 10 ? '0' + date.getDate() : date.getDate()}.${date.getMonth() + 1 > 10 ? '0' + date.getMonth() + 1 : date.getMonth() + 1}.${date.getFullYear()}`;
</script>

<template>
  <div class="container">
    <div class="block">
      <span class="title"><b>Ваш профиль</b></span>
      <div class="content">
        <img :src="userStore.user?.avatar" width="120px" />
        <div class="info" style="min-width: 400px;">
          <span>Email: {{ userStore.user?.email }}</span>
          <span>Регистрация: {{ formattedDate }}</span>
          <span>Заметок: {{ noteStore.notes.length }}</span>
          <div class="buttons">
            <button @click="logout">
              <IconLogout2 :width="'16px'" :height="'16px'" :color="'#fff'" />Выйти
            </button>
            <button style="background-color: #ff8080cc;" @click="showModal = true" class="removeAccount">
              <IconTrash :width="'16px'" :height="'16px'" :color="'#fff'" />Удалить аккаунт
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="block">
      <span class="title"><b>Изменить аватар</b></span>
      <div class="content">
        <div class="info" style="min-width: 300px;">
          <input v-model="avatarUrl" type="url" placeholder="Введите ссылку на изображение" />
          <div class="buttons">
            <button @click="updateAvatar">
              <IconSave :width="'16px'" :height="'16px'" :color="'#fff'" />Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Modal v-if="showModal" @close="showModal = false" class="modal">
    <div class="modalbg" @click="showModal = false;">
      <div class="modal-window" @click="e => e.stopPropagation()">
        <span class="modal-title"><b>Уверены что хотите удалить аккаунт?</b></span>
        <div class="buttons">
          <button @click="showModal = false">Отменить</button>
          <button @click="deleteAccount" class="create">
            <IconAdd :width="'16px'" :height="'16px'" :color="'#fff'" />Удалить
          </button>
        </div>
      </div>
    </div>
  </Modal>
</template>


<style lang="scss">
.noteName {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;

  input {
    flex: 1;
  }
}

.modal-window {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #202020;
  padding: 16px;
  min-width: 500px;
  border-radius: 14px;

  input,
  textarea {
    padding: 10px;
    border-radius: 8px;
    border: none;
    outline: none;
    background-color: #282828;
    color: #fff;

    &:focus {
      background-color: #343434;
      color: #ffffff;
    }
  }

  textarea {
    height: 200px;
  }

  .buttons {
    display: flex;
    flex-direction: row;

    button {
      display: flex;
      align-items: center;
      gap: 6px;
      justify-content: center;
      flex: 1;
      background: #404040;
      padding: 6px;
      border-radius: 10px;
      color: #ffffff;
      font-family: monospace;
      font-size: 14px;
      border: none;
      cursor: pointer;

      &:hover {
        background: #404040B0;
      }

      &.create {
        background: #ff909050;

        &:hover {
          background: #ff9090a0;
        }
      }
    }
  }
}

.modal {
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modalbg {
  background-color: #00000080;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 12px;
  position: relative;
  width: 100%;
  height: 100%;
}

.content {
  padding: 10px 6px 10px 6px;
  display: flex;
  flex-direction: row;
  gap: 16px;

  img {
    border-radius: 30px;
  }
}

.buttons {
  display: flex;
  flex-direction: row;
  gap: 10px;

  button {
    display: flex;
    align-items: center;
    gap: 5px;
    ;
    justify-content: center;
    flex: 1;
    background: #404040;
    padding: 6px;
    border-radius: 10px;
    color: #ffffff;
    font-family: monospace;
    font-size: 14px;
    border: none;
    cursor: pointer;
    &:hover{
      background: #323232;
    }
  }
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  input {
    padding: 10px;
    border-radius: 8px;
    border: none;
    outline: none;
    background-color: #343434;
    color: #fff;

    &:focus {
      background-color: #404040;
      color: #ffffff;
    }
  }
}

.container {
  display: flex;
  position: fixed;
  left: 70px;
  flex-direction: column;
  top: 0px;
  right: 0px;
  padding: 10px;
  gap: 10px;
}

.block {
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  padding: 10px;
  height: min-content;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(3px);
  background-color: #30303050;
}
</style>
