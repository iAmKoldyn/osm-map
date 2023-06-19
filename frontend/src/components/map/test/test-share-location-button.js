import React from 'react';
import { render } from '@testing-library/react';
import ShareLocationButton from './ShareLocationButton';

describe('ShareLocationButton', () => {
  it('renders TelegramShareButton with correct URL', () => {
    const { getByRole } = render(<ShareLocationButton />);
    const shareButton = getByRole('link');
    expect(shareButton.getAttribute('href')).toEqual(window.location.href);
  });

  it('renders TelegramIcon with correct size and style', () => {
    const { getByRole } = render(<ShareLocationButton />);
    const icon = getByRole('img');
    expect(icon).toHaveStyle('marginTop: 10px');
  });
});

