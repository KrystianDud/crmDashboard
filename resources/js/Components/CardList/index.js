import React, { useEffect } from 'react';
import ImageCard from '../ImageCard/Index';
import { uniqueId } from 'lodash';
export default function CardList({ list, onClick, selectedCard, showDetails, user }) {

    const style = {
        borderRadius: '15px',

        background: '#fff',
        overflowY: 'auto',
        height: '75vh'
    };

    return (
        <div className='flexRow flex-start flexWrap alignContentStart justifyEvenly' style={style}>
            {list != 'undefined' ? list && list.map((item, index) => (
                <ImageCard
                    key={'product' + uniqueId()}
                    onClick={onClick}
                    user={user}

                    id={item.id}
                    img={item.slug}
                    heading={item.name}
                    subtitle={item.description}
                    price={item.price}
                    slug={item.slug}
                    itemRef={item}
                    showSidebar={showDetails}
                    selectedCard={selectedCard}
                />
            )) : null}
        </div>
    )
}
