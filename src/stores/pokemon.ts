import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { Pokemon, PokemonList, RESTfulList } from '../types/pokemon'

const BASE_URL = 'https://pokeapi.co/api/v2/'

// eslint-disable-next-line import/prefer-default-export
export const usePokemonStore = defineStore('pokemon', () => {
  const pokemons: Ref<PokemonList[] | []> = ref([])
  const currentPokemon: Ref<Pokemon | null> = ref(null)
  const loading: Ref<Enum<{ success; error; loading }>> = ref('loading')

  const fetchAllPokemons = async () => {
    const route = `${BASE_URL}pokemon/`
    loading.value = 'loading'
    try {
      const pokemonsData: AxiosResponse<RESTfulList> = await axios.get(route)
      pokemons.value = pokemonsData.data.results
      loading.value = 'success'
    } catch (e) {
      const error = new AxiosError(e)
      console.error(error)
      loading.value = 'error'
      throw new Error(error)
    }
  }

  const fetchPokemon = async (id) => {
    const route = `${BASE_URL}pokemon/${id}`
    loading.value = 'loading'
    try {
      const pokemonsData: AxiosResponse<Pokemon> = await axios.get(route)
      currentPokemon.value = pokemonsData.data
      loading.value = 'success'
    } catch (e) {
      const error = new AxiosError(e)
      console.error(error)
      loading.value = 'error'
      throw new Error(error)
    }
  }

  return {
    pokemons,
    currentPokemon,
    loading,
    fetchAllPokemons,
    fetchPokemon,
  }
})
