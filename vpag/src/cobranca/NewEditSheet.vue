<template>
  <ValidationObserver v-slot="{ invalid, validated }">
    <v-navigation-drawer v-model="showCreateEdit" app clipped right width="500">
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title v-if="id" class="title">Alterar</v-list-item-title>
            <v-list-item-title v-else class="title">Nova</v-list-item-title>
            <v-list-item-subtitle>Cobranca</v-list-item-subtitle>
          </v-list-item-content>
          <v-btn
            icon
            color="primary"
            :loading="loading"
            :disabled="invalid || !validated"
            @click="save()"
          >
            <v-icon>save</v-icon>
          </v-btn>
          <v-btn icon color="secondary" @click="closeCreateEdit()">
            <v-icon>close</v-icon>
          </v-btn>
        </v-list-item>
      </template>
      <v-card flat>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <span class="subtitle-2">Detalhes</span>
              </v-flex>              
               <v-flex xs12>
                <ValidationProvider name="Valor" rules="required" immediate>
                  <v-text-field
                  v-model="valor"
                    slot-scope="{ errors, valid }"
                    :error-messages="errors"
                    :success="valid"
                    label="Valor"
                    hint="O valor do documento."
                    clearable
                    required
                    >
                  </v-text-field>
                </ValidationProvider>
               </v-flex>
              <v-flex xs12>
                <ValidationProvider name="Name" rules="required" immediate>
                  <v-autocomplete
                    v-model="select"
                    :loading="loading"
                    :items="items"
                    :search-input.sync="search"
                    cache-items                    
                    flat
                    hide-no-data
                    hide-details
                    label="Selecione o cliente"
                    clearable
                    required
                  ></v-autocomplete>
                </ValidationProvider>
              </v-flex>
              <v-flex xs12>  
                <ValidationProvider name="DataVencimento" rules="required" immediate>
                <v-text-field
                    v-model="dataVencimento"
                    slot-scope="{ errors, valid }"
                    :error-messages="errors"
                    :success="valid"
                    label="Data Vencimento"
                    hint="A data de vencimento do documento."
                    clearable
                    required
                  /> 
                </ValidationProvider>               
              </v-flex>
              <v-flex xs12>
                <ValidationProvider name="descricao" immediate>
                  <v-textarea
                    v-model="descricao"
                    slot-scope="{ errors, valid }"
                    label="Descricao"
                    :error-messages="errors"
                    :success="valid"
                    hint="A descricao ou observacao do documento."
                    clearable
                  />
                </ValidationProvider>
              </v-flex>
              <v-flex xs12>
                <ValidationProvider name="Document Weblink" rules="required" immediate>
                  
                </ValidationProvider>
              </v-flex>
              <v-flex xs12>
                <span class="subtitle-2">Metodo de Pagamento</span>
              </v-flex>
              <v-flex xs12>
                 <v-select
                    v-model="select"                    
                    :items="formas"                    
                    cache-items                    
                    flat
                    hide-no-data
                    hide-details
                    label="Selecione o tipo de pagamento"
                    clearable
                    required
                  ></v-select>
              </v-flex>
              <v-flex xs12>
                <!-- <incident-priority-multi-select v-model="incident_priorities" /> -->
              </v-flex>
              <v-flex>
                <!-- <incident-type-multi-select v-model="incident_types" /> -->
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-navigation-drawer>
  </ValidationObserver>
</template>

<script>
import { mapFields } from "vuex-map-fields"
import { mapActions } from "vuex"
import { ValidationObserver, ValidationProvider, extend } from "vee-validate"
import { required } from "vee-validate/dist/rules"
// import IncidentPriorityMultiSelect from "@/incident_priority/IncidentPriorityMultiSelect.vue"
// import IncidentTypeMultiSelect from "@/incident_type/IncidentTypeMultiSelect.vue"
// import TermCombobox from "@/term/TermCombobox.vue"

extend("required", {
  ...required,
  message: "This field is required"
})

export default {
  name: "CobrancaNewEditSheet",

   data () {
      return {
        recorrente: false,
        items: [],
        search: null,
        select: null,
        menu2: false,
        modal: false,
        picker: new Date().toISOString().substr(0, 10),
        formas: [
          'Dinheiro',
          'Debito',
          'Credito',
          'Boleto',
          'Carteira',
        ],
        clientes: [
          'Adrian',
          'Afonso',
          'Ester',
          'Dina',
          'Ivo',
          'Kenny',
          'Milene',
          'Nilo',
          'Roberto',
          'Viviane',
          'Andreia',
          'David',
          'Brenda',
          'Júlio',
          'Zara',
          'Giulia',
          'Joaquim',
          'Indianara',
          'Bella',
          'Eduarda',
          'Jasmeen',
          'Jairo',
          'Alberto',
          'Miriam',
          'Bruno',
          'Edna',
          'Katia',
          'Luena',
         
        ],
      }
    },

  components: {
    ValidationObserver,
    ValidationProvider,
    // IncidentPriorityMultiSelect,
    // IncidentTypeMultiSelect,
    // TermCombobox
  },

  computed: {
    ...mapFields("cobranca", [
      "selected.name",
      "selected.description",
      "selected.terms",
      "selected.resource_type",
      "selected.weblink",
      "selected.resource_id",
      "selected.incident_priorities",
      "selected.incident_types",
      "selected.id",
      "selected.loading",
      "dialogs.showCreateEdit"
    ])
  },

  methods: {
    ...mapActions("cobranca", ["save", "closeCreateEdit"]),

    querySelections (v) {
        this.loading = true
        // Simulated ajax query
        setTimeout(() => {
          this.items = this.clientes.filter(e => {
            return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          })
          this.loading = false
        }, 500)
    }
  },

  watch: {
      search (val) {
        val && val !== this.select && this.querySelections(val)
      },
    },
}
</script>
