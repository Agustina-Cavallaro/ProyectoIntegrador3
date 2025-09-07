import React from "react";
import Header from "../../components/Header/Header";
import TopRatedSeries from "../../components/TopRatedSeries/TopRatedSeries";

function TopRatedSeriesSection(){
    return(
        <React.Fragment>
            <Header/>
            <h2 class="alert alert-primary">Top Rated series</h2>
            <TopRatedSeries filter={false}/>
        </React.Fragment>
    )
}

export default TopRatedSeriesSection