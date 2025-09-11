<script setup lang="ts">
import IconNotes  from '@icons/IconNotes.vue'
import IconHome  from '@icons/IconHome.vue'
import IconLogout  from '@/components/icons/IconLogout2.vue'
import { useRoute, useRouter } from 'vue-router';
import IconProfile from '../icons/IconProfile.vue';
import IconAdd from '../icons/IconAdd.vue';
import { ref } from 'vue';

const route = useRoute();
const router = useRouter();
const showModal = ref(false)
const noteData = ref({
  title: '',
  text: ''
})

function Logout(){
  localStorage.clear();
  router.replace("/");
}

function openModal(){
  showModal.value = true        // показать модалку
  router.push('/home')          // перейти на страницу
}
</script>

<template>
  <div class="sidebar">
    <div style="margin-bottom: 20px">
      <IconNotes :width="'28px'" :height="'28px'" :color="'#fff'"/>
    </div>
    <hr/>
    <div class="menu">
      <div class="upper-menu">
        <button class="add-note" @click="openModal"><IconAdd :width="'28px'" :height="'28px'" :color="'#ffffff'"/></button>
        <RouterLink to="/home"><IconHome :width="'28px'" :height="'28px'" :color="route.name == 'HomePage' ? '#50ff50' : '#fff'"/></RouterLink>
      </div>
      <div class="bottom-menu">
        <RouterLink to="/profile"><IconProfile :width="'28px'" :height="'28px'" :color="route.name == 'ProfilePage' ? '#50ff50' : '#fff'"/></RouterLink>
        <button @click="Logout"><IconLogout :width="'28px'" :height="'28px'" :color="'#ff9090'"/></button>
      </div>
    </div>
  </div>
  <Modal v-if="showModal" @close="showModal = false" class="modal">
    <div class="modalbg" @click="showModal = false">
      <div class="modal-window" @click="e => e.stopPropagation()">
        <span class="modal-title"><b>Создайте заметку</b></span>
        <div class="noteName">
          <IconNotes :width="'22px'" :height="'22px'" :color="'#fff'"/>
          <input placeholder="Введите название заметки" v-model="noteData.title"/>
        </div>
        <textarea placeholder="Введите текст заметки" style="resize: none;" v-model="noteData.text"></textarea>
        <div class="buttons">
          <button @click="showModal = false">Отменить</button>
          <button @click="showModal = false" class="create"><IconAdd :width="'16px'" :height="'16px'" :color="'#fff'"/>Создать</button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<style scoped lang="scss">
  .noteName{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 6px;
    input{
      flex: 1;
    }
  }
  .modal-window{
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: #202020;
    padding: 16px;
    min-width: 500px;
    border-radius: 14px;
    input, textarea{
      padding: 10px;
      border-radius: 8px;
      border: none;
      outline: none;
      background-color: #282828;
      color: #fff;
      &:focus{
        background-color: #343434;
        color: #ffffff;
      }
    }
    textarea{
      height: 200px;
    }
    .buttons{
      display: flex;
      flex-direction: row;
      button{
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
        &:hover{
          background: #404040b0;
        }
        &.create{
          background: #90ff9050;
          &:hover{
            background: #90ff90a0;
          }
        }
      }
    }
  }
  .modal{
    position: fixed;
    z-index: 100;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modalbg{
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
  .add-note{
    padding: 8px 8px 6px 8px;
    border-radius: 8px;
    border: none;
    outline: none;
    background-color: #90ff9050;
    color: #90ff90;
    cursor: pointer;
  }
  .sidebar{
    display: flex;
    flex-direction: column;
    position: fixed;
    align-items: center;
    padding: 20px 0px 20px 0px;
    width: 70px;
    top: 0px;
    bottom: 0px;
    background-color: #303030;
  }
  button{
    background: none;
    border: none;
    cursor: pointer;
  }
  .menu{
    margin-top: 20px;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    .upper-menu{
      align-items: center;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .bottom-menu{
      align-items: center;
      display: flex;
      gap: 20px;
      flex-direction: column;
    }
  }
</style>
