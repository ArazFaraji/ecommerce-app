import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { updateCollections } from '../../redux/shop/shop.actions';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';

// import SHOP_DATA from '../../redux/shop/shop.data';

// import CollectionPreview from '../../components/collection-preview/collection-preview.component';

// import { selectCollections } from '../../redux/shop/shop.selectors';



// Our ShopPage component in App.js, ShopPage is nested in a Route. Route automatically passes match, location, and history as props into the component. If we console.log(match) we can see match.path for this component is path: "/shop."

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);


class ShopPage extends React.Component {
    state = {
        loading: true
    };

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collections');

        collectionRef.get().then(snapshot => {
            // console.log(snapshot)
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
            updateCollections(collectionsMap);
            this.setState({ loading: false });
        });
    }
    render() {
        const { match } = this.props;
        const { loading } = this.state;
        return (
            <div className="shop-page">
                <Route 
                    exact 
                    path={`${match.path}`} 
                    render={(props) => (
                        <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
                    )} 
                />
                <Route 
                    path={`${match.path}/:collectionID`} 
                    render={(props) => (
                        <CollectionPageWithSpinner isLoading={loading} {...props} />
                    )} 
                />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);








// const ShopPage = ({ collections }) => (
//     <div className="shop-page">
//         {collections.map(({ id, ...otherCollectionProps }) => (
//             <CollectionPreview key={id} {...otherCollectionProps} />
//         ))}
//     </div>
// );

// const mapStateToProps = createStructuredSelector({
//     collections: selectCollections
// });

// export default connect(mapStateToProps)(ShopPage);




// class ShopPage extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             collections: SHOP_DATA 
//         }
//     }

//     render() {
//         const { collections } = this.state;
//         return (
//             <div className='shop-page'>
//                 {
//                     collections.map(({ id, ...otherCollectionProps }) => (
//                         <CollectionPreview key={id} {...otherCollectionProps} />
//                     ))
//                 }
//             </div>
//         )
//     }
// }

// export default ShopPage;