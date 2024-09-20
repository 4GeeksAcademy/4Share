import React from "react";
import '../../styles/footer.css';

const Footer = () => (
	<footer className="footer">
		<div className="footer-row">
			<div className="footer-column">
				<h4 className="custom-title-footer">About Us</h4>
				<ul>
					<li>Who we are</li>
					<li>Our values</li>
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
				<h4 className="custom-title-footer">Social Media</h4>
				<div className="social-icons">
					<a href="#"><i className="fab fa-instagram"></i></a>
					<a href="#"><i className="fab fa-facebook"></i></a>
					<a href="#"><i className="fab fa-twitter"></i></a>
				</div>
			</div>

			<div className="footer-column">
				<h4 className="custom-title-footer">Credits</h4>
				<p>Developers from 4Share</p>
				<img src="4share-logo.png" alt="4Share Logo" className="logo" />
				<p>Our mentors from 4Geeks Academy</p>
				<img src="4geeks-logo.png" alt="4Geeks Logo" className="logo" />
			</div>
		</div>
	</footer>
);

export default Footer;
