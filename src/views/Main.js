import '../App.css';
import React from 'react';
import {Table} from '../components/Table/Table'

const Main = () => {
    return (
        <>
            <Table/>
            <a href='/#/button'>Button</a>
            <a href='/#/buttonznapisem/dzieńdobry'>Button</a>
        </>
    );
};

export {Main};