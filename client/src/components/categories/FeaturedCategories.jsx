
import { CategoriesList } from "./CategoriesList";

export function FeaturedCategories() {
    const data = [];

    return (
        <div className="container px-4 py-5" id="featured-3">
            <h2 className="pb-2 border-bottom">Movies by category</h2>
            <CategoriesList data={data} />
        </div>
    );
}
