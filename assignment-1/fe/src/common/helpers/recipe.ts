import { handleImageDomain } from './image'

export const normalizeRecipe = (
  item: Models.RecipeReponseType,
  included?: Types.IncludedData[]
): Models.RecipeModel => {
  const recipeImages = (included?.filter((item) => item.type === 'image') as Types.GeneralType[]) || []
  const recipeSteps = (included?.filter((item) => item.type === 'recipe_step') as Types.GeneralType[]) || []
  const recipeIngredients = (included?.filter((item) => item.type === 'recipe_ingredient') as Types.GeneralType[]) || []

  const model = {
    tipAndPoints: item.attributes.tips,
    isProducerRecipe: Boolean(item.attributes.user?.is_vendor),
    isVendor: Boolean(item.attributes.user?.is_vendor),
    recipeName: item.attributes.title,
    recipeId: item.id,
    introduce: item.attributes.description,
    recipeSteps: getRecipeSteps(item.relationships.recipe_steps.data, recipeSteps),
    tags: item.attributes.tag_list,
    amountPeople: item.attributes.amount_people,
    minutes: item.attributes.minutes,
    menuId: item.relationships.menu.data.id,
    subMenuIds: item.relationships.recipe_sub_menus.data.map((e) => e.id),
    mainImageUrl: handleImageDomain(item.attributes.thumbnail),
    materials: getRecipeMaterials(item.relationships.recipe_ingredients.data, recipeIngredients),
    userId: item.attributes.user.id,
    userName: item.attributes.user.name,
    userAvatar: item.attributes.user.avatar_image_url,
    userDescription: item.attributes.user.description,
    userFollowerCount: item.attributes.user.follower,
    userFollowingCount: item.attributes.user.following_count,
    favorite: item.attributes.is_follow,
    isFollowUser: Boolean(item.attributes.user?.is_follow),
    ...getRecipeImageInfo(item.relationships.images.data, recipeImages),
  } as Models.RecipeModel
  return model
}

const getRecipeImageInfo = (
  imageMetadatas: Types.GeneralType[],
  recipeImages: Types.GeneralType[]
): Models.RecipeModel => {
  if (!imageMetadatas?.length) {
    return null
  }
  const obj = {
    producerTaggings: [],
  } as Models.RecipeModel

  imageMetadatas.map((item) => {
    const imageMapping = recipeImages.find((img) => img.id === item.id)
    if (!imageMapping) return

    if (!obj.producerTaggings.some((item) => item.id == imageMapping.attributes.position)) {
      obj.producerTaggings.push({
        id: imageMapping.id,
        imageUrl: handleImageDomain(imageMapping.attributes.original_url || ''),
        productId: imageMapping.attributes.public_metadata.product_id,
        producerId: imageMapping.attributes.public_metadata.vendor_id,
      })
    }
  })
  return obj
}

const getRecipeSteps = (
  stepMetadatas: Types.GeneralType[],
  recipeTags: Types.GeneralType[]
): Models.RecipeMakingStep[] => {
  if (!stepMetadatas?.length) {
    return []
  }
  return stepMetadatas
    .map((item) => {
      const itemMapping = recipeTags.find((tag) => tag.id === item.id)
      return itemMapping
        ? ({
            step: itemMapping.attributes.step,
            description: itemMapping.attributes.description,
            images: itemMapping.attributes.images.map((image) => ({
              ...image,
              url: handleImageDomain(image.url ?? ''),
            })),
            stepId: itemMapping.id,
          } as Models.RecipeMakingStep)
        : null
    })
    .sort((a, b) => +a?.step - +b?.step)
}

const getRecipeMaterials = (
  ingredientMetadatas: Types.GeneralType[],
  recipeTags: Types.GeneralType[]
): Models.RecipeIngredient[] => {
  if (!ingredientMetadatas?.length) {
    return []
  }
  return ingredientMetadatas.map((item) => {
    const itemMapping = recipeTags.find((tag) => tag.id === item.id)
    return itemMapping
      ? ({
          name: itemMapping.attributes.name,
          quantity: itemMapping.attributes.quantity,
          id: +itemMapping.id,
        } as Models.RecipeIngredient)
      : null
  })
}

export const getProductIds = (included?: Types.IncludedData[]) => {
  const images = included.filter((e) => e.type === 'image')

  const productIdsSet = images.reduce((productIds, image) => {
    productIds.add(image.attributes.public_metadata?.product_id)
    return productIds
  }, new Set())
  return Array.from(productIdsSet)
}
