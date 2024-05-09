<script setup lang="ts">
import { usePreferenceStore } from '@/stores/preferences'
import { computed } from 'vue'

const preferenceStore = usePreferenceStore()

const preference = computed(() => preferenceStore.preference)
const textualPreference = computed(() => preferenceStore.textualPreference)
</script>

<template>
  <h1>What you'll be making</h1>

  <p>
    Two {{ textualPreference }} images will appear on your screen, side by side. The user simply
    clicks on the {{ textualPreference }} that they think is the cutest. After they vote, a new pair
    of {{ textualPreference }}s will appear for them to judge. Each vote helps us determine which
    {{ textualPreference }} reigns supreme in the world of cuteness. The more votes, the better we
    can rank the vast array of charming and delightful {{ textualPreference }}s fetched from The
    <span class="capitalize">{{ textualPreference }}</span
    >s API.
  </p>

  <p>
    This application will test your ability to use an API and showcases the capabilities of modern
    web technologies, integrating VueJS, Node.js, ExpressJS, and MySQL. It’s built for both fun and
    functionality, offering a smooth and responsive user experience.
  </p>

  <h2>Steps to complete the assignment:</h2>

  <ol class="list-decimal list-inside space-y-3">
    <li>
      Create an API key on
      <a
        :href="preference === 'cats' ? 'https://thecatapi.com' : 'https://thedogapi.com'"
        ref="noopener noreferrer"
      >
        {{ preference === 'cats' ? 'https://thecatapi.com' : 'https://thedogapi.com' }}
      </a>
      and look through the available endpoints to see what is possible.
      <small class="inline-block">(Skill: Resourcefulness using external APIs)</small>
    </li>
    <li>
      Allow the user to login (LoginView.vue). A user has already been seeded to the database with
      the credentials: <code>admin@brynq.com / password</code>&nbsp; (Check out
      <a href="https://bun.sh/guides/util/hash-a-password" target="_blank" ref="noopener noreferrer"
        >this guide</a
      >
      on how to verify a password).
      <small class="inline-block">(Skill: Authentication through JWT)</small>
    </li>
    <li>
      Allow the user to store their API key (ApiView.vue). You can keep this simple for now and
      store it in the local localStorage.
    </li>
    <li>
      Create a database table to store the {{ textualPreference }} images. (Hint: Check out the
      schema's defined in <code>backend/src/config/schema.ts</code> and create a migration using the
      <code>drizzle-kit</code> CLI tool)
      <small class="inline-block">(Skill: SQL/ORM)</small>
    </li>
    <li>
      Retrieve 200 of the cutest {{ textualPreference }} images from the API to store in the
      database.
      <small class="inline-block">
        (Skill: Data retrieval, transformation and database insertion)
      </small>
    </li>
    <li>
      Create a view (make it as pretty and functional as you can) that will randomly show two of the
      images (based on an elo rating algoritm) and display them side by side (VotingView.vue). The
      user can then vote on which one they think is the cutest.
      <small class="inline-block">(Skill: VueJS, TailwindCSS and freedom to be creative)</small>
    </li>
    <li>
      Every time a user votes, update the elo rating of the {{ textualPreference }}s and show the
      user two new images.
      <small class="inline-block">(Skill: Data manipulation and algorithm implementation)</small>
    </li>
    <li>
      <span class="text-lg font-semibold">Bonus:</span>
      Create a leaderboard view that shows the top 10 {{ textualPreference }}s based on their elo
      rating with some information about the breed.
      <small class="inline-block">(Skill: Data retrieval and presentation)</small>
    </li>
  </ol>
  <h2>What we provided:</h2>
  <p>
    We have provided you with a basic VueJS application that includes a login view, an API view, and
    a voting view. We have also provided you with a basic Node.js and ExpressJS server that already
    connects to a MySQL database. The backend server is located in the
    <code>backend</code> directory. The frontend VueJS application is located in the
    <code>webapp</code> directory.
  </p>
  <p>
    We've also provided you with a basic algorithm for calculating the Elo rating of the
    {{ textualPreference }}s. You can find this in the <code>elo-rating.helper.ts</code> file in the
    <code>helpers</code> directory of the backend.
  </p>
  <p class="text-lg font-semibold mt-6 mb-3 leading-tight">
    We wish you the best of luck in your assignment. If you have any questions, please don't
    hesitate to reach out to us.
  </p>
</template>

<style scoped>
h1 {
  @apply text-2xl font-semibold mb-3;
}

h2 {
  @apply text-lg font-semibold mt-6 mb-3;
}

code {
  @apply font-mono bg-gray-800 p-1 rounded;
}
</style>
