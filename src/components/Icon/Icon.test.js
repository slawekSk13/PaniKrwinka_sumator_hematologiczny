import {fireEvent, render} from '@testing-library/react';
import {Icon} from './Icon';

test('renders icon', () => {
    render(<Icon />);
    const icon = document.querySelector('svg');
    expect(icon).toBeInTheDocument();
});

test('mouse click', () => {
    const handleClick = jest.fn();
    render(<Icon onClick={handleClick}/>);
    fireEvent.click(document.querySelector('svg'));
    expect(handleClick).toHaveBeenCalled();
});

test('icon color', () => {
    render(<Icon/>);
    const icon = document.querySelector('svg');
    const style = window.getComputedStyle(icon);
    expect(style.color).toBe('rgb(149, 27, 129)');
});