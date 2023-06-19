import React from 'react';
import { render, screen } from '@testing-library/react';
import Layers from './Layers';

const mockLayersContext = {
  layers: [
    { name: 'Layer 1', checked: true, attribution: 'Attribution 1', url: 'URL 1' },
    { name: 'Layer 2', checked: false, attribution: 'Attribution 2', url: 'URL 2' },
  ],
};

jest.mock('../../context', () => ({
  layersContext: {
    useContext: jest.fn(() => mockLayersContext),
  },
}));

describe('Layers', () => {
  it('renders base layers with correct attributes', () => {
    render(<Layers />);

    const baseLayer1 = screen.getByText('Layer 1');
    expect(baseLayer1).toBeInTheDocument();
    expect(baseLayer1).toHaveAttribute('checked');

    const baseLayer2 = screen.getByText('Layer 2');
    expect(baseLayer2).toBeInTheDocument();
    expect(baseLayer2).not.toHaveAttribute('checked');
  });
});
