import React, { Component } from "react";

class Loading extends Component {
	render() {
		return (
			<div className="card-panel card-round center">
				<br />
				<div className="preloader-wrapper active">
					<div className="spinner-layer spinner-red-only">
						<div className="circle-clipper left">
							<div className="circle" />
						</div>
						<div className="gap-patch">
							<div className="circle" />
						</div>
						<div className="circle-clipper right">
							<div className="circle" />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Loading;
