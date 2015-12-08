class Guess < ActiveRecord::Base
  RANGE = ("A".."Z")
  belongs_to :game
  validates :game, :presence => true
  validates :letter, :presence => true, :uniqueness => {:scope => :game}, :inclusion => { :in => RANGE.to_a } 
  
  before_validation :upcase_letter
  
  def upcase_letter
    self.letter = self.letter.upcase if self.letter
  end
end
