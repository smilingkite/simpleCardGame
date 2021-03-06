// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// on selectedCards > compareCards > select winner of round.

function compareCards(Card1, Card2) {
  if (Card1.symbol > Card2.symbol) return 'Card1' ;
  return 'Card2';
}

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    console.log("compareCards hook called") // eslint-disable-line


    return hook.app.service('games').get(hook.id)
      .then((game) => {
        const { hand1, hand2 , score1, score2 } = game;
        if (hook.data.game === undefined) return Promise.resolve(hook);
        if (hand1.selectedCard !== undefined) return Promise.resolve(hook);

        var Card1 = hand1.filter(function(hand){
          return hand.selected;
        });
        var Card2 = hand2.filter(function(hand){
          return hand.selected;
        });

        if (compareCards(Card1, Card2) === 'Card1'){
          score1+1;
        } else {
          score2+1;
        }

        var newHand1 = hand1.filter(function(hand){
          return !hand.selected;
        });

        var newHand2 = hand2.filter(function(hand){
          return !hand.selected;
        });

        hook.data.score1 = score1;
        hook.data.score2 = score2;
        hook.data.hand1 = newHand1;
        hook.data.hand2 = newHand2;
        return Promise.resolve(hook);
      });

    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    // return Promise.resolve(hook);
  };
};
