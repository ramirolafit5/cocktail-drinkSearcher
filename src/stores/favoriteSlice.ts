import { StateCreator } from "zustand";
import { Recipe } from "../types";

type Notification = {
    text: string,
    error: boolean,
    show: boolean
}

export type FavoritesSliceType = {
    favorites: Recipe[]
    handleClickFavorite: (recipe: Recipe) => void
    favoriteExist: (id: Recipe['idDrink']) => boolean
    loadFromStorage: () => void
    notification: Notification
    showNotification: (payload: Pick<Notification, 'text' | 'error'>) => void
    hideNotification: () => void
}

export const createFavoritesSlice: StateCreator<FavoritesSliceType> = (set, get) => ({
    favorites: [],
    handleClickFavorite: (recipe) => {

        if(get().favoriteExist(recipe.idDrink)){
            set({
                favorites: [...get().favorites.filter(item => item.idDrink !== recipe.idDrink)]
            })

            get().showNotification({text: 'Se elimino de favoritos', error: true})

        } else {
            set({
                favorites: [...get().favorites, recipe]
            })
            
            /* ESTO ES LO MISMO QUE LA DE ARRIBA PERO ES UNA ALTERNATIVA
             set((state) => ({
                favorites: [...state.favorites, recipe]
            })) */

            get().showNotification({text: 'Se agrego a favoritos', error: false})

        }
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },
    favoriteExist: (id) => {
        return (get().favorites.some(favorite => favorite.idDrink === id))
    },
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites')
        if (storedFavorites) {
            favorites: JSON.parse(storedFavorites)
        }
    },
    notification: {
        text: '',
        error: false,
        show: false
    },
    showNotification: (payload) => { 
        set({
            notification: {
                text: payload.text,
                error: payload.error,
                show: true
            }
        })
        setTimeout(() => {
            get().hideNotification()
        }, 3000);
    },
    hideNotification: () => {
        set({
            notification: {
                text: '',
                error: false,
                show: false
            }
        })
    }
})