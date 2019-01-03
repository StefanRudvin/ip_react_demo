import React, { Component } from 'react';

export default class Footer extends Component {
    render() {
        return (
            <div className="hero-foot footer-custom">
                <div className="container has-text-centered">
                    <hr/>
                    <a className="nav-item" href="http://github.com/plasticneko">
                      <span className="icon">
                        <i className="fa fa-github" />
                      </span>
                    </a>
                    <p>IntelligentPlant</p>
                </div>
            </div>
        );
    }
}