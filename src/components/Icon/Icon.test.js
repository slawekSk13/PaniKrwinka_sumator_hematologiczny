import {fireEvent, render} from '@testing-library/react';
import {Icon} from './Icon';

test('renders icon', () => {
    render(<Icon />);
    const icon = document.querySelector('svg');
    expect(icon).toBeInTheDocument();
});

test('mouse enter', () => {
    const handleClick = jest.fn();
    render(<Icon onClick={handleClick}/>);
    fireEvent.mouseOver(document.querySelector('svg'), new MouseEvent('click'));
    expect(handleClick).toHaveBeenCalled();
});