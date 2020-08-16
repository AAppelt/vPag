<template>
  <v-app id="dispatch">
    <!--<loading />-->
    <app-toolbar />
    <app-drawer />
    <snackbar />
    <refresh />
    <v-main>
      <!-- Page Header -->
      <page-header />
      <div class="page-wrapper">
        <v-container pa-4 grid-list-lg>
          <router-view />
        </v-container>
      </div>
      <!-- App Footer -->
      <v-footer height="auto" class="pa-3 app--footer">
        <span class="caption"
          >&copy; {{ new Date().getFullYear() }} by vPag. Todos os direitos reservados.</span
        >
        <v-spacer />
        <span class="caption mr-1">Versão 0.0.0</span>
        <!-- <v-icon color="pink" small>favorite</v-icon> -->
      </v-footer>
    </v-main>
    <!-- Go to top -->
  </v-app>
</template>

<script>
import AppDrawer from "@/components/AppDrawer";
import AppToolbar from "@/components/AppToolbar";
import PageHeader from "@/components/PageHeader";
import Snackbar from "@/components/Snackbar.vue";
import Refresh from "@/components/Refresh.vue";

export default {
  components: {
    AppDrawer,
    AppToolbar,
    PageHeader,
    Snackbar,
    Refresh,
  },

  created() {
    this.$vuetify.theme.light = true;
  },
};
</script>

<style scoped>
.page-wrapper {
  min-height: calc(100vh - 64px - 50px - 81px);
}
</style>
