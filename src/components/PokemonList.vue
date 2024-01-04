<template>
  <div>
    <div v-if="loading === 'success'">
      <ul
        role="list"
        class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        <li
          v-for="(pokemon, index) in capitlizeNamePokemons"
          :key="`pokemon-${index}`"
          class="gap-x-6 py-5"
        >
          <router-link v-bind:to="`/pokemons/${index + 1}`">
            <div
              class="rounded-2xl shadow-md p-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16 hover:shadow-xl"
            >
              <div class="min-w-0 flex-auto">
                <p class="text-sm font-semibold leading-6 text-gray-900">
                  {{ pokemon.name }}
                </p>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <div v-if="loading === 'loading'">Loading</div>
    <div v-if="loading === 'error'">
      <ErrorView></ErrorView>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, inject } from 'vue'
import { storeToRefs } from 'pinia'
import { usePokemonStore } from '../stores/pokemon'
import ErrorView from './ErrorView.vue'

const toast = inject('toast')

const { pokemons, loading } = storeToRefs(usePokemonStore())
const pokemonStore = usePokemonStore()

onMounted(async () => {
  try {
    await pokemonStore.fetchAllPokemons()
    toast.addToast('Pokemons fetched', 'success')
  } catch (error) {
    console.log(error)
    toast.addToast('Error fetching Pokemons', 'error')
  }
})

const capitlizeNamePokemons = computed(() => {
  const upperCaseNameList = pokemons.value.map((pokemon) => {
    const firstLetterCapitalize = pokemon.name.split('')[0].toUpperCase()
    const name = `${firstLetterCapitalize}${pokemon.name
      .split('')
      .slice(1)
      .join('')}`
    return {
      ...pokemon,
      name,
    }
  })

  return upperCaseNameList
})
</script>
