// Redux Sage listens to every action of a specific type that is passed to it. 
import { takeLatest, call, put, all } from 'redux-saga/effects';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions'

import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync() {
    // yield console.log("I am fired")
    try {

        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        // First argument is a function/method and second argument of call is the parameter we pass into the (1st argument) function call. 
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message))
    }

}


// First parameter is the action, second is the generator function being fired after action was listened to. 
export function* fetchCollectionsStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    );
}

export function* shopSagas() {
    yield all([
        call(fetchCollectionsStart),
    ])
};