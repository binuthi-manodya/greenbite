const recipes = [
  {
    id:1,
    title:"Avocado Salad",
    ingredients:["1 Avocado","1 cup cherry tomatoes","2 cups mixed greens","Olive oil","Salt & Pepper"],
    steps:["Cut avocado into cubes","Mix with tomatoes and greens","Drizzle olive oil","Season with salt & pepper","Serve fresh"],
    nutrition:[{nutrient:"Calories",amount:"250 kcal"},{nutrient:"Protein",amount:"5g"},{nutrient:"Fat",amount:"20g"}]
  },
  {
    id:2,
    title:"Quinoa Bowl",
    ingredients:["1 cup cooked quinoa","1/2 cup black beans","1/2 cup corn","Avocado","Lime"],
    steps:["Cook quinoa","Mix all ingredients","Top with avocado","Squeeze lime juice","Serve chilled"],
    nutrition:[{nutrient:"Calories",amount:"300 kcal"},{nutrient:"Protein",amount:"8g"},{nutrient:"Fiber",amount:"7g"}]
  },
  {id:3,title:"Smoothie Bowl",ingredients:["1 banana","1/2 cup berries","1/2 cup yogurt"],steps:["Blend all ingredients","Pour into bowl","Top with fruits"],nutrition:[{nutrient:"Calories",amount:"200 kcal"}]},
  {id:4,title:"Grilled Veggies",ingredients:["Zucchini","Bell peppers","Olive oil","Salt"],steps:["Slice veggies","Brush with oil","Grill 5-10 min","Serve warm"],nutrition:[{nutrient:"Calories",amount:"150 kcal"}]},
  {id:5,title:"Chickpea Curry",ingredients:["1 cup chickpeas","Tomato sauce","Onion","Garlic","Spices"],steps:["Cook onion & garlic","Add chickpeas & sauce","Simmer 20 min","Serve with rice"],nutrition:[{nutrient:"Calories",amount:"350 kcal"}]},
  {id:6,title:"Grain Salad",ingredients:["1 cup mixed grains","Cherry tomatoes","Cucumber","Feta cheese"],steps:["Cook grains","Mix with veggies","Add feta","Serve chilled"],nutrition:[{nutrient:"Calories",amount:"280 kcal"}]},
  {id:7,title:"Veggie Wrap",ingredients:["Tortilla","Lettuce","Tomato","Hummus"],steps:["Spread hummus on tortilla","Add veggies","Roll tightly","Slice and serve"],nutrition:[{nutrient:"Calories",amount:"220 kcal"}]},
  {id:8,title:"Lentil Soup",ingredients:["1 cup lentils","Carrots","Onion","Spices"],steps:["Cook lentils","Add veggies","Simmer 30 min","Serve hot"],nutrition:[{nutrient:"Calories",amount:"180 kcal"}]},
  {id:9,title:"Fruit Parfait",ingredients:["Yogurt","Granola","Berries"],steps:["Layer yogurt, granola, berries","Repeat","Serve chilled"],nutrition:[{nutrient:"Calories",amount:"250 kcal"}]},
  {id:10,title:"Oatmeal Bowl",ingredients:["1/2 cup oats","Milk","Banana","Honey"],steps:["Cook oats with milk","Top with banana & honey","Serve warm"],nutrition:[{nutrient:"Calories",amount:"210 kcal"}]},
  {id:11,title:"Veggie Stir Fry",ingredients:["Broccoli","Carrots","Bell peppers","Soy sauce"],steps:["Heat oil","Add veggies","Stir fry 5-7 min","Serve hot"],nutrition:[{nutrient:"Calories",amount:"190 kcal"}]},
  {id:12,title:"Berry Smoothie",ingredients:["1 cup mixed berries","1/2 cup yogurt","Honey"],steps:["Blend all ingredients","Pour into glass","Serve immediately"],nutrition:[{nutrient:"Calories",amount:"160 kcal"}]},
];

const modal = document.getElementById('recipe-modal');
const modalTitle = document.getElementById('modal-title');
const modalIngredients = document.getElementById('modal-ingredients');
const modalSteps = document.getElementById('modal-steps');
const modalNutrition = document.getElementById('modal-nutrition').querySelector('tbody');
const closeBtn = modal.querySelector('.close');

document.querySelectorAll('.recipe-card').forEach(card => {
  const btn = card.querySelector('.btn-outline');
  if(btn){
    btn.addEventListener('click', e=>{
      e.preventDefault();
      const id = parseInt(card.dataset.id);
      const recipe = recipes.find(r=>r.id===id);
      if(!recipe) return alert('Recipe data not found');
      
      modalTitle.textContent = recipe.title || 'No title';
      modalIngredients.innerHTML = recipe.ingredients.map(i=>`<li>${i}</li>`).join('');
      modalSteps.innerHTML = recipe.steps.map(s=>`<li>${s}</li>`).join('');
      modalNutrition.innerHTML = recipe.nutrition.map(n=>`<tr><td>${n.nutrient}</td><td>${n.amount}</td></tr>`).join('');
      
      modal.style.display = 'block';
    });
  }
});

closeBtn.addEventListener('click', ()=>{ modal.style.display = 'none'; });
window.addEventListener('click', e=>{ if(e.target===modal) modal.style.display='none'; });
