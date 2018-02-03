import React, { Component } from "react";

class ChannelList extends Component {
	render() {
		return (
			<div className="card-panel card-round">
				<table className="no-margin-top centered">
					<tbody>
						{this.props.displayData.map((channel, i) => {
							let bio = channel.bio;
							if (bio.length > 77) {
								bio = bio.substr(0, 77) + "...";
							}
							return (
								<tr key={i}>
									<td>
										<img
											src={channel.logo}
											alt="logo"
											className="responsive-img user-logo"
										/>
									</td>
									<td>
										<a href={"https://www.twitch.tv/" + channel.name}>
											{channel.display_name}
										</a>
									</td>
									<td>
										Status:{" "}
										{channel.status
											? channel.status
											: channel.data.stream.channel.status}
									</td>
									<td>
										{channel.status
											? bio
											: "Playing: " + channel.data.stream.game}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

export default ChannelList;
