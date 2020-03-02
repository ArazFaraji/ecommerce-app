import React from 'react';
import { Route } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';

// import SHOP_DATA from '../../redux/shop/shop.data';

// import CollectionPreview from '../../components/collection-preview/collection-preview.component';

// import { selectCollections } from '../../redux/shop/shop.selectors';



// Our ShopPage component in App.js, ShopPage is nested in a Route. Route automatically passes match, location, and history as props into the component. If we console.log(match) we can see match.path for this component is path: "/shop."
const ShopPage = ({ match }) => (
    <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route path={`${match.path}/:collectionID`} component={CollectionPage} />
    </div>
);

export default ShopPage;








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