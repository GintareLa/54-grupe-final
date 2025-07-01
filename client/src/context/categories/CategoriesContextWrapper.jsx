
import { useContext, useEffect, useState } from "react";
import { initialCategoriesContext } from "./initialCategoriesContext";
import { CategoriesContext } from "./CategoriesContext";
import { UserContext } from "../user/UserContext";

export function CategoriesContextWrapper(props) {
    const [publicCategories, setPublicCategories] = useState(initialCategoriesContext.publicCategories);
    const [adminCategories, setAdminCategories] = useState(initialCategoriesContext.adminCategories);
    const [featuredCategories, setFeaturedCategories] = useState(initialCategoriesContext.featuredCategories);

    const { isLoggedIn } = useContext(UserContext);

    useEffect(() => {
        if (!isLoggedIn) {
            fetch('http://localhost:5434/api/public/categories', {
                method: 'GET',
                credentials: 'include',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'success') {
                        setPublicList(data.list);
                    }
                })
                .catch(console.error);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (isLoggedIn) {
            fetch('http://localhost:5434/api/admin/categories', {
                method: 'GET',
                credentials: 'include',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'success') {
                        setAdminList(data.list);
                    }
                })
                .catch(console.error);
        }
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

    function setPublicList(data) {
        setPublicCategories(() => data);
    }

    function setAdminList(data) {
        setAdminCategories(() => data);
    }

    function adminCreateCategory() {
    }

    function adminEditCategory() {
    }

    function adminRemoveCategory() {
    }

    function setFeaturedList(data) {
        setFeaturedCategories(() => data);
    }

    const value = {
        publicCategories,
        featuredCategories,
        adminCategories,
        setPublicList,
        setFeaturedList,
        setAdminList,
        adminCreateCategory,
        adminEditCategory,
        adminRemoveCategory,
    };

    return (
        <CategoriesContext.Provider value={value}>
            {props.children}
        </CategoriesContext.Provider>
    );
}
