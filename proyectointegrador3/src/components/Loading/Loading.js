import React from "react";

function Loading (){
    return(
        <React.Fragment>
            <img width={300} height={300} src="/assets/img/Loading.gif" title = "gif"/>
            <h3>Cargando...</h3>
        </React.Fragment>
    )
}

export default Loading