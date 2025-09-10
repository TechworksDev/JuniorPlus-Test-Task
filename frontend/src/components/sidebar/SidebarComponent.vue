<script setup lang="ts">
import IconNotes  from '@icons/IconNotes.vue'
import IconHome  from '@icons/IconHome.vue'
import IconLogout  from '@/components/icons/IconLogout2.vue'
import { useRoute, useRouter } from 'vue-router';
import IconProfile from '../icons/IconProfile.vue';
const route = useRoute();
const router = useRouter();

function Logout(){
  localStorage.clear();
  router.replace("/");
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
        <RouterLink to="/home"><IconHome :width="'28px'" :height="'28px'" :color="route.name == 'HomePage' ? '#90ff90' : '#fff'"/></RouterLink>
        <RouterLink to="/home2"><IconHome :width="'28px'" :height="'28px'" :color="route.name == '' ? '#90ff90' : '#fff'"/></RouterLink>
      </div>
      <div class="bottom-menu">
        <RouterLink to="/profile"><IconProfile :width="'28px'" :height="'28px'" :color="route.name == 'ProfilePage' ? '#90ff90' : '#fff'"/></RouterLink>
        <button @click="Logout"><IconLogout :width="'28px'" :height="'28px'" :color="route.name == '' ? '#90ff90' : '#fff'"/></button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
