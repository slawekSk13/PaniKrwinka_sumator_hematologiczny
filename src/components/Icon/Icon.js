import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlusSquare, faPrint, faFilePdf, faTimes} from '@fortawesome/free-solid-svg-icons'
import propTypes from "prop-types"
import {useState} from 'react'

const Icon = ({icon}) => {
    const [style, setStyle] = useState({
        color: '#951B81',
        fontSize: '2rem',
        margin: '1rem',
    })

    const handleMouseOver = () => setStyle(prev => ({...prev, color: '#CD1719', cursor: 'pointer'}));
    const handleMouseLeave = () => setStyle(prev => ({...prev, color: '#951B81', cursor: 'default'}));

    switch (icon) {
        case 'add':
            return (
                <FontAwesomeIcon onMouseEnter={handleMouseOver} onMouseLeave={handleMouseLeave} style={style}
                                 icon={faPlusSquare}/>
            );
        case 'pdf':
            return (
                <FontAwesomeIcon onMouseEnter={handleMouseOver} onMouseLeave={handleMouseLeave} style={style}
                                 icon={faFilePdf}/>
            );
        case 'print':
            return (
                <FontAwesomeIcon onMouseEnter={handleMouseOver} onMouseLeave={handleMouseLeave} style={style}
                                 icon={faPrint}/>
            );
        case 'exit':
            return (
                <FontAwesomeIcon onMouseEnter={handleMouseOver} onMouseLeave={handleMouseLeave} style={style}
                                 icon={faTimes}/>
            );
        default:
            console.log('Icon props must be either add, pdf or print unless you add another icon');
            return null;
    }
}

Icon.propTypes = {
    /** icon is a key word to choose which of preselected icons component should render, you can add more if you import them from FontAwesome and add to switch instruction */
    icon: propTypes.string
}

Icon.defaultProps = {
    icon: 'add'
}

export {Icon}