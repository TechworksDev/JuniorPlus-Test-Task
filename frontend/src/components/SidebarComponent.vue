<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { useNoteStore } from '@/stores/noteStore'
import { ref } from 'vue'
import IconNotes from '@/assets/icons/IconNotes.vue'
import IconExclamation from '@/assets/icons/IconExclamation.vue'
import IconLogout from '@/assets/icons/IconLogout2.vue'
import IconAdd from '@/assets/icons/IconAdd.vue'
import IconClose from '@/assets/icons/IconClose.vue'
import IconCat from '@/assets/icons/IconCat.vue'
import IconSwagger from '@/assets/icons/IconSwagger.vue'

const route = useRoute()
const router = useRouter()
const userData = useUserStore().user
const userStore = useUserStore()
const noteStore = useNoteStore()
const errorMessage = ref('')
const showModal = ref(false)
const noteData = ref({
  title: '',
  text: ''
})

function Logout() {
  userStore.logout()
  router.replace("/")
}

function openModal() {
  showModal.value = true
  router.push('/home')
}

function createNoteHandler() {
  if (noteData.value.title.length > 255) {
    errorMessage.value = 'Название заметки должно быть менее 255 символов'
    return
  } else if (noteData.value.title.length === 0 || noteData.value.text.length === 0) {
    errorMessage.value = 'Заполните все поля'
    return
  }
  showModal.value = false
  noteStore.createNote(noteData.value.title, noteData.value.text)
  noteData.value.title = ''
  noteData.value.text = ''
  errorMessage.value = ''
}
</script>

<template>
  <div class="sidebar">
    <div style="margin-bottom: 20px">
      <IconCat :width="'28px'" :height="'28px'" :color="'#90ff90'" />
    </div>
    <div class="separator" style="width: 60%;"></div>
    <div class="menu">
      <div class="upper-menu">
        <button class="add-note" @click="openModal">
          <IconAdd :width="'28px'" :height="'28px'" :color="showModal ? '#90ff90' : '#fff'" />
        </button>
      <div class="separator" style="width: 100%;"></div>
        <RouterLink to="/home">
          <IconNotes :width="'28px'" :height="'28px'"
            :color="route.name == 'HomePage' && !showModal ? '#90ff90' : '#fff'" />
        </RouterLink>
        <a href="http://localhost:3000/swagger" target="_blank">
          <IconSwagger :width="'28px'" :height="'28px'"/>
        </a>
      </div>
      <div class="bottom-menu">
        <RouterLink to="/profile"><img :src="userData?.avatar" :style="route.name == 'ProfilePage' ? 'box-shadow: 0 0 10px 0px #90ff90' : ''" width="36px" height="36px" style="object-fit: contain;"/></RouterLink>
        <button @click="Logout">
          <IconLogout :width="'28px'" :height="'28px'" :color="'#ff9090'" />
        </button>
      </div>
    </div>
  </div>

  <div v-if="showModal" @close="showModal = false" class="modal">
    <div class="modalbg" @dblclick="showModal = false; errorMessage = ''">
      <div class="modal-window" @click="e => e.stopPropagation()">
        <span class="modal-title"><b>Создайте заметку</b></span>
        <span v-if="errorMessage" class="error-message">
          <IconExclamation :width="'18px'" :height="'18px'" :color="'#ff6060'" /><span>{{ errorMessage }}</span>
        </span>
        <div class="noteName">
          <IconNotes :width="'22px'" :height="'22px'" :color="'#fff'" />
          <input placeholder="Название заметки не более 255 символов" v-model="noteData.title" />
        </div>
        <textarea placeholder="Введите текст заметки" style="resize: none;" v-model="noteData.text"></textarea>
        <div class="buttons">
          <button @click="showModal = false">
            <IconClose :width="'16px'" :height="'16px'" :color="'#fff'" />Отменить
          </button>
          <button @click="createNoteHandler" class="create">
            <IconAdd :width="'16px'" :height="'16px'" :color="'#fff'" />Создать
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.separator{
  width: 70%;
  height: 4px;
  margin: 0px 10px;
  background-color: #ffffff40;
}

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
  gap: 6px;
  background: #202020bb;
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
    gap: 10px;

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
        background: #404040b0;
      }

      &.create {
        background: #90ff9050;

        &:hover {
          background: #90ff90a0;
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
  backdrop-filter: blur(2px);
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

.add-note {
  padding: 8px 8px 6px 8px;
  border-radius: 8px;
  border: none;
  outline: none;
  cursor: pointer;
}

.sidebar {
  display: flex;
  flex-direction: column;
  position: fixed;
  align-items: center;
  padding: 20px 0px 20px 0px;
  width: 70px;
  top: 0px;
  bottom: 0px;
  background-color: #30303070;
  backdrop-filter: blur(2px);
}

button {
  background: none;
  border: none;
  cursor: pointer;
}

.menu {
  margin-top: 20px;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  .upper-menu {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .bottom-menu {
    align-items: center;
    display: flex;
    gap: 20px;
    flex-direction: column;

    img {
      border-radius: 12px;
    }
  }
}
</style>
