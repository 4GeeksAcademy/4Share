import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import HomeCard from "../component/HomeCard";

export const Home = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		let ground = document.getElementById('ground');
		let leftP = document.getElementById('leftP');
		let rightP = document.getElementById('rightP');
		let sunLogo = document.getElementById('sunLogo');
		let water = document.getElementById('water');
		let sky = document.getElementById('sky');

		if (ground && leftP && rightP && sunLogo && water && sky) {
			const handleScroll = () => {
				let value = window.scrollY;
				if (value < 500) {
					sunLogo.style.transform = `translateY(${value * 2}px)`;
				}
				leftP.style.transform = `translateX(${value * -0.5}px)`;
				rightP.style.transform = `translateX(${value * 0.5}px)`;
			};

			window.addEventListener('scroll', handleScroll);

			return () => {
				window.removeEventListener('scroll', handleScroll);
			};
		}
	}, []);

	return (
		<div className="container-fluid">
			<div className="parallax">
				<img id="sky" src="https://res.cloudinary.com/dmkw4vacw/image/upload/v1725904230/Sky_s3gbrd.png" alt="" />
				<img id="sunLogo" src="https://res.cloudinary.com/dmkw4vacw/image/upload/v1725908776/SunWithLogo_n5wpgr.png" alt="" />
				<img id="water" src="https://res.cloudinary.com/dmkw4vacw/image/upload/v1725908910/Water_yamzvh.png" alt="" />
				<img id="rightP" src="https://res.cloudinary.com/dmkw4vacw/image/upload/v1725908072/Right_Palms_COPY_sennpc.png" alt="" />
				<img id="leftP" src="https://res.cloudinary.com/dmkw4vacw/image/upload/v1725908777/Left_Palms_kjelhd.png" alt="" />
				<img id="ground" src="https://res.cloudinary.com/dmkw4vacw/image/upload/v1725909418/Ground_xtihyr.png" alt="" />
			</div>
			<div className="mainHome">
				<div className="imageTextContainer backgroundMain">
					<img className="jumboTwo" src="https://res.cloudinary.com/dmkw4vacw/image/upload/v1726064828/7bfd621f88bcf22b8a27b87f84297228_xg9m1i.png" alt="Image 1" />
					<img className="jumboOne" src="https://res.cloudinary.com/dmkw4vacw/image/upload/v1726054101/2429e1b1914a898551911a26c60f563a_fv26mn.png" alt="Image 2" />
				</div>

				<div className="d-flex flex-column justify-content-center align-items-center backgroundMain ">
					<br /><br /><br /><br />
					<div className="titlesBorder">
						<h1 className="titles">Start Searching!</h1>
					</div>
					<div className="searchBar input-group px-1 px-sm-5 mb-2">
						<input type="text" className="form-control search" placeholder="Search here any skills!" aria-label="Username" aria-describedby="basic-addon1" />
						<Link className="btn me-0" to="/profileSearch "><i className="fas fa-search"></i></Link>
					</div>
					<div className="d-flex justify-content-between row w-100 px-5 categoriesHome">
						<Link className="col-1 col-sm-2 btn d-flex justify-content-center" to="/profileSearch/cooking">
							<p >Cooking</p><i className="fas fa-utensils "></i>
						</Link>
						<Link className="col-1 col-sm-2 btn d-flex justify-content-center" to="/profileSearch/languages">
							<p >Languages</p><i className="fas fa-language "></i>
						</Link>
						<Link className="col-1 col-sm-2 btn d-flex justify-content-center" to="/profileSearch/music">
							<p v>Music</p><i className="fas fa-music "></i>
						</Link>
						<Link className="col-1 col-sm-2 btn d-flex justify-content-center" to="/profileSearch/sports">
							<p >Sports</p>	<i className="fas fa-futbol"></i>
						</Link>
						<Link className="col-1 col-sm-2 btn d-flex justify-content-center" to="/profileSearch/others">
							<p >Others</p>	<i className="fas fa-ellipsis-h"></i>
						</Link>
					</div>
					<br /><br /><br /><br />
				</div>

				<div className="topProfiles d-flex flex-column justify-content-center align-items-center backgroundMain">
					<div className="titlesBorder">
						<h1 className="titles">Top rated profiles</h1>
					</div>
					<div className="container">
						<div className="row d-flex justify-content-center">
							<div className="col-10 col-md-4">
								<HomeCard isOwnProfile={false} />
							</div>
							<div className="col-10 col-md-4">
								<HomeCard isOwnProfile={false} />
							</div>
							<div className="col-10 col-md-4">
								<HomeCard isOwnProfile={false} />
							</div>
							<div className="col-10 col-md-4">
								<HomeCard isOwnProfile={false} />
							</div>
							<div className="col-10 col-md-4">
								<HomeCard isOwnProfile={false} />
							</div>
							<div className="col-10 col-md-4">
								<HomeCard isOwnProfile={false} />
							</div>
						</div>
					</div>
				</div>
				<div className="aboutUs d-flex flex-column justify-content-center align-items-center backgroundMain ">
					<div className="titlesBorder">
						<h1 className="titles">Who are we?</h1>
						
					</div>
					<div className="container">
							<div className="row d-flex justify-content-center">
								<div className="col-10 col-md-4">
									<HomeCard isOwnProfile={true} />
								</div>
								<div className="col-10 col-md-4">
									<HomeCard isOwnProfile={true} />
								</div>
								<div className="col-10 col-md-4">
									<HomeCard isOwnProfile={true} />
								</div>
							</div>
						</div>
					
				</div>
			</div>
		</div>
	);
};

export default Home;
