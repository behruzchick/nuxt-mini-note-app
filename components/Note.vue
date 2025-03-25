<script>
defineProps({
  text:{
    type:String,
    required:true
  },
  id:{
    type: Number,
    required:true
  },
  user_id:{
    type: Number,
    required:true
  }
})
</script>
<template>
  <div>
      <h1>{{ id }}</h1>
  </div>
</template>
