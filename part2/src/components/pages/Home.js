import React from 'react';
import '../../App.css';
import HomeSearch from '../HomeSearch';
import HeroSection from '../HeroSection';

/*
* Home function to display all contents of Home
* Contains a hero section and a search function that also contains a welcome message
*
* @author Roxana Pop
*/
function Home() {
  return (
    <>
    <HeroSection/>
    <HomeSearch/>
    </>
  );
}

export default Home;