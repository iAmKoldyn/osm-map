import os
import pytest
import requests


@pytest.fixture
def server_url():
    return 'http://localhost:5000'


def test_upload_valid_file(server_url):
    file_path = 'test_files/valid_file.tif'
    files = {'file': open(file_path, 'rb')}
    response = requests.post(f'{server_url}/upload', files=files)
    assert response.status_code == 200
    data = response.json()
    assert 'west' in data
    assert 'south' in data
    assert 'east' in data
    assert 'north' in data


def test_upload_invalid_file_extension(server_url):
    file_path = 'test_files/invalid_file.txt'
    files = {'file': open(file_path, 'rb')}
    response = requests.post(f'{server_url}/upload', files=files)
    assert response.status_code == 400
    data = response.json()
    assert 'error' in data
    assert data['error'] == 'Invalid file extension. Only .tif files are allowed.'


def test_upload_file_not_found(server_url):
    file_path = 'test_files/nonexistent_file.tif'
    files = {'file': open(file_path, 'rb')}
    response = requests.post(f'{server_url}/upload', files=files)
    assert response.status_code == 500


if __name__ == '__main__':
    pytest.main()
