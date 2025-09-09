import React from "react";
import Header from "../../components/Header/Header";
import TopRatedSeries from "../../components/TopRatedSeries/TopRatedSeries";
import Footer from "../../components/Footer/Footer";

function TopRatedSeriesSection(){
    return(
        <React.Fragment>
            <Header/>
            <h2 class="alert alert-primary">Top Rated series</h2>
            <TopRatedSeries filter={false}/>
            <Footer/>
        </React.Fragment>
    )
}

export default TopRatedSeriesSection