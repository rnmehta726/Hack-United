import React from "react";
import Header from "./Header";
import Record from "./Record";
import Conversation from './Conversation';
import Main from './Main';

export default function Home() {
    let component;

    switch(window.location.pathname){
        case "/home":
            component = <Main/>
        break
        case "/record":
            component = <Record/>
        break
        case "/conversation":
            component = <Conversation/>
        break
        
    }
    return (
        <div>
            <Header/>,
            {component}
        </div>
    );
}