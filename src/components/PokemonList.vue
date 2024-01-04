<template>
  <ul role="list" class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4">
    <li
      v-for="(pokemon, index) in capitlizeNamePokemons"
      :key="`pokemon-${index}`"
      class="gap-x-6 py-5"
    >
      <div
        class="rounded-2xl bg-gray-50 p-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16"
      >
        <div class="min-w-0 flex-auto">
          <p class="text-sm font-semibold leading-6 text-gray-900">
            {{ pokemon.name }}
          </p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { usePokemonStore } from '../stores/pokemon'

const { pokemons } = storeToRefs(usePokemonStore())
const pokemonStore = usePokemonStore()

onMounted(() => {
  pokemonStore.fetchAllPokemons()
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
