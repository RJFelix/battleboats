import 'grommet/grommet.min.css';
// I think we'd need to eject from create-react-app and
// tweak webpack.config.js to get grommet's Sass working.
// But this works well for now!

import React, { Component } from 'react';
import GApp from 'grommet/components/App';
import Article from 'grommet/components/Article';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Section from 'grommet/components/Section';
import GameWrapper from './component/GameWrapper';
import Lobby from './component/Lobby';
import BeginTurn from './component/BeginTurn';
import Playing from './component/Playing';
import EndGame from './component/EndGame';

class App extends Component {
  render() {
    return (
      <GApp
        centered={true}
      >
        <Article>
          <Header
            size='small'
            colorIndex='grey-4'
            full='horizontal'
            style={{
              paddingLeft: '5px'
            }}
          >
            <Title>Battleboats!</Title>
          </Header>
          <Section>
            <GameWrapper
              lobby={Lobby}
              beginTurn={BeginTurn}
              playing={Playing}
              endGame={EndGame}
            />
          </Section>
        </Article>
      </GApp>
    );
  }
}

export default App;
