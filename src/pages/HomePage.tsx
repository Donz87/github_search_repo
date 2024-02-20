import { useSearchUsersQuery, useLazyGetUserReposQuery } from "../store/github/github.api";
import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/debounce";
import { RepoCard } from "../components/RepoCard";


export const HomePage = () => {
    const [search, setSearch] = useState('');
    const [dropdown, setDropdown] = useState(false)

    const debounced =  useDebounce(search)
    const {isLoading, isError, data} = useSearchUsersQuery(debounced, {
        skip: debounced.length < 3,
        refetchOnFocus: true
    });

    const [fetchRepos, {isLoading: areRepoLoading, data: repos }] = useLazyGetUserReposQuery()
    
    useEffect(() => {
        setDropdown(debounced.length > 3 && data?.length! > 0)
    }, [debounced, data])

    const clickHandler = (username:string) => {
        fetchRepos(username);
        setDropdown(false)
    }
    return (
        <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
            {isError && <p className="text-center text-red-700">Something went wrong...</p>}
            <div className="relative w-[560px]">
                <input 
                    type="text" 
                    name="search" 
                    id="search"
                    className="border py-2 px-4 w-full h-[42px] mb-2" 
                    placeholder="Search for GitHub username..."
                    value={search}
                    onChange={ e => setSearch(e.target.value)}
                />
                {dropdown && <ul className="absolute top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white overflow-y-scroll" >
                    {isLoading && <p className="text-center">Loading...</p>}
                    {data?.map(user => (
                        <li key={user.id} 
                            className="py-2 px-4 hover:bg-gray-500  hover:text-white transition-colors cursor-pointer"
                            onClick={() => clickHandler(user.login)}
                        >
                            {user.login}
                        </li>
                    ))}
                </ul>}
                <div className="container">
                {areRepoLoading && <p className="text-center">Repos are loading...</p>}
                {repos?.map(repo => <RepoCard repo={repo}/>)}
                </div>
            </div>

        </div>
    )
}