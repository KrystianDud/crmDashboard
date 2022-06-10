import React, { useEffect } from 'react';
import ImageCard from '../ImageCard/Index';
import { uniqueId } from 'lodash';
export default function CardList({ list, editItem, selectedCard, showDetails }) { 

    return (
        <div className='flexRow flex-start flexWrap alignContentStart'>
            {list != 'undefined' ? list && list.map((item, index) => (
                <ImageCard
                    key={'product' + uniqueId()}
                    onClick={editItem}

                    id={index}
                    // img={ }
                    heading={item.name}
                    subtitle={item.description}
                    price={item.price}
                    showSidebar={showDetails}
                    selectedCard={selectedCard}
                />
            )) : null}
        </div>
    )
}
