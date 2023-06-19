import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import L from 'leaflet';
import { searchForBoundaries } from './yourFile';

describe('searchForBoundaries', () => {
  let mock;
  let mapRef;
  let setSearchMarker;
  let searchMarker;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    mapRef = {
      current: {
        flyToBounds: jest.fn(),
        removeLayer: jest.fn(),
        addTo: jest.fn(),
      },
    };
    setSearchMarker = jest.fn();
    searchMarker = {
      bindPopup: jest.fn(),
    };
  });

  afterEach(() => {
    mock.restore();
  });

  it('searches for boundaries and updates the map', async () => {
    const query = 'New York';

    const response = [
      {
        lat: 40.7128,
        lon: -74.006,
        boundingbox: [40.49, 40.92, -74.26, -73.69],
      },
    ];

    mock.onGet(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json`).reply(200, response);

    await searchForBoundaries(query, mapRef, setSearchMarker, searchMarker);

    expect(mapRef.current.flyToBounds).toHaveBeenCalledWith([[40.49, -74.26], [40.92, -73.69]], { duration: 0.3 });

    expect(mapRef.current.removeLayer).toHaveBeenCalledWith(searchMarker);

    expect(L.marker).toHaveBeenCalledWith([40.7128, -74.006]);
    expect(searchMarker.bindPopup).toHaveBeenCalledWith(query);
    expect(setSearchMarker).toHaveBeenCalledWith(searchMarker);
    expect(mapRef.current.addTo).toHaveBeenCalledWith(mapRef.current);
  });

  it('handles no results found', async () => {
    const query = 'Invalid Query';

    mock.onGet(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json`).reply(200, []);

    await searchForBoundaries(query, mapRef, setSearchMarker, searchMarker);

    expect(console.log).toHaveBeenCalledWith('No results found.');
  });

  it('handles errors during the search', async () => {
    const query = 'New York';

    mock.onGet(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json`).networkError();

    await searchForBoundaries(query, mapRef, setSearchMarker, searchMarker);

    expect(console.error).toHaveBeenCalledWith('Error searching for boundaries: ', new Error('Network Error'));
  });
});
