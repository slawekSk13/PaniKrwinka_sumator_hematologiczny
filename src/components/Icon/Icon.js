import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlusSquare, faPrint, faFilePdf, faTimes} from '@fortawesome/free-solid-svg-icons'
import propTypes from "prop-types"
import {useState} from 'react'

const Icon = ({icon, onClick}) => {
    const [style, setStyle] = useState({
        color: '#951B81',
        fontSize: '2rem',
        margin: '1rem',
    })

    const handleMouseOver = () => setStyle(prev => ({...prev, color: '#CD1719', cursor: 'pointer'}));
    const handleMouseLeave = () => setStyle(prev => ({...prev, color: '#951B81', cursor: 'default'}));
    const handleClick = () => {
        if(typeof onClick === 'function') {
            onClick();
        } else console.warn('onClick must be a function')
    }
    switch (icon) {
        case 'add':
            return (
                <FontAwesomeIcon onClick={handleClick} onMouseEnter={handleMouseOver} onMouseLeave={handleMouseLeave} style={style}
                                 icon={faPlusSquare}/>
            );
        case 'pdf':
            return (
                <FontAwesomeIcon onClick={handleClick} onMouseEnter={handleMouseOver} onMouseLeave={handleMouseLeave} style={style}
                                 icon={faFilePdf}/>
            );
        case 'print':
            return (
                <FontAwesomeIcon onClick={handleClick} onMouseEnter={handleMouseOver} onMouseLeave={handleMouseLeave} style={style}
                                 icon={faPrint}/>
            );
        case 'exit':
            return (
                <FontAwesomeIcon onClick={handleClick} onMouseEnter={handleMouseOver} onMouseLeave={handleMouseLeave} style={style}
                                 icon={faTimes}/>
            );
        default:
            console.log('Icon props must be either add, pdf or print unless you add another icon');
            return null;
    }
}

Icon.propTypes = {
    /** icon is a key word to choose which of preselected icons component should render, you can add more if you import them from FontAwesome and add to switch instruction */
    icon: propTypes.string,
    /** onClick - method to react on click*/
    onClick: propTypes.func
}

Icon.defaultProps = {
    icon: 'add',
    onClick: () => console.warn('onClick function not set')
}

export {Icon}