# OSM Catchers DEMO

This is a Flask-based RESTful API that returns the geographical bounds of an uploaded raster image in WGS84 coordinates (i.e., longitude and latitude) using Rasterio and PyProj libraries.

# Installation

First, clone this repository to your local machine:

git clone https://gitlab.com/Naziser/osm/-/tree/feature/validators-and-area-selection/

Then, navigate into the project directory and install the required dependencies:

cd osm/backend

**Create a virtual environment and activate it:**

python3 -m venv env
source env/bin/activate

**Install the required dependencies:**

pip install -r requirements.txt


# Usage

**To start the API server, run:**

$ python3 server.py

The API server will be accessible at http://localhost:5000.

Uploading an image and retrieving its bounds

Send an HTTP POST request to http://localhost:5000/upload with a file parameter named "file" containing a raster image file (.tif) to get its bounds. The response will be returned in JSON format and contain the west, south, east, and north boundaries of the image in decimal degrees.

You can also test the API using the included test_image.tif file:

curl -X POST -F "file=@test_image.tif" 
http://localhost:5000/upload

# Allowed Formats

Only .tif files are allowed to be uploaded.

# License

MIT.
