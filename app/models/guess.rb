class Guess < ActiveRecord::Base
  RANGE = ("A".."Z")
  belongs_to :game
  validates :game, :presence => true
  validates :letter, :presence => true, :uniqueness => {:scope => :game}, :inclusion => { :in => RANGE.to_a } 
  
  before_validation :upcase_letter
  after_save :update_game_status
  after_destroy :update_game_status
  
  def upcase_letter
    self.letter = self.letter.upcase if self.letter
  end
  
  def update_game_status
    self.game.determine_status
    self.game.save!
  end
end
