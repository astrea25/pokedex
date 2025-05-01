import axios from 'axios';
import type { Pokemon, PokemonListResponse } from '@/types/pokemon';

const API_URL = 'https://pokeapi.co/api/v2';

export default {
  async getPokemonList(limit = 10, offset = 0): Promise<PokemonListResponse> {
    const response = await axios.get(`${API_URL}/pokemon`, {
      params: { limit, offset }
    });
    return response.data;
  },

  async getPokemon(idOrName: string | number): Promise<Pokemon> {
    const response = await axios.get(`${API_URL}/pokemon/${idOrName}`);
    return response.data;
  },

  getPokemonImageUrl(id: number): string {
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id.toString().padStart(3, '0')}.png`;
  }
}; 