import React from 'react';
import Footer from '../Shared/Footer';
import Banner from './Banner';
import Care from './Care';
import Contact from './Contact';
import Info from './Info';
import MakrAppoinment from './MakrAppoinment';
import Services from './Services';
import Testimonials from './Testimonials';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Info></Info>
            <Services></Services>
            <Care></Care>
            <MakrAppoinment></MakrAppoinment>
            <Testimonials></Testimonials>
            <Contact></Contact>
            <Footer></Footer>
        </div>
    );
};

export default Home;