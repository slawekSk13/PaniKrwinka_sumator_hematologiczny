import {render} from '@testing-library/react';
import {Center} from './Center'

test('renders center', () => {
   render(<Center/>);
   const center = document.querySelector('div');
   expect(center).toBeInTheDocument();
});