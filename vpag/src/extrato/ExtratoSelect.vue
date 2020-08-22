<template>
  <ValidationProvider name="extrato" rules="required" immediate>
    <v-autocomplete
      v-model="extrato"
      :items="items"
      :search-input.sync="search"
      :menu-props="{ maxHeight: '400' }"
      cache-items
      slot-scope="{ errors, valid }"
      :error-messages="errors"
      :success="valid"
      item-text="name"
      label="Extrato"
      placeholder="Start typing to search"

      return-object
      :loading="loading"
    />
  </ValidationProvider>
</template>

<script>
import ExtratoApi from "@/extrato/api"
import { cloneDeep } from "lodash"
import { ValidationProvider } from "vee-validate"
export default {
  name: "ExtratoSelect",

  props: {
    value: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },

  components: {
    ValidationProvider
  },

  data() {
    return {
      loading: false,
      search: null,
      select: null,
      items: []
    }
  },

  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val)
    },
    value(val) {
      if (!val) return
      this.items.push(val)
    }
  },

  computed: {
    document: {
      get() {
        return cloneDeep(this.value)
      },
      set(value) {
        this.$emit("input", value)
      }
    }
  },

  methods: {
    querySelections(v) {
      this.loading = true
      // Simulated ajax query
      ExtratoApi.getAll({ q: v }).then(response => {
        this.items = response.data.items
        this.loading = false
      })
    }
  },

  mounted() {
    this.error = null
    this.loading = true
    ExtratoApi.getAll().then(response => {
      this.items = response.data.items
      this.loading = false
    })
  }
}
</script>
