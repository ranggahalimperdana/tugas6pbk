<template>
  <div class="container">
    <!-- Form -->
    <form @submit.prevent="save" class="form">
      <input type="text" v-model="form.title" placeholder="Title" class="input" />
      <textarea v-model="form.content" placeholder="Content" class="textarea"></textarea>
      <button type="submit" class="button">Save</button>
    </form>

    <!-- List of Articles -->
    <ul class="article-list">
      <li v-for="article in articles" :key="article.id" class="article-item">
        <h2>{{ article.title }}</h2>
        <p>{{ article.content }}</p>
        <div class="buttons">
          <button @click="edit(article)" class="button edit-button">Edit</button>
          <button @click="deleteArticle(article.id)" class="button delete-button">Delete</button>
        </div>
      </li>
    </ul>

    <!-- Load Button -->
    <button @click="load" class="button load-button">Load Articles</button>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from 'vue';
import { db } from '../firebaseConfig';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export default {
  setup() {
    const form = reactive({
      id: '',
      title: '',
      content: '',
    });

    const articles = ref([]);

    async function load() {
      try {
        const querySnapshot = await getDocs(collection(db, 'articles'));
        articles.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error('Error loading articles:', error);
      }
    }

    async function save() {
      try {
        if (form.id) {
          await updateDoc(doc(db, 'articles', form.id), {
            title: form.title,
            content: form.content,
          });
          articles.value = articles.value.map(article =>
            article.id === form.id ? { id: form.id, title: form.title, content: form.content } : article
          );
        } else {
          const docRef = await addDoc(collection(db, 'articles'), {
            title: form.title,
            content: form.content,
          });
          articles.value.push({ id: docRef.id, title: form.title, content: form.content });
        }
        form.id = '';
        form.title = '';
        form.content = '';
      } catch (error) {
        console.error('Error saving article:', error);
      }
    }

    async function deleteArticle(id) {
      try {
        await deleteDoc(doc(db, 'articles', id));
        articles.value = articles.value.filter(article => article.id !== id);
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    }

    function edit(article) {
      form.id = article.id;
      form.title = article.title;
      form.content = article.content;
    }

    onMounted(load);

    return { form, articles, save, edit, deleteArticle, load };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');

.container {
  font-family: 'Space Mono', monospace;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #00ffff; /* Aqua background color */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

.input, .textarea {
  width: 100%;
  padding: 15px;
  margin-bottom: 15px;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-family: 'Space Mono', monospace;
  font-size: 16px;
  box-sizing: border-box;
}

.button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Space Mono', monospace;
  font-size: 16px;
  margin-top: 10px;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #0056b3;
}

.article-list {
  list-style-type: none;
  padding: 0;
}

.article-item {
  background-color: #fff;
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.article-item h2 {
  margin: 0 0 10px;
  font-size: 24px;
}

.article-item p {
  margin: 0 0 10px;
  font-size: 16px;
}

.article-item .buttons {
  display: flex;
  gap: 10px;
}

.edit-button {
  background-color: #28a745;
}

.edit-button:hover {
  background-color: #218838;
}

.delete-button {
  background-color: #dc3545;
}

.delete-button:hover {
  background-color: #c82333;
}

.load-button {
  background-color: #17a2b8;
  display: block;
  width: 100%;
  text-align: center;
}

.load-button:hover {
  background-color: #138496;
}
</style>
