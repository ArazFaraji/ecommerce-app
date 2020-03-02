import React from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component';

import { selectCollection } from '../../redux/shop/shop.selectors';

import './collection.styles.scss';

const CollectionPage = ({ collection }) => {
    console.log(collection);
    const { title, items } = collection;
    return (
        <div className="collection-page">
            <h2 className='title'>{ title }</h2>
            <div className="items">
                {
                    items.map(item => 
                        <CollectionItem key={item.id} item={item} />
                    )
                }
            </div>
        </div>
    );
};


// This time we are using the second optional parameter in mapStateToProps. 1st parameter is always the state from the reducer. The second propery is generally named ownProps which are the props of the component we are wrapping in {connect}. This passes on the match props as we need it in the shop selector to find exactly which collection the user wants displayed. That state we want to display depends on the URL parameter. 
const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionID)(state)
})

export default connect(mapStateToProps)(CollectionPage);