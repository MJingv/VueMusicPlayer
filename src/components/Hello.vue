<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2 v-if = "seen" :title='time'>can you see me </h2>
    <button v-on:click="reverse">click me to reverse</button>
    <ol>

      <li v-for="todo in todos">
        {{ todo.text  }}
      </li>
      <input v-model = "message"/>
      {{message}}
    </ol>


  </div>
</template>

<script>
export default {
  name: 'hello',
  seen:false,
  time:'',
  msg:'',


  data () {
    return {
      seen:true,
      msg: 'Welcome to jehol\'s Vue.js App',
      time:'现在time'+new Date().toLocaleString(),
      message:'no',
      todos: [
     { text: '学习 JavaScript' },
     { text: '学习 Vue' },
     { text: '整个牛项目' }
   ]
    }
  },

   methods: {
     reverse:  function() {
      this.msg = this.msg.split('').reverse().join('')
    }

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
