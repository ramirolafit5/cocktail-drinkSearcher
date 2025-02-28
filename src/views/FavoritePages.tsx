import { useMemo } from "react"
import DrinkCard from "../components/DrinkCard"
import { useAppStore } from "../stores/useAppStore"

export default function FavoritePages() {

    const {favorites} = useAppStore()

    const hasFavorite = useMemo(() => favorites.length,[favorites])

    return (
        <>
            <h1 className="text-6xl font-extrabold">Favoritos</h1>
            {hasFavorite ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 my-10 gap-10">
                    {favorites.map(item => (
                        <DrinkCard
                            key={item.idDrink}
                            drink={item}
                        />
                    ))}
                </div>
            ) : (
                <p className="my-10 text-center text-2xl">
                    No hay favoritos seleccionados
                </p>
            )}
        </>
    )
}