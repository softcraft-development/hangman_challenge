class Guess < ActiveRecord::Base
  belongs_to :game
  validates :game, :presence => true
  validates :letter, :presence => true, :uniqueness => {:scope => :game} 
  
  before_validation :upcase_letter
  
  def upcase_letter
    self.letter = self.letter.upcase if self.letter
  end
end
