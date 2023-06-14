import os
from flask import Flask, request
from flask_cors import CORS
from werkzeug.utils import secure_filename
import rasterio
from pyproj import CRS, Transformer


app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

ALLOWED_EXTENSIONS = {'tif'}


@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    filename = secure_filename(file.filename)

    # Check file extension
    extension = filename.rsplit('.', 1)[1].lower()
    if extension not in ALLOWED_EXTENSIONS:
        return {'error': 'Invalid file extension. Only .tif files are allowed.'}, 400

    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    with rasterio.open(filepath) as src:
        bounds = src.bounds

    source_crs = CRS("EPSG:32633")
    target_crs = CRS("EPSG:4326")

    transformer = Transformer.from_crs(source_crs, target_crs)

    west, south = transformer.transform(bounds.left, bounds.bottom)
    east, north = transformer.transform(bounds.right, bounds.top)

    print(west, south, east, north)

    return {
        'west': west,
        'south': south,
        'east': east,
        'north': north
    }


if __name__ == '__main__':
    app.run(debug=True)