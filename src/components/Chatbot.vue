<template>
  <div class="fixed bottom-5 right-5 w-96 bg-white shadow-lg rounded-lg p-4">
    <div class="flex flex-col h-80 overflow-y-auto">
      <div v-for="(message, index) in messages" :key="index" class="mb-3">
        <div v-if="message.from === 'user'" class="text-right">
          <div class="bg-blue-600 text-white p-2 rounded-lg inline-block max-w-xs">
            {{ message.text }}
          </div>
        </div>
        <div v-if="message.from === 'bot'" class="text-left">
          <div class="bg-gray-200 p-2 rounded-lg inline-block max-w-xs">
            {{ message.text }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex">
      <input v-model="userMessage" @keyup.enter="sendMessage" class="border p-2 flex-1 rounded-l-lg" placeholder="Chiedi qualcosa...">
      <button @click="sendMessage" class="bg-blue-600 text-white p-2 rounded-r-lg">Invia</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userMessage: '',
      messages: [
        { from: 'bot', text: '' },
      ],
    };
  },
  methods: {
    async sendMessage() {
      if (this.userMessage.trim() !== '') {
        // Aggiungi il messaggio dell'utente
        this.messages.push({ from: 'user', text: this.userMessage });

        // Invia il messaggio al backend usando Fetch
        try {
          const response = await fetch('http://localhost:3000/chat', {
            method: 'POST', // Metodo HTTP per inviare dati
            headers: {
              'Content-Type': 'application/json', // Tipo di contenuto
            },
            body: JSON.stringify({ message: this.userMessage }) // Corpo della richiesta con il messaggio dell'utente
          });

          // Se la risposta non è OK, lancia un errore
          if (!response.ok) {
            throw new Error('Errore nella risposta');
          }

          // Parso la risposta JSON
          const data = await response.json();

          // Aggiungi la risposta del bot
          this.messages.push({ from: 'bot', text: data.message });
        } catch (error) {
          console.error('Errore:', error);
          // In caso di errore, mostra un messaggio di errore
          this.messages.push({ from: 'bot', text: 'Mi scuso, c\'è stato un errore nel rispondere alla tua domanda.' });
        }

        // Pulisci la casella di input
        this.userMessage = '';
      }
    }
  }
};
</script>
