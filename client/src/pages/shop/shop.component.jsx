import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

// ShopPage component in App.js, ShopPage is nested in a Route. Route automatically passes match, location, and history as props into the component. 


// Refactored ShopPage to be a functional component and use useEffect for component lifecycle. 
const ShopPage = ({ fetchCollectionsStart, match}) => {
    useEffect(() => {
        fetchCollectionsStart();
    }, [fetchCollectionsStart]);
        
        return (
            <div className="shop-page">
                <Route 
                    exact 
                    path={`${match.path}`} 
                    component={ CollectionsOverviewContainer }
                />
                <Route 
                    path={`${match.path}/:collectionID`} 
                    component={ CollectionPageContainer }
                />
            </div>
        );
}



// class ShopPage extends React.Component {
//     componentDidMount() {
//         const { fetchCollectionsStart } = this.props;

//         fetchCollectionsStart();
//     }

//     render() {
//         const { match } = this.props;
        
//         return (
//             <div className="shop-page">
//                 <Route 
//                     exact 
//                     path={`${match.path}`} 
//                     component={ CollectionsOverviewContainer }
//                 />
//                 <Route 
//                     path={`${match.path}/:collectionID`} 
//                     component={ CollectionPageContainer }
//                 />
//             </div>
//         );
//     }
// }

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);
