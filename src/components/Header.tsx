import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {

    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    })

    const { pathname } = useLocation()

    const isHome = useMemo(() => pathname === "/", [pathname])

    const { fetchCategories, categories, searchRecipes, showNotification } = useAppStore()

    useEffect(() => {
        fetchCategories()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //validar
        if (Object.values(searchFilters).includes('')) {
            showNotification({ text: 'Todos los campos son obligatorios', error: true })
            return
        }

        //consultar las recetas
        searchRecipes(searchFilters)

    }


    return (
        <header
            className={isHome ? 'bg-center bg-cover' : 'bg-slate-800'}
            style={isHome ? { backgroundImage: "url('/bg.jpg')" } : {}}
        >
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div className="flex justify-between items-center">
                        <img className="w-32" src="/logo.svg" alt="logotipo" />
                    </div>

                    <nav className="flex gap-4">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "text-orange-500 uppercase font-bold" : "text-white uppercase font-bold"}
                        >Inicio</NavLink>

                        <NavLink
                            to="/favoritos"
                            className={({ isActive }) =>
                                isActive ? "text-orange-500 uppercase font-bold" : "text-white uppercase font-bold"}
                        >Favoritos</NavLink>
                    </nav>
                </div>

                {isHome && (
                    <form
                        className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-15 p-5 rounded-lg shadow space-y-6"
                        onSubmit={handleSubmit}
                    >

                        <div className="space-y-4">
                            <label
                                htmlFor="ingredient"
                                className="block text-white uppercase font-extrabold text-lg"
                            >Nombre o Ingrediente</label>

                            <input
                                id="ingredient"
                                type="text"
                                name="ingredient"
                                className="p-3 w-full rounded-lg focus:outline-none border bg-white text-black"
                                placeholder="Nombre o Ingrediente. Ej: Vodka, Tequila o Cafe"
                                onChange={handleChange}
                                value={searchFilters.ingredient}
                            />
                        </div>

                        <div className="space-y-4">
                            <label
                                htmlFor="category"
                                className="block text-white uppercase font-extrabold text-lg"
                            >Categoria</label>

                            <select
                                id="category"
                                name="category"
                                className="p-3 w-full rounded-lg focus:outline-none border bg-white text-black"
                                onChange={handleChange}
                                value={searchFilters.category}
                            >
                                <option value=""> -- Seleccione -- </option>
                                {categories.drinks.map(cat => (
                                    <option
                                        key={cat.strCategory}
                                        value={cat.strCategory}
                                    >{cat.strCategory}</option>
                                ))}

                            </select>
                        </div>

                        <input
                            type="submit"
                            value="Buscar recetas"
                            className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase"
                        />
                    </form>
                )}

            </div>
        </header>
    )
}
