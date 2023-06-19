import React from 'react';
import { render, screen } from '@testing-library/react';
import Map from './Map';

describe('Map', () => {
  it('renders without errors', () => {
    render(<Map />);
  });

  it('displays the marker when clicked', () => {
    render(<Map />);
    const mapContainer = screen.getByTestId('map-container');
    mapContainer.click();
    const marker = screen.getByLabelText('Marker');
    expect(marker).toBeInTheDocument();
  });

  it('removes the marker when double-clicked', () => {
    render(<Map />);
    const mapContainer = screen.getByTestId('map-container');
    mapContainer.click();
    const marker = screen.getByLabelText('Marker');
    expect(marker).toBeInTheDocument();
    mapContainer.dispatchEvent(new MouseEvent('dblclick'));
    expect(marker).not.toBeInTheDocument();
  });

  it('displays the label on mouse move', () => {
    render(<Map />);

    const mapContainer = screen.getByTestId('map-container');
    mapContainer.dispatchEvent(new MouseEvent('mousemove'));
    const label = screen.getByLabelText('Label');
    expect(label).toBeInTheDocument();
  });

  it('displays the image bounds', () => {
    const imageBounds = [[10, 20], [30, 40]];
    render(<Map imageBounds={imageBounds} />);
    const rectangle = screen.getByLabelText('Image Bounds');
    expect(rectangle).toBeInTheDocument();
  });
});
