<script setup lang="ts">
import { computed, ref } from 'vue'
import CatImage from '@/components/CatImage.vue';

interface Cat {
  id: number, cat_id: string, url: string, elo: number
}

const musicIsPlaying = ref(false)

const left_cat = ref<Cat>()
const right_cat = ref<Cat>()

const bgm = ref(new Audio('/nyanrythm.mp3'))
bgm.value.loop = true

const hasApiKey = computed(() => {
  return localStorage.getItem('apiKey') !== null && localStorage.getItem('apiKey') !== ''
})

function playCatNoise() {
  const filenames = ['/meow1.mp3', '/meow2.mp3', '/purr1.mp3']

  let meow = new Audio(filenames[Math.floor(Math.random() * filenames.length)]);
  meow.addEventListener("canplaythrough", () => {
    meow.play();
  });
}

function toggleMusic() {
  if (musicIsPlaying.value) {
    bgm.value.pause()
    musicIsPlaying.value = false
  } else {
    bgm.value.play()
    musicIsPlaying.value = true
  }
}

async function catMash() {
  try {
    const respone = await fetch("http://localhost/api/catmash",
      {
        credentials: 'same-origin',
      }
    )

    const cats = await respone.json()
    left_cat.value = cats[0]
    right_cat.value = cats[1]
  } catch (error) {
    console.log(error)
  }
}

async function vote(winner: Cat, loser: Cat, draw = false) {
  try {
    // one in ten chance for a cat noise
    if (Math.random() < 10 / 100) {
      playCatNoise()
    }

    await fetch("http://localhost/api/catmash",
      {
        body: JSON.stringify({
          winner,
          loser,
          wasDraw: draw
        }),
        credentials: 'same-origin',
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      }
    )
    left_cat.value = undefined
    right_cat.value = undefined

    await catMash()
  } catch (error) {
    console.log(error)
  }
}

catMash()
</script>

<template>
  <h1 align="center" class="text-4xl font-bold mb-3 catFont"> <span class="cursor-pointer" @click="playCatNoise">🐈</span>
    CatMash <span class="cursor-pointer" @click="playCatNoise">🐈‍⬛</span> </h1>
  <span v-if="hasApiKey">
    <h2 align="center" class="text-lg font-semibold mb-4 kiddyFont">Who's Cuter 😍? Click to Choose.</h2>
    <div class="flex justify-center">
      <button @click="toggleMusic" type="button" class="py-2 px-3 rounded-full ">
        {{ musicIsPlaying ? '🔈' : '🔇' }}
      </button>
    </div>
    <div class="max-w-4xl mx-auto grid grid-cols-1">
      <div class="grid gap-4 col-start-1 col-end-3 row-start-1 mb-6 grid-cols-7">
        <CatImage @voted="vote(left_cat!, right_cat!)" :source="left_cat?.url" tilt-to="right" />

        <div class="col-span-1 grid content-center">
          <h2 align="center" class="kiddyFont text-base">
            Or
          </h2>
        </div>

        <CatImage @voted="vote(right_cat!, left_cat!)" :source="right_cat?.url" tilt-to="left" />
      </div>
      <div class="mt-8 col-start-1 row-start-2 flex justify-center">
        <button @click="vote(left_cat!, right_cat!, true)" type="button"
          class="bg-orange-200 text-white text-base kiddyFont leading-6 font-medium py-2 px-3 rounded-lg hover:bg-orange-300 active:bg-orange-400 focus:outline-none focus:ring focus:ring-orange-100">
          I can't choose 😖!
        </button>
      </div>
    </div>
  </span>
  <div v-else>
    <h2 align="center" class="text-lg font-semibold mb-4 kiddyFont">
      Oh..
    </h2>
    <img src="/cat-mouse-screen.gif" class="h-28 mx-auto" alt="">
    <p class="text-center">
      Looks like you don't have your API key filled in yet meow.
    </p>
    <p class="text-center">
      Click <router-link to="/apikey">here</router-link> and save your CatApi key!
    </p>
  </div>
</template>

<style></style>