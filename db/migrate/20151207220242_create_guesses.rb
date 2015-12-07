class CreateGuesses < ActiveRecord::Migration
  def change
    create_table :guesses do |t|
      t.string :letter, limit: 1
      t.references :game, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
