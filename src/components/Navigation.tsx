import { Link } from "react-router-dom"

export const Navigation = () => {
    return (
        <nav className="flex justify-between items-center h-[50px] px-5 shadow-md bg-sky-900 text-slate-50">
            <h3 className="font-bold">GitHub Search </h3>
            <span>
                <Link to='/' className="mr-4">Home</Link>
                <Link to='/favourites'>Favourites</Link>
            </span>
        </nav>
    )
}

