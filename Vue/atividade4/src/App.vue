<template>
  <v-app>
    <!-- Toolbar fixa -->
    <v-toolbar app color="primary" dark>
      <v-toolbar-title class="ml-0 pl-4">
        <v-btn icon @click="drawer = !drawer">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <div class="text-h6">Título Centralizado</div>
      <v-spacer></v-spacer>
    </v-toolbar>

    <!-- Menu lateral -->
    <v-navigation-drawer app v-model="drawer" temporary>
      <v-list>
        <v-list-item-group>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Item 1</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Item 2</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- Conteúdo principal -->
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-card color="secondary" class="pa-3">
              <v-card-title>Coluna 1</v-card-title>
              <v-card-text>Conteúdo da coluna 1.</v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card color="secondary" class="pa-3">
              <v-card-title>Coluna 2</v-card-title>
              <v-card-text>Conteúdo da coluna 2.</v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card color="secondary" class="pa-3">
              <v-card-title>Coluna 3</v-card-title>
              <v-card-text>Conteúdo da coluna 3.</v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Botão com console -->
        <v-row>
          <v-col cols="12" class="text-center">
            <v-btn color="primary" dark @click="mostrarMensagem">
              Clique Aqui
            </v-btn>
          </v-col>
        </v-row>

        <!-- Card com imagem e alerta -->
        <v-row>
          <v-col cols="12" md="6" offset-md="3">
            <v-card>
              <v-img
                src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                height="200px"
              ></v-img>
              <v-card-title class="headline">Cartão com Imagem</v-card-title>
              <v-card-actions>
                <v-btn color="primary" @click="mostrarAlerta">
                  Mostrar Alerta
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <!-- Botão que ativa o modal -->
        <v-row>
          <v-col cols="12" class="text-center">
            <v-btn color="primary" dark @click="dialog = true">
              Abrir Modal
            </v-btn>
          </v-col>
        </v-row>

        <!-- Modal (v-dialog) -->
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title class="headline">Título do Modal</v-card-title>
            <v-card-text>
              Esta é a mensagem do modal e você deve dar uma nota 10 rsrs
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" text @click="dialog = false">Fechar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Login -->
        <v-row>
          <v-col cols="12" md="6" offset-md="3">
            <v-card class="pa-4" color="secondary">
              <v-card-title class="headline">Login</v-card-title>
              <v-form ref="form" v-model="loginValido" lazy-validation>
                <v-text-field
                  v-model="email"
                  label="E-mail"
                  :rules="regrasEmail"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="senha"
                  label="Senha"
                  type="password"
                  :rules="regrasSenha"
                  required
                ></v-text-field>

                <v-btn color="primary" @click="enviarLogin">
                  Entrar
                </v-btn>
              </v-form>
            </v-card>
          </v-col>
        </v-row>

        <!-- Tabela de produtos -->
        <v-row>
          <v-col cols="12">
            <v-data-table
              :headers="headers"
              :items="produtos"
              class="elevation-1"
            >
              <template v-slot:top>
                <v-toolbar flat color="primary" dark>
                  <v-toolbar-title>Lista de Produtos</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                </v-toolbar>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-container>
      <!-- Tabela da API externa -->
<v-row>
  <v-col cols="12">
    <v-data-table
      :headers="apiHeaders"
      :items="apiUsuarios"
      :loading="carregandoAPI"
      loading-text="Carregando usuários..."
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="secondary">
          <v-toolbar-title>Usuários da API</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
    </v-data-table>
  </v-col>
</v-row>

    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      dialog: false,
      drawer: false,

      // API externa
      apiUsuarios: [],
      carregandoAPI: true,
      apiHeaders: [
        { text: 'Nome', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Telefone', value: 'phone' }
      ],

      // Data Table local
      headers: [
        { text: 'Nome', value: 'nome' },
        { text: 'Preço', value: 'preco' },
        { text: 'Estoque', value: 'estoque' }
      ],
      produtos: [
        { nome: 'Mouse Gamer', preco: 'R$ 120,00', estoque: 15 },
        { nome: 'Teclado Mecânico', preco: 'R$ 230,00', estoque: 8 },
        { nome: 'Monitor 24"', preco: 'R$ 950,00', estoque: 5 },
        { nome: 'Fone Bluetooth', preco: 'R$ 180,00', estoque: 20 }
      ],

      // Formulário de login
      email: '',
      senha: '',
      loginValido: false,
      regrasEmail: [
        v => !!v || 'E-mail é obrigatório',
        v => /.+@.+\..+/.test(v) || 'E-mail inválido'
      ],
      regrasSenha: [
        v => !!v || 'Senha é obrigatória',
        v => v.length >= 4 || 'Mínimo 4 caracteres'
      ]
    };
  },
  methods: {
    mostrarMensagem() {
      console.log('Você clicou no botão!');
    },
    mostrarAlerta() {
      alert('Você clicou no botão do card com imagem!');
    },
    enviarLogin() {
      if (this.$refs.form.validate()) {
        alert('Login enviado com sucesso!');
      } else {
        alert('Preencha os campos corretamente.');
      }
    },
    async carregarUsuarios() {
      try {
        const resposta = await axios.get('https://jsonplaceholder.typicode.com/users');
        this.apiUsuarios = resposta.data;
      } catch (erro) {
        console.error('Erro ao carregar usuários:', erro);
      } finally {
        this.carregandoAPI = false;
      }
    }
  },
  mounted() {
    this.carregarUsuarios();
  }
};
</script>

<style lang="scss">
.v-btn {
  border-radius: 25px !important; /* arredondado */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2) !important; /* sombra suave */
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
  }
}
</style>
