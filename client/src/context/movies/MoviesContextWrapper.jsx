
import { useContext, useEffect, useState } from "react";
import { initialMoviesContext } from "./initialMoviesContext";
import { MoviesContext } from "./MoviesContext";
import { UserContext } from "../user/UserContext";

export function MoviesContextWrapper(props) {
    const [movies, setMovies] = useState(initialMoviesContext.movies);

    const { isLoggedIn } = useContext(UserContext);

    useEffect(() => {
        let apiUrl = 'http://localhost:5434/api/public/movies';

        if (isLoggedIn) {
            apiUrl = 'http://localhost:5434/api/admin/movies';
        }

        fetch(apiUrl, {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    setList(data.list);
                }
            })
            .catch(console.error);
    }, [isLoggedIn]);

    function setList(data) {
        setMovies(() => data);
    }

    function create() {
    }

    function edit() {
    }

    function remove() {
    }

    const value = {
        movies,
        setList,
        create,
        edit,
        remove,
    };

    return (
        <MoviesContext.Provider value={value}>
            {props.children}
        </MoviesContext.Provider>
    );
}
