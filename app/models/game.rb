class Game < ActiveRecord::Base
  belongs_to :word
  has_many :guesses
  
  def state
    hash = {}
    hash[:guessed_letters] = guesses.map{|guess| guess.letter.upcase}.sort

    correct_letters = []
    hash[:positions] = self.word.name.each_char.map do |letter|
      letter = letter.upcase
      correct_letters << letter
      
      if hash[:guessed_letters].include?(letter)
        letter
      else
        nil
      end
    end
    
    correct_letters.uniq!

    hash[:misses] = hash[:guessed_letters].reduce(0) do |misses, letter|
      misses += 1 unless correct_letters.include?(letter)
      misses
    end
    
    hash
  end
end
