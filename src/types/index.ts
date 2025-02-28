import { z } from "zod";
import { CategoriesAPIResponseSchema, DrinkAPISingleResponse, DrinksAPIPluralResponse, RecipeAPIResponseSchema, SearchFilterSchema } from "../schemas/recipes-schema";

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>

export type SearchFilter = z.infer<typeof SearchFilterSchema>

export type Drinks = z.infer<typeof DrinksAPIPluralResponse>

export type Drink = z.infer<typeof DrinkAPISingleResponse>

export type Recipe = z.infer<typeof RecipeAPIResponseSchema>