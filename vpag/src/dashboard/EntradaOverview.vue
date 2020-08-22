<template>
 <v-container fluid grid-list-xl>
    <v-layout row wrap>
      <h1>Entradas Overview</h1>
      <v-flex class="d-flex justify-end" lg6 sm6 xs12>
        <dialog-filter v-bind="query" @update="update" @loading="setLoading" />
      </v-flex>
    </v-layout>
 </v-container>
</template>

<script>

import DialogFilter from "@/dashboard/DialogFilter.vue"

export default {
  name: "EntradaDashboard",

  components: {
    DialogFilter,
  }

}
</script>

<style>

</style>