<template>
  <ValidationObserver v-slot="{ invalid, validated }">
    <v-navigation-drawer v-model="showCreateEdit" app clipped right width="500">
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title v-if="id" class="title">Alterar</v-list-item-title>
            <v-list-item-title v-else class="title">Novo</v-list-item-title>
            <v-list-item-subtitle>Cliente</v-list-item-subtitle>
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
                 <v-select
                    v-model="select"                    
                    :items="tipo"                    
                    cache-items                    
                    flat
                    hide-no-data
                    hide-details
                    label="Documento de cadastro"
                    clearable
                    required
                  ></v-select>
              </v-flex>
               <v-flex xs12>
                <ValidationProvider name="documento" rules="required" immediate>
                  <v-text-field
                  v-model="documento"
                    slot-scope="{ errors, valid }"
                    :error-messages="errors"
                    :success="valid"
                    label="Numero do Documento"
                    clearable
                    required
                    >
                  </v-text-field>
                </ValidationProvider>
               </v-flex>
              <v-flex xs12>
                <ValidationProvider name="Name" rules="required" immediate>
                  <v-text-field
                    v-model="razaosocial"
                    label="Nome/Razao Social"
                    clearable
                    required
                  ></v-text-field>
                </ValidationProvider>
              </v-flex>
              <v-flex xs12>  
                <ValidationProvider name="cep" rules="required" immediate>
                  <v-text-field
                  v-model="cep"
                    slot-scope="{ errors, valid }"
                    :error-messages="errors"
                    :success="valid"
                    label="CEP"
                    clearable
                    required
                    >
                  </v-text-field>
                </ValidationProvider>               
              </v-flex>
              <v-flex xs12>
                <ValidationProvider name="endereco" immediate>
                  <v-textarea
                    v-model="endereco"
                    slot-scope="{ errors, valid }"
                    label="Endereco"
                    :error-messages="errors"
                    :success="valid"
                    hint="A endereco do cliente."
                    clearable
                  />
                </ValidationProvider>
              </v-flex>
              <v-flex xs12>  
                <ValidationProvider name="bairro" rules="required" immediate>
                  <v-text-field
                  v-model="bairro"
                    slot-scope="{ errors, valid }"
                    :error-messages="errors"
                    :success="valid"
                    label="Bairro"
                    clearable
                    required
                    >
                  </v-text-field>
                </ValidationProvider>               
              </v-flex>
              <v-flex xs12>  
                <ValidationProvider name="cidade" rules="required" immediate>
                  <v-text-field
                  v-model="cidade"
                    slot-scope="{ errors, valid }"
                    :error-messages="errors"
                    :success="valid"
                    label="Cidade"
                    clearable
                    required
                    >
                  </v-text-field>
                </ValidationProvider>               
              </v-flex>
              <v-flex xs12>  
                <ValidationProvider name="uf" rules="required" immediate>                 
                     <v-select
                    v-model="uf"                                    
                    :items="uf"   
                    item-text="nome"
                    item-value="sigla"                 
                    cache-items                    
                    flat
                    hide-no-data
                    hide-details
                    label="Selecione a UF"
                    clearable
                    required
                  ></v-select>                  
                </ValidationProvider>               
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
  name: "ClienteNewEditSheet",

   data () {
      return {
        items: [],
        search: null,
        select: null,
        menu2: false,
        modal: false,
        picker: new Date().toISOString().substr(0, 10),
        tipo: [
          'CPF-Pessoa Fisica',
          'CNPJ-Pessoa Juridica',          
        ],
        uf: [
          {sigla:'AC', nome:'Acre'},
          {sigla:'AL', nome:'Alagoas'},
          {sigla:'AP', nome:'Amapá'},
          {sigla:'AM', nome:'Amazonas'},
          {sigla:'BA', nome:'Bahia'},
          {sigla:'CE', nome:'Ceará'},
          {sigla:'DF', nome:'Distrito Federal'},
          {sigla:'ES', nome:'Espirito Santo'},
          {sigla:'GO', nome:'Goiás'},
          {sigla:'MA', nome:'Maranhão'},
          {sigla:'MS', nome:'Mato Grosso do Sul'},
          {sigla:'MT', nome:'Mato Grosso'},
          {sigla:'MG', nome:'Minas Gerais'},
          {sigla:'PA', nome:'Pará'},
          {sigla:'PB', nome:'Paraíba'},
          {sigla:'PR', nome:'Paraná'},
          {sigla:'PE', nome:'Pernambuco'},
          {sigla:'PI', nome:'Piauí'},
          {sigla:'RJ', nome:'Rio de Janeiro'},
          {sigla:'RN', nome:'Rio Grande do Norte'},
          {sigla:'RS', nome:'Rio Grande do Sul'},
          {sigla:'RO', nome:'Rondônia'},
          {sigla:'RR', nome:'Roraima'},
          {sigla:'SC', nome:'Santa Catarina'},
          {sigla:'SP', nome:'São Paulo'},
          {sigla:'SE', nome:'Sergipe'},
          {sigla:'TO', nome:'Tocantins'},      
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
    ...mapFields("cliente", [
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
    ...mapActions("cliente", ["save", "closeCreateEdit"]),

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
