// @vitest-environment jsdom
import { nextTick } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import { test, describe, expect, beforeEach, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { routes } from '../router'
import { createRouter, createWebHistory } from 'vue-router'

import PokemonList from './PokemonList.vue'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const mockPokemonList = {
  results: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    },
  ],
}

const toast = {
  addToast: vi.fn(),
}

const mountPokemonList = () =>
  mount(PokemonList, {
    global: {
      provide: {
        toast,
      },
      plugins: [
        router,
        createTestingPinia({
          createSpy: vi.fn,
          stubActions: false,
        }),
      ],
    },
  })

vi.mock('axios', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    default: {
      get: vi.fn(() =>
        Promise.resolve({
          data: mockPokemonList,
        }),
      ),
    },
    AxiosError: vi.fn(),
  }
})

describe('Pokemon List Vue Component', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia())
  })

  test('renders loading state initially', async () => {
    /* Following the 3 stages of a test for convention
    https://test-utils.vuejs.org/guide/essentials/a-crash-course.html#Arrange-Act-Assert 
    */

    // Step 1 : Arrange
    const wrapper = mountPokemonList()

    // Step 2 : Act
    const isLoadingVisible = await wrapper.get('[data-test="loading"]')
    const isListVisible = await wrapper.find('[data-test="list"]').exists()
    const isErrorVisible = await wrapper.find('[data-test="error"]').exists()

    // Step 3 : Assert
    expect(isLoadingVisible.isVisible()).toBe(true)
    expect(isListVisible).toBe(false)
    expect(isErrorVisible).toBe(false)
  })

  test('renders pokemons after loading', async () => {
    // Step 1 : Arrange
    const wrapper = mountPokemonList()

    // Step 2 : Act
    await nextTick()
    await nextTick()
    await nextTick()
    await nextTick()

    // Step 3 : Assert
    expect(wrapper.findAll('li')).toHaveLength(mockPokemonList.results.length)
  })
})
