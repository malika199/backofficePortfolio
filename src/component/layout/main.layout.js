import React from 'react';
import Navbar from '../navbar/navbar';

const Mainlayout = ({children}) => {
    return (
        <>
            <header >
            </header>
            <main>
                <div >
                    {children}
                </div>
            </main>
            <footer>
            </footer>
        </>
    );
}

export default Mainlayout;
