from flask import Blueprint, request, jsonify
from picross_site.helpers import token_required
from picross_site.models import db, Puzzle, puzzle_schema, allpuzzles_schema

api = Blueprint('api',__name__, url_prefix = '/api')

@api.route('/getdata')
@token_required
def getdata(our_user):
    return {'some':'value'}

#create Puzzle Endpoint
@api.route('/puzzles', methods = ['POST'])
@token_required
def create_puzzle(our_user):
    descriptor = request.json['descriptor']
    puzzle_data = request.json['puzzle_data']
    user_token = our_user.token
    customer_id = request.json['customer_id'] #IS THIS THE SAME THING AS USER_TOKEN??

    print(f"User Token: {our_user.token}")

    puzzle = Puzzle(descriptor, puzzle_data, user_token, customer_id)

    db.session.add(puzzle)
    db.session.commit()

    response = puzzle_schema.dump(puzzle)

    return jsonify(response)

#retrieve(READ) all puzzles
@api.route('/puzzles', methods = ['GET'])
@token_required
def get_allpuzzles(our_user):
    owner = our_user.token
    puzzles = Puzzle.query.filter_by(user_token = owner).all()
    response = allpuzzles_schema.dump(puzzles)

    return jsonify(response)


#retrieve (READ) only one puzzle
@api.route('/puzzles', methods = ['GET'])
@token_required
def get_puzzle(our_user, id):
    if id:
        puzzle = Puzzle.query.get(id)
        response = puzzle_schema.dump(puzzle)
        return jsonify(response)
    else:
        return jsonify({'message':'Valid ID Required'}), 401


#UPDATE puzzle by id
@api.route('/puzzles/<id>', methods = ['PUT'])
@token_required
def update_puzzle(our_user, id):
    puzzle = Puzzle.query.get(id)
    puzzle.descriptor = request.json['descriptor']
    puzzle.puzzle_data = request.json['puzzle_data']
    puzzle.user_token = our_user.token
    puzzle.customer_id = request.json['customer_id'] #IS THIS THE SAME THING AS USER_TOKEN??

    db.session.commit()

    response = puzzle_schema.dump(puzzle)

    return jsonify(response)


#DELETE puzzle by ID
@api.route('/puzzles/<id>', methods = ['DELETE'])
@token_required
def delete_puzzle(our_user, id):
    puzzle = Puzzle.query.get(id)
    db.session.delete(puzzle)
    db.session.commit()

    response = puzzle_schema.dump(puzzle)
    return jsonify(response)
    


