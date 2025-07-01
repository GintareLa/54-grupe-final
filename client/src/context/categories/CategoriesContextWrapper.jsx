
import { useContext, useEffect, useState } from "react";
import { initialCategoriesContext } from "./initialCategoriesContext";
import { CategoriesContext } from "./CategoriesContext";
import { UserContext } from "../user/UserContext";

export function CategoriesContextWrapper(props) {
    const [categories, setCategories] = useState(initialCategoriesContext.categories);
    const [featuredCategories, setFeaturedCategories] = useState(initialCategoriesContext.featuredCategories);

    const { isLoggedIn } = useContext(UserContext);

    useEffect(() => {
        let apiUrl = 'http://localhost:5434/api/public/categories';

        if (isLoggedIn) {
            apiUrl = 'http://localhost:5434/api/admin/categories';
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

    useEffect(() => {
        fetch('http://localhost:5434/api/public/categories/featured', {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    setFeaturedList(data.list);
                }
            })
            .catch(console.error);
    }, []);

    function setList(data) {
        setCategories(() => data);
    }

    function create() {
    }

    function edit() {
    }

    function remove() {
    }

    function setFeaturedList(data) {
        setFeaturedCategories(() => data);
    }

    const value = {
        categories,
        featuredCategories,
        setList,
        create,
        edit,
        remove,
        setFeaturedList,
    };

    return (
        <CategoriesContext.Provider value={value}>
            {props.children}
        </CategoriesContext.Provider>
    );
}
