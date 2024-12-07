from flask import Flask, request, jsonify, send_file
import subprocess
import os
import zipfile
import uuid

app = Flask(__name__)

@app.route('/calculate_route', methods=['POST'])
def calculate_route():
    try:
        data = request.json
        required_params = [
            "start_lat", "start_lon", "goal_lat", "goal_lon", 
            "ship_speed", "ship_dis", "area_front", "ship_reso", 
            "hull_eff", "prop_eff", "engine_eff", "c_sfoc"
        ]
        
        # Validate required parameters
        missing_params = [param for param in required_params if data.get(param) is None]
        if missing_params:
            return jsonify({"error": f"Missing parameters: {', '.join(missing_params)}"}), 400

        # Generate unique filenames
        unique_id = uuid.uuid4()
        output_files = [f"output_{unique_id}_{name}" for name in [
            'path_fuel.csv', 'path_safe.csv', 'path_short.csv', 'path_weighted.csv', 
            'wind_speed_map.svg', 'wave_height_map.svg', 'usurf_map.svg', 'vsurf_map.svg'
        ]]
        zip_file_name = f"route_files_{unique_id}.zip"

        # Clean up old files
        for file in output_files:
            if os.path.exists(file):
                os.remove(file)
        if os.path.exists(zip_file_name):
            os.remove(zip_file_name)

        # Run the subprocess
        python_exec = os.path.abspath('.venv/Scripts/python')
        algorithm_script = os.path.abspath('algorithm.py')
        command = [
            python_exec, algorithm_script,
            str(data['start_lat']), str(data['start_lon']), 
            str(data['goal_lat']), str(data['goal_lon']),
            str(data['ship_speed']), str(data['ship_dis']), 
            str(data['area_front']), str(data['ship_reso']), 
            str(data['hull_eff']), str(data['prop_eff']), 
            str(data['engine_eff']), str(data['c_sfoc'])
        ]
        
        try:
            subprocess.run(command, check=True, capture_output=True, text=True)
        except subprocess.CalledProcessError as e:
            error_msg = e.stderr or e.stdout or str(e)
            return jsonify({"error": f"Algorithm execution failed: {error_msg}"}), 500

        # Verify output files
        if not all(os.path.exists(file) for file in output_files):
            return jsonify({"error": "Route calculation failed. One or more output files not found."}), 500

        # Create zip file
        with zipfile.ZipFile(zip_file_name, 'w') as zipf:
            for file in output_files:
                zipf.write(file)

        return send_file(zip_file_name, mimetype='application/zip', as_attachment=True, download_name=zip_file_name)

    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
