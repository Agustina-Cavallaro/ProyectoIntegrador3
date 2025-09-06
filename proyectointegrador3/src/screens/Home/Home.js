import React from "react";

function Home(){
    return(
        <React.Fragment>
            <div className="container">
                <h1>UdeSA Movies</h1>
                {/* header/navbar */}
                <h2 className="alert alert-primary">Popular movies this week</h2>
            </div>
        </React.Fragment>
    )
}

export default Home