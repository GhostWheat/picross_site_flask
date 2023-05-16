from flask import Flask, render_template, url_for  # remember, capital letters used for a Class!
# from forms import RegistrationForm, LoginForm # this is from forms.py

app = Flask(
    __name__,
    template_folder="./templates"
)

@app.route('/', methods=['GET','POST'])
def puzzle_page():
    return render_template('puzzle_page.html')