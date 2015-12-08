class Game < ActiveRecord::Base
  belongs_to :word
  has_many :guesses
  
end
