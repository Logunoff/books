import { useSelector } from 'react-redux';

export const useCategoryByName = () => {
    const categories = useSelector((state) => state.categories.categories);

    return categories.reduce((result, category) => {
        result[category.path] = category.name;

        return result;
    }, {});
};