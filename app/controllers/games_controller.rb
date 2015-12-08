class GamesController < ApplicationController
  def show
    @game = Game.find(params[:id])
  end
  
  private
  
  def game
    @game
  end
  helper_method :game
end
