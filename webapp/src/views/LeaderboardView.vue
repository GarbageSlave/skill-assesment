<script setup lang="ts">
import { ref } from 'vue'

interface LeaderboardCat {
  id: number,
  breeds: any,
  url: string,
  elo: number,
  place: number
}

const leaderboard = ref<LeaderboardCat[]>([])

async function getLeaderboard() {
  try {
    const respone = await fetch("http://localhost/api/leaderboard",
      {
        credentials: 'same-origin',
      }
    )

    const json = await respone.json()

    leaderboard.value = json.map((cat: LeaderboardCat) => ({
      ...cat,
      breeds: JSON.parse(cat.breeds)
    }))
  } catch (error) {
    console.log(error)
  }
}

function getPlaceProps(place: number) {
  switch (place) {
    case 1:
      return {
        emoji: '🏆',
        bg: 'bg-yellow-200'
      }
    case 2:
      return {
        emoji: '🥈',
        bg: 'bg-stone-200'
      }
    case 3:
      return {
        emoji: '🥉',
        bg: 'bg-orange-300'
      }
    default:
      return {
        emoji: '',
        bg: ''
      }
  }
}

getLeaderboard()
</script>

<template>
  <h1 class="text-xl font-bold mb-3">Leaderboard</h1>
  <table class="table-auto w-full rounded-lg">
    <thead class="bg-slate-300">
      <tr>
        <th></th>
        <th class="text-lg">
          Place
        </th>
        <th></th>
        <th class="text-lg">
          Elo
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="cat in leaderboard" :class="getPlaceProps(cat.place).bg">
        <td>
          {{ getPlaceProps(cat.place).emoji }}
        </td>
        <td class="text-lg">
          {{ cat.place }}
        </td>
        <td class="flex">
          <img class="w-32 p-1 rounded-lg mr-4" :src="cat.url">
          <div class="py-2 px-4">
            <h1 class="text-xl">
              {{ cat.breeds[0].name }} <span class="text-sm font-bold">({{ cat.breeds[0].origin }})</span> <span
                class="text-sm font-bold italic">{{ cat.breeds[0].id }}</span>
            </h1>
            <p class="text-base">
              {{ cat.breeds[0].description }}
            </p>
          </div>
        </td>
        <td class="px-4">
          <div class="bg-slate-100 rounded-full p-2">
            <h1 align="center" class="text-lg">
              {{ cat.elo }}
            </h1>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>