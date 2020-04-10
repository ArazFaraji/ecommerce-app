import { createSelector } from 'reselect';



const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);


// Object.keys gets us all of the keys of an object that we pass into it and returns it in an array format. So we get all the keys in collections, then do a .map over an array of the keys, so we can get the values of the collections values at that key (hats, sneakers, jackets, mens, womens). 
export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => 
        collections ? Object.keys(collections).map(key => collections[key]) : []
);

export const selectCollection = collectionUrlParam => 
    createSelector(
        [selectCollections],
        collections => collections ? collections[collectionUrlParam] : null
    );