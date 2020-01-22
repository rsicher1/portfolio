import React from 'react';

import { Container, Row, Col } from 'reactstrap';
import Typed from 'react-typed';

import BaseLayout from '../components/layouts/BaseLayout';

const Home = props => {
  const { isAuthenticated, loading, clientAuth, user } = props;

  const roles = [
    'Developer',
    'Analytics professional',
    'BI/Visualizations',
    'Management Experience',
    'React/Next.js',
    'Node.js/Express',
    'SQL/MongoDB',
  ];

  return (
    <BaseLayout
      isAuthenticated={isAuthenticated}
      clientAuth={clientAuth}
      loading={loading}
      title="Home"
      className="cover"
      headerType="index"
    >
      <div className="main-section">
        <div className="background-image">
          <img src="/static/images/background-index.png" />
        </div>

        <Container>
          <Row>
            <Col md="6">
              <div className="hero-section">
                <div className="flipper">
                  <div className="back">
                    <div className="hero-section-content">
                      <h2> Full Stack Web Developer </h2>
                      <div className="hero-section-content-intro">
                        Have a look at my portfolio and job history.
                      </div>
                    </div>
                    <img className="image" src="/static/images/section-1.png" />
                    <div className="shadow-custom">
                      <div className="shadow-inner"> </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6" className="hero-welcome-wrapper">
              <div className="hero-welcome-text">
                <h1>
                  {isAuthenticated && (
                    <span className="self-typed">{user.name}, </span>
                  )}
                  Welcome to my portfolio website. Get informed, collaborate and
                  discover projects I've worked on over the years!
                </h1>

                <Typed
                  loop
                  typeSpeed={60}
                  backSpeed={50}
                  strings={roles}
                  backDelay={1000}
                  showCursor
                  className="self-typed"
                />
              </div>
              <div className="hero-welcome-bio">
                <h1>Let's take a look on my work.</h1>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </BaseLayout>
  );
};

export default Home;
