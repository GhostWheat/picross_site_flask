from flask import Blueprint, render_template, request, redirect, url_for
from flask_login import login_required, current_user
from picross_site.forms import PuzzleForm
from picross_site.models import Puzzle, db

site = Blueprint('site', __name__, template_folder='site_templates')

@site.route('/')
def home():
    print("ooga booga in the terminal")
    return render_template('index.html')

@site.route('/profile', methods = ['GET','POST'])
@login_required
def profile():
    my_puzzle = PuzzleForm()

    try:
        if request.method == 'POST' and my_puzzle.validate_on_submit():
            descriptor = my_puzzle.descriptor.data
            puzzle_data = my_puzzle.puzzle_data.data
            user_token = current_user.token

            puzzle = Puzzle( descriptor, puzzle_data, user_token)
            # print(puzzle)
            db.session.add(puzzle)
            db.session.commit()

            return redirect(url_for('site.profile'))

    except:
        raise Exception('Puzzle not added, please check your form and try again!') 

    current_user_token = current_user.token

    puzzles = Puzzle.query.filter_by(user_token=current_user_token)

    return render_template('profile.html', form=my_puzzle, puzzles = puzzles)


# @site.route('/puzzle_page')
# @login_required
# def puzzle_page():
    
#     return render_template('puzzle_page.html')
