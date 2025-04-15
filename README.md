# Snap Engineering Academy (SEA) Data Catalog Project: Indian Food
# LIVE site: https://bvazrala.github.io/SEA-Indian-Food-Project/

## Project Overview
This web-based Indian Food Catalog showcases popular Indian dishes with their properties and recipes. The application allows users to browse, search, filter, and sort a comprehensive collection of Indian cuisine.

## Features

- **Responsive Display**: Interactive card-based layout showing 25 different Indian foods
- **Dynamic Filtering System**: Filter foods by:
  - Dietary preferences (Vegetarian, Vegan, Non-vegetarian)
  - Allergen-free options (No Nuts, No Dairy, No Gluten)
  - Meal types (Breakfast, Lunch, Dinner)
- **Sorting Capabilities**: Sort foods by:
  - Name (A-Z or Z-A)
  - Spice level (Low to High or High to Low)
  - Sweetness level (Low to High or High to Low)
- **Search Functionality**: Quickly find specific dishes using the search bar
- **Dark/Light Mode**: Toggle between dark and light themes for comfortable viewing
- **Detailed Information**: Each food card displays:
  - Food name and image
  - Meal type
  - Dietary information (vegetarian, vegan, non-vegetarian)
  - Allergen indicators (nuts, dairy, gluten)
  - Visual spice level indicator
  - Visual sweetness level indicator
- **Expandable Details**: Click on any card to see detailed information including:
  - Food description
  - Region of origin
  - Full recipe
  - Comprehensive dietary and allergen information

## Project Structure

```
Indian-Food-Catalog/
│
├── index.html          # Main HTML structure
├── style.css           # Styling for the application
├── food.js             # Database of food items and their properties
├── scripts.js          # Core functionality (filtering, sorting, display)
└── images/             # Food images directory
    ├── aloo_gobi.jpg
    ├── biryani.jpg
    └── ...
```

## How It Works

1. **Data Management**: Food items are stored as objects in an array with properties including name, region, spice level, dietary information, etc.
2. **Dynamic Rendering**: JavaScript creates cards for each food item based on current filters and sorting criteria
3. **User Interaction**: 
   - Filter panel allows users to refine what's displayed
   - Sort dropdown changes the order of displayed items
   - Search functionality filters based on food names
   - Dark/light mode toggle changes the color scheme
4. **Responsive Design**: Adapts to different screen sizes with a responsive grid layout

## Technologies Used

- **HTML5**: Semantic structure and content
- **CSS3**: Styling, animations, and responsive design
  - CSS Grid for card layout
  - CSS Variables for theming
  - Flexbox for internal card structure
  - Media queries for responsiveness
- **JavaScript (ES6+)**: Core functionality
  - DOM manipulation
  - Event handling
  - Array methods for filtering and sorting
  - Template literals for dynamic HTML generation
- **Pictures from**: Wikimedia Commons and Unsplash

## Why It Matters

This catalog serves as an informative resource for people interested in Indian cuisine, addressing several important needs:

1. **Dietary Accessibility**: Clearly identifies vegetarian, vegan, and allergen-free options, making Indian cuisine more accessible to people with dietary restrictions
2. **Culinary Education**: Provides detailed information about regional dishes, spice levels, and traditional preparations
3. **Cultural Appreciation**: Showcases the diversity and richness of Indian cuisine
4. **Practical Utility**: Offers recipes and visual indicators that help users discover foods that match their preferences

The project demonstrates effective implementation of modern web development practices with a focus on user experience, accessibility, and responsive design.
