# Pokédex

A modern Pokédex web application built with Vue 3, TypeScript, and Tailwind CSS. This application allows users to browse, search, and view detailed information about Pokémon.

## Features

- **Pokémon Browsing**: View a grid of Pokémon cards with basic information
- **Detailed Information**: Click on any Pokémon to see detailed stats, types, and weaknesses
- **Search Functionality**: Search for Pokémon by name
- **Sorting Options**: Sort Pokémon by ID or name
- **Responsive Design**: Works on desktop and mobile devices
- **Pagination**: Load more Pokémon when the button is clicked
- **Navigation**: Navigate between Pokémon in the detail view

## Project Setup

```sh
# Install dependencies
npm install

# Compile and hot-reload for development
npm run dev
```

## Usage

1. Start the development server with `npm run dev`
2. Open your browser and navigate to the local server address (typically http://localhost:5173/)
3. Browse the Pokémon grid, use the search bar to find specific Pokémon, or use the sorting options
4. Click on any Pokémon card to view detailed information
5. In the detail view, use the navigation buttons to move between Pokémon

## API Information

This project uses the 
[PokéAPI](https://pokeapi.co/) - a free, comprehensive RESTful API for Pokémon data. The application fetches:
- Basic Pokémon list data
- Detailed information for each Pokémon

[PokemonGo Type Chart](https://www.eurogamer.net/pokemon-go-type-chart-effectiveness-weaknesses) - an article about Pokemon type effectiveness and weaknesses.


## License

This project is for educational purposes only. Pokémon and Pokémon character names are trademarks of Nintendo.
