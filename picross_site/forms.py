from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, DecimalField
from wtforms.validators import DataRequired, Email

class UserLoginForm(FlaskForm):
    # email, password, submit_button
    username = StringField('Username', validators =[DataRequired()])
    email = StringField('Email', validators = [DataRequired(), Email()])
    password = PasswordField('Password', validators = [DataRequired()])
    submit_button = SubmitField()

class PuzzleForm(FlaskForm):
    descriptor = StringField('descriptor')
    puzzle_data = StringField('puzzle_data')
    submit_button = SubmitField()
    