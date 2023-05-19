# remember, capital letters used for a Class!
from flask import Flask, Blueprint, render_template, request, redirect, url_for
from flask_login import login_required, current_user
# from car_dealership.forms import CarForm
from models import Puzzle, db
import js2py



# from forms import RegistrationForm, LoginForm # this is from forms.py

app = Flask(__name__, template_folder="./templates")


@app.route("/puzzle-page", methods=["GET", "POST", "PUT", "DELETE"])
@app.route("/", methods=["GET", "POST", "PUT", "DELETE"])
def puzzle_page():

    try:
        if request.method == 'POST':
            print('error')
            id = ""
            descriptor =''
            puzz_data = ''

    except:
        raise Exception('Error: not saved to database.')






    return render_template("puzzle_page.html")

