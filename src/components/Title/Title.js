import React from 'react';

const Title = ({ title, text }) => {
    return (
        < >
            {(title === "title") && <h2 >{text}</h2>}
            {(title === "subtitle") && <h4 >{text}</h4>}
        </>
    )
}

export default Title;