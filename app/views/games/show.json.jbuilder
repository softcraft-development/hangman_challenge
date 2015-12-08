game_state = game.state
json.id game.id
json.status game.status
json.positions game_state[:positions]
json.misses game_state[:misses]
json.guesses game_state[:guessed_letters]