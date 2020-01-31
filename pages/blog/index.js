import React, { Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Link from 'next/link';
import moment from 'moment';

import BaseLayout from '../../components/layouts/BaseLayout';
import BasePage from '../../components/shared/BasePage';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import {
  faTwitter,
  faFacebookF,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

const Blog = props => {
  const { isAuthenticated, clientAuth, loading } = props;

  return (
    <BaseLayout
      isAuthenticated={isAuthenticated}
      clientAuth={clientAuth}
      loading={loading}
      title="Blog"
      headerType={'landing'}
      className="blog-listing-page"
    >
      <div
        className="masthead"
        style={{ backgroundImage: "url('/static/images/home-bg.jpg')" }}
      >
        <div className="overlay"></div>
        <Container>
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <div className="site-heading">
                <h1>Fresh Blogs</h1>
                <span className="subheading">Programming, travelling...</span>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <BasePage title="Blog" className="blog-body">
        <Row>
          <Col md="10" lg="8" className="mx-auto">
            {
              <Fragment>
                <div className="post-preview">
                  <Link href={`/blogs/blogId`}>
                    <a>
                      <h2 className="post-title">Very Nice Blog Post</h2>
                      <h3 className="post-subtitle">
                        How I Start Porgramming...
                      </h3>
                    </a>
                  </Link>
                  <p className="post-meta">
                    Posted by
                    <a href="#"> Filip Jerga </a>
                    {moment().format('LLLL')}
                  </p>
                </div>
                <hr></hr>
                <div className="post-preview">
                  <Link href={`/blogs/blogId`}>
                    <a>
                      <h2 className="post-title">Very Nice Blog Post</h2>
                      <h3 className="post-subtitle">
                        How I Start Porgramming...
                      </h3>
                    </a>
                  </Link>
                  <p className="post-meta">
                    Posted by
                    <a href="#"> Filip Jerga </a>
                    {moment().format('LLLL')}
                  </p>
                </div>
                <hr></hr>
                <div className="post-preview">
                  <Link href={`/blogs/blogId`}>
                    <a>
                      <h2 className="post-title">Very Nice Blog Post</h2>
                      <h3 className="post-subtitle">
                        How I Start Porgramming...
                      </h3>
                    </a>
                  </Link>
                  <p className="post-meta">
                    Posted by
                    <a href="#"> Filip Jerga </a>
                    {moment().format('LLLL')}
                  </p>
                </div>
                <hr></hr>
              </Fragment>
            }
            <div className="clearfix">
              <a className="btn btn-primary float-right" href="#">
                Older Posts &rarr;
              </a>
            </div>
          </Col>
        </Row>

        <footer>
          <Container>
            <Row>
              <div className="col-lg-8 col-md-10 mx-auto">
                <ul
                  className="list-inline text-center"
                  style={{ marginBottom: '1rem' }}
                >
                  <li
                    className="list-inline-item"
                    style={{ marginRight: '3rem' }}
                  >
                    <a href="#">
                      <span className="fa-layers fa-fw">
                        <FontAwesomeIcon icon={faCircle} size="3x" />
                        <FontAwesomeIcon
                          icon={faTwitter}
                          size="lg"
                          inverse
                          transform="right-10.5 down-0.5 grow-2"
                        />
                      </span>
                    </a>
                  </li>
                  <li
                    className="list-inline-item"
                    style={{ marginRight: '3rem' }}
                  >
                    <a href="#">
                      <span className="fa-layers fa-fw">
                        <FontAwesomeIcon icon={faCircle} size="3x" />
                        <FontAwesomeIcon
                          icon={faFacebookF}
                          size="lg"
                          inverse
                          transform="right-10 grow-2"
                        />
                      </span>
                    </a>
                  </li>
                  <li
                    className="list-inline-item"
                    style={{ marginRight: '1.5rem' }}
                  >
                    <a href="#">
                      <span className="fa-layers fa-fw">
                        <FontAwesomeIcon icon={faCircle} size="3x" />
                        <FontAwesomeIcon
                          icon={faGithub}
                          size="lg"
                          inverse
                          transform="right-10 grow-2"
                        />
                      </span>
                    </a>
                  </li>
                </ul>
                <p className="copyright text-muted">
                  Copyright &copy; Filip Jerga 2018
                </p>
              </div>
            </Row>
          </Container>
        </footer>
      </BasePage>
    </BaseLayout>
  );
};

export default Blog;
