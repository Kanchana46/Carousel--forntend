import React from 'react';
import Carousel from '../Carousel/Carousel';

const Home = () => {
    return <div>
        <Carousel slides="1" infinite="false" />
        <Carousel slides="4" infinite="true" />
        <Carousel slides="10" infinite="false" />
    </div>
}

export default Home;