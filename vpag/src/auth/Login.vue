<template>
  <v-card class="mx-auto" max-width="500" style="margin-top: -64px;">
    <v-card-title>
      vPag - Login
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12" md="12">
              <!-- <v-text-field
                label="Login"
                name="login"
                prepend-icon="mdi-account"
                type="text"
                v-model="form.email"
              ></v-text-field> -->
              <v-text-field prepend-icon="mdi-account" v-model="email" label="Email" required> </v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field
              prepend-icon="mdi-lock"
                v-model="password"
                :type="'password'"
                label="Password"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-subtitle
            >Nao possui uma conta?
            <router-link to="/register">Criar</router-link></v-list-item-subtitle
          >
        </v-list-item-content>
        <v-row align="center" justify="end">
          <v-btn color="primary" @click="basicLogin({ email: email, password: password })"
            >Login</v-btn
          >
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from "vuex"

export default {
  data() {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    ...mapActions("auth", ["basicLogin"])
  }
}
</script>

<style scoped></style>
