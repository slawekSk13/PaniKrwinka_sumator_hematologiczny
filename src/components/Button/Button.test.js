import {fireEvent, render, screen} from '@testing-library/react';
import {Button} from './Button';

test('renders button', () => {
    render(<Button />);
    const button = document.querySelector('button');
    expect(button).toBeInTheDocument();
});

test('mouse click', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}/>);
    fireEvent.click(document.querySelector('button'));
    expect(handleClick).toHaveBeenCalled();
});

test('button background color', () => {
    render(<Button/>);
    const button = document.querySelector('button');
    const style = window.getComputedStyle(button);
    expect(style.backgroundColor).toBe('rgb(149, 27, 129)');
});

test ('button text', () => {
    render(<Button text='dalej' />);
    const button = screen.getByText('dalej');
    expect(button).toBeInTheDocument();
});