<template>
  <div>
    <h3>Consulta Clima</h3>
    <input v-model="cidade" placeholder="Digite o nome da cidade" />

    <!-- Seletor de unidade -->
    <select v-model="unidade">
      <option value="metric">Celsius (°C)</option>
      <option value="imperial">Fahrenheit (°F)</option>
    </select>

    <button @click="buscarClima">Buscar Clima</button>

    <div v-if="carregando" style="color: blue; margin-top: 10px;">
      🔄 Buscando clima...
    </div>

    <div v-if="erro && !carregando" style="color: red;">
      ⚠️ {{ erro }}
    </div>

    <div v-if="clima && !carregando">
      <p><strong>Cidade:</strong> {{ clima.name }}</p>
      <p><strong>Temperatura:</strong> {{ clima.main.temp }} {{ simboloTemperatura }}</p>
      <p><strong>Clima:</strong> {{ clima.weather[0].description }}</p>
      <p><strong>Umidade:</strong> {{ clima.main.humidity }}%</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ClimaCidade',
  data() {
    return {
      cidade: '',
      clima: null,
      erro: '',
      carregando: false,
      unidade: 'metric' // default: Celsius
    };
  },
  computed: {
    simboloTemperatura() {
      return this.unidade === 'metric' ? '°C' : '°F';
    }
  },
  methods: {
    buscarClima() {
      this.erro = '';
      this.clima = null;
      this.carregando = true;

      if (!this.cidade) {
        this.erro = 'Por favor, insira o nome de uma cidade.';
        this.carregando = false;
        return;
      }

      const apiKey = '89eeafdd2977f5fa69c39e9dad70b2db'; // substitua pela sua chave válida
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.cidade}&appid=${apiKey}&units=${this.unidade}&lang=pt_br`;

      axios.get(url)
        .then(response => {
          this.clima = response.data;
          console.log('Clima:', response.data);
        })
        .catch(error => {
          if (!error.response) {
            this.erro = 'Sem conexão com a internet.';
          } else if (error.response.status === 404) {
            this.erro = 'Cidade não encontrada.';
          } else {
            this.erro = 'Erro ao buscar o clima.';
          }
        })
        .finally(() => {
          this.carregando = false;
        });
    }
  }
}
</script>
