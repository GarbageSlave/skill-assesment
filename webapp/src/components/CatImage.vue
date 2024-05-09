<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const emit = defineEmits(['voted'])
const props = defineProps(['source', 'tiltTo'])

const isLoading = ref(true)
const imageLoaded = ref(false)

function onImageLoad() {
  isLoading.value = false
  imageLoaded.value = true
}

watch(
  () => props.source,
  () => {
    imageLoaded.value = false
    isLoading.value = true
  }
)
</script>

<template>
  <div class="w-full h-60 col-span-3 rounded-lg relative">
    <Transition name="bounce">
      <img v-show="imageLoaded" @click="emit('voted')" @load="onImageLoad" :src="props.source" alt="Cute cat"
        class="object-cover hover:object-contain w-full p-2 h-60 bg-orange-100 dots rounded-lg cursor-pointer shadow hover:shadow-xl transition ease-in-out duration-150 hover:transform hover:scale-110"
        :class="{ 'hover:-rotate-6': tiltTo === 'right', 'hover:rotate-6': tiltTo === 'left' }" loading="eager">
    </Transition>
    <div v-if="isLoading" class="w-1/2 h-1/2 absolute top-1/4 left-1/4 rounded-lg cursor-not-allowed">
      <img src="/loading.jpeg" class="w-28 h-28 rounded-full animate-pulse">
      <h2 class="text-base kiddyFont">
        Meow loading...
      </h2>
    </div>
  </div>
</template>

<style>
.dots {
  background-image: radial-gradient(white 1px, transparent 0);
  background-size: 13px 13px;
  background-position: -19px -19px;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.15);
  }

  100% {
    transform: scale(1);
  }
}
</style>