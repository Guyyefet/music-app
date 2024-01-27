from flask import Blueprint, render_template, request, Response, jsonify

views = Blueprint('views', __name__)

@views.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        if 'file' not in request.files:
            return Response('No file part', content_type='text/plain')
        
        file = request.files['file']

        if file.filename == '':
            return Response('No selected file', content_type='text/plain')

        if file and allowed_file(file.filename):
            content = file.read().decode('utf-8').splitlines()
            
            rows = []
            for row in content[1:]:
                values = row.split(',')
                index, title, artist = values[0], values[2], values[3]
                rows.append({"index": index, "title": title, "artist": artist})

            return jsonify(message='File uploaded successfully', rows=rows)

        else:
            return Response('Invalid file type', content_type='text/plain')

    return render_template("upload.html")

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'csv'}
