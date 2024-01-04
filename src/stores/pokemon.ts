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

  const fetchAllPokemons = async () => {
    const route = `${BASE_URL}pokemon/`
    try {
      const pokemonsData: AxiosResponse<RESTfulList> = await axios.get(route)
      pokemons.value = pokemonsData.data.results
    } catch (e) {
      const error = new AxiosError(e)
      console.error(error)
    }
  }

  const fetchPokemon = async (id) => {
    const route = `${BASE_URL}pokemon/${id}`
    try {
      const pokemonsData: AxiosResponse<Pokemon> = await axios.get(route)
      currentPokemon.value = pokemonsData.data
    } catch (e) {
      const error = new AxiosError(e)
      console.error(error)
    }
  }

  return {
    pokemons,
    currentPokemon,
    fetchAllPokemons,
    fetchPokemon,
  }
})
