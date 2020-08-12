import React from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component';

import { selectCollection } from '../../redux/shop/shop.selectors';

import { CollectionPageContainer, CollectionTitle, CollectionItemsContainer } from './collection.styles';

// import './collection.styles.scss';

const CollectionPage = ({ collection }) => {
    const { title, items } = collection;
    return (
        <CollectionPageContainer>
            <CollectionTitle>{title}</CollectionTitle>
            <CollectionItemsContainer>
                {items.map(item => (
                    <CollectionItem key={item.id} item={item} />
                ))}
            </CollectionItemsContainer>
        </CollectionPageContainer>
    );
};




// const CollectionPage = ({ collection }) => {
//     console.log(collection);
//     const { title, items } = collection;
//     return (
//         <div className="collection-page">
//             <h2 className='title'>{ title }</h2>
//             <div className="items">
//                 {
//                     items.map(item => 
//                         <CollectionItem key={item.id} item={item} />
//                     )
//                 }
//             </div>
//         </div>
//     );
// };


// There are two parameters in mapStateToProps. 1st parameter is always the state from the reducer. The second property has a naming convention of ownProps which are the props of the component we are wrapping in {connect}. This passes on the match props which I need in the shop selector to find exactly which collection the user wants displayed. That state that is displayed depends on the URL parameter. 
const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionID)(state)
})

export default connect(mapStateToProps)(CollectionPage);