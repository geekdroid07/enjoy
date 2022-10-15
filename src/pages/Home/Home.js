import React from 'react';
import './Home.scss';

function Home() {
  return (
    <div className="Home">
      <h2 className="flex justify-center Home__title">Home</h2>
      <div className="Home__content Content">
        {/* <StatGroup>
          <Stat>
            <StatLabel>Sent</StatLabel>
            <StatNumber>345,670</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              23.36%
            </StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>Clicked</StatLabel>
            <StatNumber>45</StatNumber>
            <StatHelpText>
              <StatArrow type="decrease" />
              9.05%
            </StatHelpText>
          </Stat>
        </StatGroup> */}
      </div>
    </div>
  );
}

export default Home;
