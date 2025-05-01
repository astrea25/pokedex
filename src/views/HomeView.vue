<script setup>
import { ref, onMounted, computed } from 'vue'
import PokemonCard from '@/components/PokemonCard.vue'
import PokemonDetail from '@/components/PokemonDetail.vue'
import PokemonService from '@/services/PokemonService'

const pokemons = ref([])
const loading = ref(true)
const error = ref('')
const offset = ref(0)
const limit = ref(10)
const hasMore = ref(true)
const selectedPokemon = ref(null)
const showDetailModal = ref(false)
const searchQuery = ref('')
const sortBy = ref('id')
const sortOrder = ref('asc')

onMounted(async () => {
  await loadPokemons()
})

const loadPokemons = async () => {
  try {
    loading.value = true
    const response = await PokemonService.getPokemonList(limit.value, offset.value)

    const pokemonDetailsPromises = response.results.map(async (pokemon) => {
      return await PokemonService.getPokemon(pokemon.name)
    })

    const pokemonDetails = await Promise.all(pokemonDetailsPromises)
    pokemons.value = [...pokemons.value, ...pokemonDetails]

    offset.value += limit.value
    hasMore.value = !!response.next
    loading.value = false
  } catch (err) {
    console.error('Error loading Pokemon data:', err)
    error.value = 'Failed to load Pokemon data. Please try again.'
    loading.value = false
  }
}

const loadMore = async () => {
  if (hasMore.value && !loading.value) {
    await loadPokemons()
  }
}

const handlePokemonClick = (pokemon) => {
  selectedPokemon.value = pokemon
  showDetailModal.value = true
}

const closeDetailModal = () => {
  showDetailModal.value = false
  selectedPokemon.value = null
}

const handlePrevious = async (id) => {
  try {
    loading.value = true
    const pokemon = await PokemonService.getPokemon(id)
    selectedPokemon.value = pokemon
    loading.value = false
  } catch (err) {
    console.error('Error loading previous Pokemon:', err)
    loading.value = false
  }
}

const handleNext = async (id) => {
  try {
    loading.value = true
    const pokemon = await PokemonService.getPokemon(id)
    selectedPokemon.value = pokemon
    loading.value = false
  } catch (err) {
    console.error('Error loading next Pokemon:', err)
    loading.value = false
  }
}

const filteredAndSortedPokemons = computed(() => {
  let filtered = pokemons.value.filter((pokemon) => {
    const nameMatch = pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const idMatch = pokemon.id.toString().includes(searchQuery.value)
    return nameMatch || idMatch
  })

  filtered.sort((a, b) => {
    if (sortBy.value === 'id') {
      return sortOrder.value === 'asc' ? a.id - b.id : b.id - a.id
    } else {
      return sortOrder.value === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    }
  })

  return filtered
})

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

const changeSortField = (field) => {
  if (sortBy.value === field) {
    toggleSortOrder()
  } else {
    sortBy.value = field
    sortOrder.value = 'asc'
  }
}
</script>

<template>
  <div class="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-6">
    <h1 class="text-center text-[#ee6b2f] text-4xl font-bold mb-6">Pokédex</h1>

    <div class="flex flex-col md:flex-row justify-center items-center mb-8 gap-4">
      <div class="w-full max-w-2xl mx-auto md:mx-0">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name or ID"
          class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-md focus:outline-none focus:border-[#ee6b2f]"
        />
      </div>

      <div class="flex items-center gap-2 mt-2 md:mt-0">
        <span class="text-sm font-medium">Sort by:</span>
        <button
          @click="changeSortField('id')"
          class="px-3 py-1.5 rounded-full text-sm font-medium"
          :class="{
            'bg-[#ee6b2f] text-white': sortBy === 'id',
            'bg-gray-200 text-gray-700': sortBy !== 'id',
          }"
        >
          ID {{ sortBy === 'id' ? (sortOrder === 'asc' ? '↑' : '↓') : '' }}
        </button>
        <button
          @click="changeSortField('name')"
          class="px-3 py-1.5 rounded-full text-sm font-medium"
          :class="{
            'bg-[#ee6b2f] text-white': sortBy === 'name',
            'bg-gray-200 text-gray-700': sortBy !== 'name',
          }"
        >
          Name {{ sortBy === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : '' }}
        </button>
      </div>
    </div>

    <div v-if="error" class="text-center py-4 text-red-600">
      {{ error }}
    </div>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6"
    >
      <PokemonCard
        v-for="pokemon in filteredAndSortedPokemons"
        :key="pokemon.id"
        :pokemon="pokemon"
        @click="handlePokemonClick(pokemon)"
        class="h-full"
      />
      <div v-if="loading && pokemons.length === 0" class="col-span-full text-center py-8">
        Loading Pokémon...
      </div>
      <div
        v-if="!loading && filteredAndSortedPokemons.length === 0"
        class="col-span-full text-center py-8"
      >
        No Pokémon found matching your search.
      </div>
    </div>
    <div v-if="hasMore && !searchQuery" class="flex justify-center mt-8">
      <button
        @click="loadMore"
        class="px-6 py-2 bg-[#ee6b2f] hover:bg-[#d65b20] text-white font-medium rounded-full"
        :disabled="loading"
      >
        {{ loading ? 'Loading...' : 'Load More' }}
      </button>
    </div>

    <div
      v-if="showDetailModal && selectedPokemon"
      class="fixed inset-0 z-10 flex justify-center items-center"
    >
      <div class="absolute inset-0 bg-black/50 cursor-pointer" @click="closeDetailModal"></div>
      <div class="relative w-[90%] max-w-4xl max-h-[90vh] z-20">
        <button
          class="absolute -top-4 -right-4 w-8 h-8 bg-[#ee6b2f] text-white border-0 rounded-full text-xl cursor-pointer z-30 flex justify-center items-center shadow-md"
          @click="closeDetailModal"
        >
          ×
        </button>
        <div class="w-full max-h-[90vh] overflow-y-auto">
          <PokemonDetail :pokemon="selectedPokemon" @previous="handlePrevious" @next="handleNext" />
        </div>
      </div>
    </div>
  </div>
</template>
