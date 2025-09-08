import React from "react";
// import Formulario from "../Formulario /Formulario";

function SearchForm() {
    return(
        <React.Fragment>
                <form className="search-form" action="/results" method="get"> {/* hay que crerar la ruta de results por lo que entiendo*/}
                    <input type="text" className="" name="searchData" placeholder="Buscar..." value=""/>
                <button type="submit" className="btn btn-success btn-sm">Buscar</button>
            </form>
        </React.Fragment>
    )

}
export default SearchForm