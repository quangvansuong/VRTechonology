import React from "react";
import 'components/user/image360/styles/model.css';


export default function Model( { children, isOpen, isClose }) {

    return(
        <article className= {isOpen ? 'model is-open' : 'model'}>
            <button
                className="close-model"
                onClick={() => { isClose() }}
            ></button>
            <div className="model-container">
                {children}
            </div>

        </article>
    )
}