import { renderHook } from '@testing-library/react-hooks';
import useGeolocation from './useGeolocation';

test('should set user location when isLocating is true', () => {
  const setUserLocation = jest.fn();
  const setLocationAccuracy = jest.fn();
  const mapRef = { current: null };
  const options = { initialProps: [true, setUserLocation, setLocationAccuracy, mapRef] };
  
  renderHook(() => useGeolocation(...options.initialProps));
  
  expect(setUserLocation).toHaveBeenCalled();
});

test('should clear watch id when unmounted', () => {
  const clearWatch = jest.fn();
  global.navigator.geolocation = {
    watchPosition: jest.fn(),
    clearWatch
  };
  const mapRef = { current: null };
  const options = { initialProps: [true, jest.fn(), jest.fn(), mapRef] };
  
  const { unmount } = renderHook(() => useGeolocation(...options.initialProps));
  unmount();
  
  expect(clearWatch).toHaveBeenCalled();
});

test('should not set user location when isLocating is false', () => {
  const setUserLocation = jest.fn();
  const setLocationAccuracy = jest.fn();
  const mapRef = { current: null };
  const options = { initialProps: [false, setUserLocation, setLocationAccuracy, mapRef] };
  
  renderHook(() => useGeolocation(...options.initialProps));
  
  expect(setUserLocation).not.toHaveBeenCalled();
});

