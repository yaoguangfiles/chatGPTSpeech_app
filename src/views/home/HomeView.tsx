import React from "react";


class HomeView extends React.Component {
    render(): React.ReactNode {
        return (
            <div className="App container">
                {/* <div className="jumbotron">
                    <h2>Get Started with Paul Flight System!</h2>
                </div> */}
                <div className="card-header">
                    <p style={{ fontSize: 30, color: "#ffffff", textAlign: "center", paddingLeft: "20px" }}>Welcome to Paul Flight System!</p>
                </div>
            </div>
        );
    };
};

export default HomeView;