import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import PopularSeries from "../../components/PopularSeries/PopularSeries";

function PopularSeriesSection() {
        return(
            <React.Fragment>
                <Header/>
                <h2 class="alert alert-warning">Popular series this week</h2>
                <PopularSeries filter={false}/>
                <Footer/>
            </React.Fragment>
        )
}


export default PopularSeriesSection