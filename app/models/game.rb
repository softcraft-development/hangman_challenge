class Game < ActiveRecord::Base
  LOSS_MISSES = 6
  belongs_to :word
  has_many :guesses
  validates :word, :presence => true
  validates :status, :inclusion => { :in => [nil, "win", "loss"] } 
  
  def determine_status
    state = self.state
    if state[:misses] >= LOSS_MISSES
      self.status = "loss"
    else
      if state[:positions].any?{|p| p == nil}
        self.status = nil
      else
        self.status = "win"
      end
    end
    self.status
  end
  
  def state
    hash = {}
    hash[:guessed_letters] = guesses.map{|guess| guess.letter.upcase}.uniq.sort

    correct_letters = []
    hash[:positions] = self.word.name.each_char.map do |letter|
      letter = letter.upcase
      if letter == " "
        letter
      else
        correct_letters << letter
        if hash[:guessed_letters].include?(letter)
          letter
        else
          nil
        end
      end
    end
    
    correct_letters.uniq!

    hash[:misses] = hash[:guessed_letters].reduce(0) do |misses, letter|
      misses += 1 unless correct_letters.include?(letter)
      misses
    end
    
    if hash[:misses] >= LOSS_MISSES
      hash[:positions] = self.word.name.each_char
    end
    
    hash
  end
end
