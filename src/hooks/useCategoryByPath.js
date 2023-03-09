import { useSelector } from 'react-redux';

export const useCategoryByPath = () => {
    const categories = useSelector((state) => state.categories.categories);

    return categories.reduce((result, category) => {
        result[category.name] = category.path;

        return result;
    }, {});
};