import React from "react";
import Header from "../../components/Header/Header";
import FavComponent from "../../components/FavComponent/FavComponent";
import Footer from "../../components/Footer/Footer";

function Favoritos(){
    return(
        <React.Fragment>
            <Header/>
            <FavComponent />
            <Footer/> 
        </React.Fragment>
    )
}

export default Favoritos