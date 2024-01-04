import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { RESTfulList } from '../types/pokemon'

const BASE_URL = 'https://pokeapi.co/api/v2/'

// eslint-disable-next-line import/prefer-default-export
export const usePokemonStore = defineStore('pokemon', () => {
  const pokemons: Ref<
    {
      name: string
      url: string
    }[]
  > = ref([])

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

  return {
    pokemons,
    fetchAllPokemons,
  }
})
