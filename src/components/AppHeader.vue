<template>
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <RouterLink
        :to="{ name: 'home' }"
        exact-active-class="no-active"
        class="text-white font-bold uppercase text-2xl mr-4"
        >Music</RouterLink
      >

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <RouterLink :to="{ name: 'about' }" class="px-2 text-white">About</RouterLink>
          <!-- Navigation Links -->
          <li v-if="!userStore.userLoggedIn">
            <a @click.prevent="toggleAuthModal" href="#" class="px-2 text-white">
              Login / Register
            </a>
          </li>
          <template v-else>
            <li>
              <RouterLink :to="{ name: 'manage' }" class="px-2 text-white">Manage</RouterLink>
            </li>
            <li>
              <a @click.prevent="signOut" class="px-2 text-white" href="#">Logout</a>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>
<script>
import useModalStore from '@/stores/modal';
import { mapStores } from 'pinia';
import useUserStore from '@/stores/user';

export default {
  name: 'AppHeader',
  computed: {
    ...mapStores(useModalStore, useUserStore),
  },
  methods: {
    toggleAuthModal() {
      this.modalStore.isOpen = !this.modalStore.isOpen;
    },
    signOut() {
      this.userStore.signOut();

      if (this.$route.meta.requiresAuth) this.$router.push({ name: 'home' });
    },
  },
};
</script>
<style scoped lang="scss"></style>
