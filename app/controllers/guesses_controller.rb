class GuessesController < ApplicationController
  skip_before_filter :verify_authenticity_token, only: [:update]
  
  # This is a bit of an unusual situation: what happens when the user guesses an already-guessed letter?
  # We already restrict the guesses to be a unique letter within a given game, so we know we cannot create a new guess.
  # It doesn't change the state of the game either.
  # Thus, it doesn't really need to respond with an error. It's not a useful operation, but neither is it harmful.
  # So, it appears that guessing the same letter multiple times is an idempotent operation.
  # In turn, that means it needs to be an update (HTTP PUT/PATCH), 
  # not a create (HTTP POST) as one might otherwise expect.
  def update
    @game = Game.find(params[:game_id])
    letter = params[:id].to_s[0].upcase
    @guess = @game.guesses.find_or_initialize_by(:letter => letter)
    if @guess.new_record?
      if @guess.save
        render :status => :created and return
      else
        render :status => :unprocessable_entity, :text => @guess.errors.full_messages.join and return
      end
    end
    render :status => :ok
  end
  
  private
  
  def guess
    @guess
  end
  helper_method :guess
end
