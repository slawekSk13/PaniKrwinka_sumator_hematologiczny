import logo from '../logo.svg';
import '../App.css';
import React from 'react';

const Main = () => {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React Today!
                </a>
                <a href='/#/button'>Button</a>
                <a href='/#/buttonznapisem/dzieńdobry'>Button</a>
            </header>
        </div>
    );
};

export {Main};