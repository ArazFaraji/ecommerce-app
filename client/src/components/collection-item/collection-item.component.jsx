import React from 'react';
import { connect } from 'react-redux';
import { addItem } from '../../redux/cart/cart.actions';

// import './collection-item.styles.scss';
import { 
    CollectionItemContainer, 
    CollectionFooterContainer, 
    AddButton, 
    BackgroundImage, 
    NameContainer, 
    PriceContainer 
} from './collection-item.styles';

// import CustomButton from '../custom-button/custom-button.component';

// Refactoring code to take advantage of styled components

const CollectionItem = ({ item, addItem }) => {
    const { name, price, imageUrl } = item;

    return (
        <CollectionItemContainer>
            <BackgroundImage className='image' imageUrl={imageUrl} />
            <CollectionFooterContainer>
                <NameContainer>{name}</NameContainer>
                <PriceContainer>{price}</PriceContainer>
            </CollectionFooterContainer>
            <AddButton onClick={() => addItem(item)} inverted>
                Add to cart
            </AddButton>
        </CollectionItemContainer>
    );
};


// const CollectionItem = ({ item, addItem }) => {
//     const { name, price, imageUrl } = item;
    
//     return (
//         <div className='collection-item'>
//             <div
//             className='image' 
//             style={{ 
//                 backgroundImage: `url(${imageUrl})`
//             }}
//             />
//             <div className='collection-footer'>
//                 <span className='name'>{name}</span>
//                 <span className='price'>{price}</span>
//             </div>
//             <CustomButton onClick={() => addItem(item)} inverted>Add to cart</CustomButton>
//         </div>
//     )
// };

const mapDispatchToProps = dispatch => ({
    // addItem is defined in the prop passed to CollectionItem, then the dispatch action gets returned which creates the action( addItem creator in cart.actions, which then gets dispatched to Redux)
    
    addItem: item => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps)(CollectionItem);