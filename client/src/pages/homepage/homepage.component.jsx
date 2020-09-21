import React from 'react';
import Directory from '../../components/directory/directory.component';
// import './homepage.styles.scss';
import { HomePageContainer } from './homepage.styles'


const HomePage = () => (
    <HomePageContainer>
        <Directory />
    </HomePageContainer>
);





// Changing application to use styled-components instead of SCSS so that they are truly individual components and their styles don't bleed to other components. 


export default HomePage;