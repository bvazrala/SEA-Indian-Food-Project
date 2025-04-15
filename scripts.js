// State management
let currentFilters = {
  veg: false,
  vegan: false,
  nonveg: false,
  nuts: false,
  dairy: false,
  gluten: false,
  breakfast: false,
  lunch: false,
  dinner: false
};

let currentSort = "name-asc";
let searchTerm = "";
let darkMode = false;

// DOM manipulation functions
function toggleTheme() {
  darkMode = !darkMode;
  document.body.classList.toggle('dark-theme', darkMode);
  const themeButton = document.getElementById('theme-toggle');
  themeButton.innerHTML = darkMode ? "☀️ Light Mode" : "🌙 Dark Mode";
}

function toggleFilterPanel() {
  const filterPanel = document.getElementById('filter-panel');
  filterPanel.classList.toggle('hidden');
}

function toggleFilter(type) {
  currentFilters[type] = !currentFilters[type];
  document.getElementById(`filter-${type}`).classList.toggle('active', currentFilters[type]);
  refreshDisplay();
}

function clearFilters() {
  for (const key in currentFilters) {
    currentFilters[key] = false;
    document.getElementById(`filter-${key}`).classList.remove('active');
  }
  refreshDisplay();
}

function updateSearch(value) {
  searchTerm = value.trim().toLowerCase();
  refreshDisplay();
}

function updateSort(value) {
  currentSort = value;
  refreshDisplay();
}

// Filter and sort functions
function applyFilters(item) {
  // If no filters are active, show all items
  if (!Object.values(currentFilters).some(value => value)) {
    return true;
  }

  // Dietary filters
  if (currentFilters.veg && !item.isVeg) return false;
  if (currentFilters.vegan && !item.isVegan) return false;
  if (currentFilters.nonveg && !item.isNonveg) return false;
  
  // Allergen filters (note: these filters show items WITHOUT the allergen)
  if (currentFilters.nuts && item.hasNuts) return false;
  if (currentFilters.dairy && item.hasDairy) return false;
  if (currentFilters.gluten && item.hasGluten) return false;
  
  // Meal type filters
  const breakfastFilter = currentFilters.breakfast && item.type.includes("Breakfast");
  const lunchFilter = currentFilters.lunch && item.type.includes("Lunch");
  const dinnerFilter = currentFilters.dinner && item.type.includes("Dinner");
  
  if (currentFilters.breakfast || currentFilters.lunch || currentFilters.dinner) {
    if (!(breakfastFilter || lunchFilter || dinnerFilter)) {
      return false;
    }
  }
  
  return true;
}

function applySearch(item) {
  if (!searchTerm) return true;
  return item.name.toLowerCase().includes(searchTerm);
}

function sortItems(itemsToSort) {
  const [property, direction] = currentSort.split('-');
  
  return itemsToSort.sort((a, b) => {
    let valueA, valueB;
    
    switch(property) {
      case 'name':
        valueA = a.name;
        valueB = b.name;
        break;
      case 'spice':
        valueA = a.spiceLevel;
        valueB = b.spiceLevel;
        break;
      case 'sweet':
        valueA = a.sweetLevel;
        valueB = b.sweetLevel;
        break;
      default:
        valueA = a.name;
        valueB = b.name;
    }
    
    if (direction === 'asc') {
      return valueA < valueB ? -1 : 1;
    } else {
      return valueA > valueB ? -1 : 1;
    }
  });
}

// Helper functions
function generateLevelIndicator(level, emoji) {
  let result = '';
  for (let i = 0; i < 10; i++) {
    if (i < level) {
      result += `<span class="level-filled">${emoji}</span>`;
    } else {
      result += `<span class="level-empty">○</span>`;
    }
  }
  return result;
}

function getDietaryText(item) {
  let dietary = [];
  if (item.isVeg) dietary.push("Vegetarian");
  if (item.isVegan) dietary.push("Vegan");
  if (item.isNonveg) dietary.push("Non-vegetarian");
  return dietary.join(", ");
}

function getAllergenText(item) {
  let allergens = [];
  if (item.hasNuts) allergens.push("Contains Nuts");
  if (item.hasDairy) allergens.push("Contains Dairy");
  if (item.hasGluten) allergens.push("Contains Gluten");
  return allergens.length ? allergens.join(", ") : "No common allergens";
}

// Display functions
function createFoodCard(item, index) {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.index = index;
  card.addEventListener('click', () => showCardDetail(item));
  
  card.innerHTML = `
    <div class="card-header">
      <h2 title="${item.name}">${item.name}</h2>
    </div>
    <div class="image-container">
      <img src="${item.image}" alt="${item.name}" onerror="this.src='./images/placeholder.jpg'">
      <div class="expand-icon" title="Click for more details">🔍</div>
    </div>
    <div class="card-info">
      <div class="info-row">
        <div class="dietary-icons">
          ${item.isVeg ? '<span title="Vegetarian">🥬</span>' : ''}
          ${item.isVegan ? '<span title="Vegan">🌱</span>' : ''}
          ${item.isNonveg ? '<span title="Non-vegetarian">🍖</span>' : ''}
        </div>
        <div class="allergen-icons">
          ${item.hasNuts ? '<span title="Contains Nuts">🥜</span>' : ''}
          ${item.hasDairy ? '<span title="Contains Dairy">🥛</span>' : ''}
          ${item.hasGluten ? '<span title="Contains Gluten">🌾</span>' : ''}
        </div>
      </div>
      <div class="info-row">
        <span class="meal-type">${item.type}</span>
      </div>
      <div class="level-container">
        <div class="info-row">
          <span class="spice-label">Spice:</span>
          <div class="level-slider">
            ${generateLevelIndicator(item.spiceLevel, '🌶️')}
          </div>
        </div>
      </div>
      <div class="level-container">
        <div class="info-row">
          <span class="sweet-label">Sweet:</span>
          <div class="level-slider">
            ${generateLevelIndicator(item.sweetLevel, '🍪')}
          </div>
        </div>
      </div>
    </div>
  `;
  
  return card;
}

function showCardDetail(item) {
  const detailContainer = document.getElementById('card-detail');
  const detailContent = document.getElementById('detail-inner-content');
  
  detailContent.innerHTML = `
    <div class="detail-header">
      <h2>${item.name}</h2>
      <p class="region-text">Region: ${item.region}</p>
    </div>
    
    <img src="${item.image}" alt="${item.name}" class="detail-image" onerror="this.src='./images/placeholder.jpg'">
    
    <div class="detail-grid">
      <div class="detail-item">
        <span class="label">Dietary Type</span>
        <span>${getDietaryText(item)}</span>
      </div>
      
      <div class="detail-item">
        <span class="label">Allergens</span>
        <span>${getAllergenText(item)}</span>
      </div>
      
      <div class="detail-item">
        <span class="label">Meal Type</span>
        <span>${item.type}</span>
      </div>
      
      <div class="detail-item">
        <span class="label">Region</span>
        <span>${item.region}</span>
      </div>
    </div>
    
    <div class="detail-section">
      <h3>Spice Level</h3>
      <div class="level-slider detail-level">
        ${generateLevelIndicator(item.spiceLevel, '🌶️')}
      </div>
    </div>
    
    <div class="detail-section">
      <h3>Sweetness Level</h3>
      <div class="level-slider detail-level">
        ${generateLevelIndicator(item.sweetLevel, '🍪')}
      </div>
    </div>
    
    <div class="detail-section">
      <h3>Description</h3>
      <p>${item.description}</p>
    </div>
    
    <div class="detail-section">
      <h3>Recipe</h3>
      <p>${item.recipe}</p>
    </div>
  `;
  
  detailContainer.style.display = 'flex';
}

function closeCardDetail() {
  document.getElementById('card-detail').style.display = 'none';
}

// Main display function
function refreshDisplay() {
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = '';
  
  // Filter and sort the data
  const filteredItems = foodItems
    .filter(item => applyFilters(item))
    .filter(item => applySearch(item));
  
  const sortedItems = sortItems([...filteredItems]);
  
  // Update count display
  document.getElementById('item-count').textContent = `Showing ${sortedItems.length} of ${foodItems.length} items`;
  
  // Create and append cards
  sortedItems.forEach((item, index) => {
    const card = createFoodCard(item, index);
    cardContainer.appendChild(card);
  });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  refreshDisplay();
  
  // Close detail view when clicking outside content
  const detailModal = document.getElementById('card-detail');
  detailModal.addEventListener('click', (e) => {
    if (e.target === detailModal) {
      closeCardDetail();
    }
  });
  
  // Add keyboard event listener to close the filter panel with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const filterPanel = document.getElementById('filter-panel');
      if (!filterPanel.classList.contains('hidden')) {
        toggleFilterPanel();
      }
      
      // Also close the detail view if it's open
      const detailView = document.getElementById('card-detail');
      if (detailView.style.display === 'flex') {
        closeCardDetail();
      }
    }
  });
});