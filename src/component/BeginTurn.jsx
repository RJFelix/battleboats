import React from 'react';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';

const BeginTurn = ({game}) => {
  let statusUpdate = 'The game is starting!'
  if(game.moves.length > 0) {
    const lastMove = game.moves[game.moves.length - 1];
    if(lastMove.sunk) {
      statusUpdate = `Player ${game.activePlayer}'s ship was sunk! It was ${lastMove.sunkDescription}.`
    } else if(lastMove.hit) {
      statusUpdate = `Player ${game.activePlayer}'s ship was hit!`
    } else {
      statusUpdate = "Miss!"
    }
  }
  return (
    <div>
      <Heading
        align='center'
      >Player {game.activePlayer}'s Turn!
      </Heading>
      <Box
        size='large'
        colorIndex='light-2'
        style={{
          margin: '0 auto',
        }}
        pad='medium'
      >
        <p
          style={{
            fontSize: '20px',
            margin: '0 auto'
          }}
        >{statusUpdate}</p>
      </Box>
      <Box 
        direction='row'
        pad='small'
        size='large'
        alignContent='around'
        justify='around'
        flex={false}
        style={{
          margin: '0 auto'
        }}
      >
        <Button 
          primary 
          label='Begin Turn'
          onClick={() =>
            game.play()
        }/>
        <Button 
          critical 
          label='End Game'
          onClick={() => 
            game.finish()
        }/>
      </Box>
    </div>
  );
}

export default BeginTurn;