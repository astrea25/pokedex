<script setup lang="ts">
import { computed } from 'vue'
import type { Pokemon } from '@/types/pokemon'
import { formatPokemonId, typeWeaknesses } from '@/types/pokemon'

const props = defineProps<{
  pokemon: Pokemon
}>()

const formattedId = computed(() => formatPokemonId(props.pokemon.id))
const capitalizedName = computed(() => {
  return props.pokemon.name.charAt(0).toUpperCase() + props.pokemon.name.slice(1)
})

const weaknesses = computed(() => {
  const allWeaknesses = new Set<string>()

  props.pokemon.types.forEach((typeInfo) => {
    const typeName = typeInfo.type.name
    const typeWeaknessList = typeWeaknesses[typeName] || []

    typeWeaknessList.forEach((weakness) => {
      allWeaknesses.add(weakness)
    })
  })

  return Array.from(allWeaknesses)
})

const getTypeColor = (type: string) => {
  const typeColors: Record<string, string> = {
    normal: '#A8A878',
    fighting: '#C03028',
    flying: '#A890F0',
    poison: '#A040A0',
    ground: '#E0C068',
    rock: '#B8A038',
    bug: '#A8B820',
    ghost: '#705898',
    steel: '#B8B8D0',
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    psychic: '#F85888',
    ice: '#98D8D8',
    dragon: '#7038F8',
    dark: '#705848',
    fairy: '#EE99AC',
    unknown: '#68A090',
    shadow: '#604E82',
  }

  return typeColors[type] || '#777777'
}

const emit = defineEmits(['previous', 'next'])

const navigateToPrevious = () => {
  if (props.pokemon.id > 1) {
    emit('previous', props.pokemon.id - 1)
  }
}

const navigateToNext = () => {
  emit('next', props.pokemon.id + 1)
}
</script>

<template>
  <div class="bg-white rounded-2xl p-5 max-w-4xl mx-auto shadow-md">
    <div class="flex justify-between items-center mb-5 border-b border-gray-100 pb-2.5">
      <h2 class="text-4xl m-0">{{ capitalizedName }}</h2>
      <p class="text-2xl text-gray-500 m-0">#{{ formattedId }}</p>
    </div>

    <div class="flex flex-wrap gap-5 md:flex-row">
      <div class="flex-1 min-w-[300px] flex justify-center items-center bg-gray-100 rounded-lg p-5">
        <img
          :src="`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formattedId}.png`"
          :alt="pokemon.name"
          class="max-w-full max-h-[300px]"
        />
      </div>

      <div class="flex-2 min-w-[300px]">
        <div class="mb-5">
          <h3 class="mt-0 mb-2.5 text-xl text-gray-800 border-b-2 border-gray-100 pb-1">Types</h3>
          <div class="flex flex-wrap gap-2.5">
            <span
              v-for="type in pokemon.types"
              :key="type.type.name"
              class="px-4 py-1 rounded-full text-sm text-white capitalize"
              :style="{ backgroundColor: getTypeColor(type.type.name) }"
            >
              {{ type.type.name }}
            </span>
          </div>
        </div>

        <div class="mb-5">
          <h3 class="mt-0 mb-2.5 text-xl text-gray-800 border-b-2 border-gray-100 pb-1">
            Weaknesses
          </h3>
          <div class="flex flex-wrap gap-2.5">
            <span
              v-for="weakness in weaknesses"
              :key="weakness"
              class="px-4 py-1 rounded-full text-sm text-white capitalize"
              :style="{ backgroundColor: getTypeColor(weakness) }"
            >
              {{ weakness }}
            </span>
          </div>
        </div>

        <div class="mb-5">
          <h3 class="mt-0 mb-2.5 text-xl text-gray-800 border-b-2 border-gray-100 pb-1">
            Physical Attributes
          </h3>
          <div class="flex gap-5">
            <div class="flex flex-col">
              <span class="text-sm text-gray-500">Height</span>
              <span class="text-lg font-semibold">{{ pokemon.height / 10 }} m</span>
            </div>
            <div class="flex flex-col">
              <span class="text-sm text-gray-500">Weight</span>
              <span class="text-lg font-semibold">{{ pokemon.weight / 10 }} kg</span>
            </div>
          </div>
        </div>

        <div class="mb-5">
          <h3 class="mt-0 mb-2.5 text-xl text-gray-800 border-b-2 border-gray-100 pb-1">Stats</h3>
          <div class="flex flex-col gap-2.5">
            <div
              v-for="stat in pokemon.stats"
              :key="stat.stat.name"
              class="flex items-center gap-2.5"
            >
              <span class="w-[100px] capitalize text-sm">{{ stat.stat.name }}</span>
              <div class="h-2.5 flex-grow bg-gray-100 rounded overflow-hidden">
                <div
                  class="h-full rounded"
                  :style="{
                    width: `${Math.min(stat.base_stat, 100)}%`,
                    backgroundColor: stat.base_stat > 50 ? '#78C850' : '#FF5959',
                  }"
                ></div>
              </div>
              <span class="w-[30px] text-right font-semibold text-sm">{{ stat.base_stat }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-between mt-5 pt-5 border-t border-gray-100">
      <button
        @click="navigateToPrevious"
        class="px-5 py-2.5 bg-[#ee6b2f] hover:bg-[#d65b20] text-white border-0 rounded cursor-pointer font-semibold transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        :disabled="pokemon.id <= 1"
      >
        Previous
      </button>
      <button
        @click="navigateToNext"
        class="px-5 py-2.5 bg-[#ee6b2f] hover:bg-[#d65b20] text-white border-0 rounded cursor-pointer font-semibold transition-colors"
      >
        Next
      </button>
    </div>
  </div>
</template>
