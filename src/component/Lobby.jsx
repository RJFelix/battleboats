import React from 'react';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';

const Lobby = ({ game }) => {
  return (
  <div>
    <Heading
      align='center'
    >Welcome to Battleboats!</Heading>
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
      {game.hasSavedGame &&
      <Button 
        primary
        label={'Continue Saved Game'}
        onClick={
        () => game.continueGame()
      }/>
      }
      <Button 
        primary={!game.hasSavedGame}
        label={game.hasSavedGame ? 'Start New Game' : 'Start!'}
        onClick={
          () => game.beginGame()
      }/>
    </Box>
  </div>
  );
}

export default Lobby;