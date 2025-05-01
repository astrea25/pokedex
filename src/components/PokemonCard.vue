<script setup>
import { computed } from 'vue'
import { formatPokemonId } from '@/types/pokemon'

const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
})

const formattedId = computed(() => formatPokemonId(props.pokemon.id))
const capitalizedName = computed(() => {
  return props.pokemon.name.charAt(0).toUpperCase() + props.pokemon.name.slice(1)
})

const getTypeColor = (type) => {
  const typeColors = {
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
</script>

<template>
  <div
    class="bg-white rounded shadow hover:shadow-md cursor-pointer h-full flex flex-col overflow-hidden transition-shadow duration-200"
    @click="$emit('click')"
  >
    <div class="bg-gray-100 p-4 flex justify-center items-center min-h-[160px]">
      <img
        :src="`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formattedId}.png`"
        :alt="pokemon.name"
        class="w-[125px] h-[125px] object-contain"
      />
    </div>
    <div class="p-3">
      <p class="text-gray-500 text-sm m-0 mb-0.5">#{{ formattedId }}</p>
      <h3 class="my-0.5 mb-2.5 text-lg font-semibold">{{ capitalizedName }}</h3>
      <div class="flex gap-1 flex-wrap">
        <span
          v-for="type in pokemon.types"
          :key="type.type.name"
          class="px-2.5 py-0.5 rounded-full text-xs text-white capitalize"
          :style="{ backgroundColor: getTypeColor(type.type.name) }"
        >
          {{ type.type.name }}
        </span>
      </div>
    </div>
  </div>
</template>
