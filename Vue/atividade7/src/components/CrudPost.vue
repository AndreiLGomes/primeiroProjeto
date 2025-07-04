<template>
  <div>
    <h3>CRUD de Posts</h3>

    <form @submit.prevent="salvarPost">
      <input v-model="novoPost.title" placeholder="Título" />
      <textarea v-model="novoPost.body" placeholder="Conteúdo"></textarea>
      <button type="submit">{{ editando ? 'Atualizar' : 'Adicionar' }}</button>
    </form>

    <p v-if="loading">🔄 Carregando posts...</p>

    <ul>
      <li v-for="post in posts" :key="post.id">
        <strong>{{ post.title }}</strong>
        <p>{{ post.body }}</p>
        <button @click="editarPost(post)">✏️ Editar</button>
        <button @click="deletarPost(post.id)">🗑️ Excluir</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CrudPost',
  data() {
    return {
      posts: [],
      novoPost: {
        title: '',
        body: ''
      },
      editando: false,
      idEditando: null,
      loading: false
    };
  },
  mounted() {
    this.buscarPosts();
  },
  methods: {
    buscarPosts() {
      this.loading = true;
      axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
        .then(res => {
          this.posts = res.data;
        })
        .catch(() => {
          alert('Erro ao buscar posts');
        })
        .finally(() => {
          this.loading = false;
        });
    },
    salvarPost() {
      if (this.editando) {
        axios.put(`https://jsonplaceholder.typicode.com/posts/${this.idEditando}`, this.novoPost)
          .then(() => {
            alert('Post atualizado!');
            this.buscarPosts();
            this.resetarFormulario();
          });
      } else {
        axios.post('https://jsonplaceholder.typicode.com/posts', this.novoPost)
          .then(res => {
            this.posts.unshift(res.data);
            this.resetarFormulario();
          });
      }
    },
    editarPost(post) {
      this.editando = true;
      this.idEditando = post.id;
      this.novoPost = { ...post };
    },
    deletarPost(id) {
      axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(() => {
          this.posts = this.posts.filter(p => p.id !== id);
        });
    },
    resetarFormulario() {
      this.novoPost = { title: '', body: '' };
      this.editando = false;
      this.idEditando = null;
    }
  }
}
</script>
