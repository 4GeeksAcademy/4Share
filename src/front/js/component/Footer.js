import React from "react";
import '../../styles/footer.css';

const Footer = () => (
	<footer className="footer">
		<div className="footer-row">
			<div className="footer-column">
				<h4 className="custom-title-footer">About Us</h4>
				<ul>
					<li>We are a group of 4geeks Academy students and this is our final project. </li>
				</ul>
			</div>

			<div className="footer-column">
				<h4 className="custom-title-footer">Knowledge Exchange</h4>
				<ul>
					<li>Dance</li>
					<li>Sports</li>
					<li>Music</li>
					<li>Languages</li>
					<li>Cooking</li>
					<li>Studies</li>
				</ul>
			</div>
			<div className="footer-column">
				<h4 className="custom-title-footer">Credits</h4>
				<p>Developers from 4Share</p>
				<img src="https://res.cloudinary.com/dmkw4vacw/image/upload/v1725897267/Logo_in_White_text_ddxzuv.png" alt="4Share Logo" className="logo" />
				<p>Our mentors from 4Geeks Academy</p>
			</div>
		</div>
	</footer>
);

export default Footer;
