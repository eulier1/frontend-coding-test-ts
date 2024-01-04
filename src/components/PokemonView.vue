<template>
  <div>
    <div v-if="currentPokemon" class="bg-white">
      <div class="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            class="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li
              v-for="breadcrumb in breadcrumbs"
              v-bind:key="`breadcrumb-${breadcrumb.id}`"
            >
              <div class="flex items-center">
                <router-link
                  v-bind:to="breadcrumb.href"
                  class="mr-2 text-sm font-medium text-gray-900"
                  >{{ breadcrumb.name }}</router-link
                >
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  aria-hidden="true"
                  class="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>
            <li class="text-sm">
              <span
                aria-current="page"
                class="font-medium text-gray-500 hover:text-gray-600"
              >
                {{ currentPokemon.name.toUpperCase().split('')[0]
                }}{{ currentPokemon.name.slice(1) }}</span
              >
            </li>
          </ol>
        </nav>

        <!-- Image -->
        <div class="mx-auto mt-6 max-w-2xl sm:px-6">
          <div
            class="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-4 sm:overflow-hidden sm:rounded-lg"
          >
            <img
              v-bind:src="currentPokemon.sprites.front_default"
              v-bind:alt="`Front Image Default ${currentPokemon.name}`"
              class="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        <!-- Stats info -->
        <div
          class="mx-auto max-w-2xl px-4 pt-10 sm:px-6 lg:grid lg:max-w-2xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16"
        >
          <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1
              class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
            >
              {{ currentPokemon.name.toUpperCase().split('')[0]
              }}{{ currentPokemon.name.slice(1) }}
            </h1>
          </div>
          <!-- Stats -->
          <div
            class="mt-4 lg:row-span-2 lg:mt-0"
            v-for="(stat, index) in currentPokemon.stats"
            :key="`stat-${index}`"
          >
            <div
              v-if="index === 0"
              class="w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700"
            >
              <div
                class="h-6 bg-lime-800 rounded-full dark:bg-lime-800 text-slate-100"
              >
                {{ stat.base_stat }} HP
              </div>
            </div>

            <dl class="pt-2">
              <div v-if="index >= 1" class="flex flex-col min-w-0 flex-auto">
                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                  {{ stat.stat.name }}
                </dt>
                <dd class="text-lg font-semibold">{{ stat.base_stat }}</dd>
              </div>
            </dl>
          </div>
        </div>

        <!-- Types -->

        <div class="flex flex-wrap pt-4 pb-16 px-6">
          <div
            v-for="(type, index) in currentPokemon.types"
            v-bind:key="`type-${index}`"
          >
            <span
              class="w-1/4 bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300"
              >{{ type.type.name }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <div v-else>Loading</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { usePokemonStore } from '../stores/pokemon'

const { currentPokemon } = storeToRefs(usePokemonStore())
const pokemonStore = usePokemonStore()

const props = defineProps({ id: { type: String } })

onMounted(async () => {
  await pokemonStore.fetchPokemon(props.id)
})

const breadcrumbs = [{ id: 1, name: 'Pokemons', href: '/pokemons' }]

const product = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  href: '#',
  breadcrumbs: [{ id: 1, name: 'Pokemons', href: '/pokemons' }],
  images: [
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.',
    },
  ],
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
  ],
  sizes: [
    { name: 'XXS', inStock: false },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: '2XL', inStock: true },
    { name: '3XL', inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }

const selectedColor = ref(product.colors[0])
const selectedSize = ref(product.sizes[2])
</script>
