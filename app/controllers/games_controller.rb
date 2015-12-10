class GamesController < ApplicationController
  skip_before_filter :verify_authenticity_token, only: [:create]
  
  def create
    @game = Game.create!(:word => Word.all.sample)
    render :status => :created, :location => game_path(@game)
  end
  
  def index
    @open_games = Game.where(:status => nil)
  end
  
  def show
    @game = Game.find(params[:id])
  end
  
  private
  
  def game
    @game
  end
  helper_method :game
  
  def open_games
    @open_games
  end
  helper_method :open_games
end
