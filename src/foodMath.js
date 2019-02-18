export function caloriesPer100g (ingredients, ingredientsById, maybeTotal = null) {
  const total = maybeTotal || sumIngredientCalories(ingredients)
  const exact = ingredients.reduce((memo, ingredient) => {
    if (ingredient.amount == null || ingredient.id == null) {
      return memo
    }
    else {
      return memo + (+ingredient.amount * ingredientsById[ingredient.id].calories / total)
    }
  }, 0)
  return (isNaN(exact) ? 0 : exact).toFixed(2)
}

export function sumIngredientCalories (ingredients) {
  return ingredients.reduce((memo, ingredient) => {
    return ingredient.amount == null ? memo : memo + +ingredient.amount
  }, 0)
}