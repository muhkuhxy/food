import { normalize, schema } from 'normalizr'

test('normalize', () => {
  let recipes = [
    {
      id: 0,
      name: 'krautfleckerl',
      ingredients: [
        {
          id: 0,
          name: 'butterfett',
          amount: 10.2,
          calories: 880
        },
        {
          id: 1,
          name: 'weißkohl',
          amount: 80,
          calories: 20
        }
      ]
    }
  ]

  let ingredientSchema = new schema.Entity('ingredients')
  let recipeSchema = new schema.Entity('recipes', {
    ingredients: [ingredientSchema]
  }, {
    processStrategy: (recipe) => {
      let result = Object.assign({}, recipe)
      result.amounts = {}
      result.ingredients.forEach((ingredient) => {
        result.amounts[ingredient.id] = ingredient.amount
        delete ingredient.amount
      })
      return result
    }
  })

  expect(normalize(recipes, [recipeSchema])).toEqual({
    result: [0],
    entities: {
      ingredients: {
        0: {
          id: 0,
          name: 'butterfett',
          calories: 880
        },
        1: {
          id: 1,
          name: 'weißkohl',
          calories: 20
        }
      },
      recipes: {
        0: {
          id: 0,
          name: 'krautfleckerl',
          ingredients: [ 0, 1 ],
          amounts: {
            0: 10.2,
            1: 80
          }
        }
      }
    }
  })
})