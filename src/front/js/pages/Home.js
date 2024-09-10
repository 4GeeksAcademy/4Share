import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	let ground = document.getElementById('ground');
	let leftP = document.getElementById('leftP');
	let rightP = document.getElementById('rightP');
	let sunLogo = document.getElementById('sunLogo');
	let water = document.getElementById('water');
	let sky = document.getElementById('sky');

	window.addEventListener('scroll', () => {
		let value = window.scrollY;

		sunLogo.style.marginTop = value * 2 + 'px';
		leftP.style.marginLeft = value * -0.5 + 'px';
		rightP.style.marginLeft = value * 0.5 + 'px';

	});
	return (
		<div>
			<div className="parallax">
				<img id="sky" src="https://res.cloudinary.com/dmkw4vacw/image/upload/v1725904230/Sky_s3gbrd.png" alt="" />
				<img id="sunLogo" src="https://res.cloudinary.com/dmkw4vacw/image/upload/v1725908776/SunWithLogo_n5wpgr.png" alt="" />
				<img id="water" src="https://res.cloudinary.com/dmkw4vacw/image/upload/v1725908910/Water_yamzvh.png" alt="" />
				<img id="rightP" src="https://res.cloudinary.com/dmkw4vacw/image/upload/v1725908072/Right_Palms_COPY_sennpc.png" alt="" />
				<img id="leftP" src="https://res.cloudinary.com/dmkw4vacw/image/upload/v1725908777/Left_Palms_kjelhd.png" alt="" />
				<img id="ground" src="https://res.cloudinary.com/dmkw4vacw/image/upload/v1725909418/Ground_xtihyr.png" alt="" />
			</div>
			<div className="mainHome">
				<h2>MAIN HOME QUIENES SOMOS ETC </h2>
				<p>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla earum nobis dolor
					fuga numquam itaque quam, minima error nisi cum magnam sint nostrum aliquid consectetur libero obcaecati doloribus aliquam deserunt.
					fuga numquam itaque quam, minima error nisi cum magnam sint nostrum aliquid consectetur libero obcaecati doloribus aliquam deserunt.
					fuga numquam itaque quam, minima error nisi cum magnam sint nostrum aliquid consectetur libero obcaecati doloribus aliquam deserunt.
					fuga numquam itaque quam, minima error nisi cum magnam sint nostrum aliquid consectetur libero obcaecati doloribus aliquam deserunt.
					fuga numquam itaque quam, minima error nisi cum magnam sint nostrum aliquid consectetur libero obcaecati doloribus aliquam deserunt.
					fuga numquam itaque quam, minima error nisi cum magnam sint nostrum aliquid consectetur libero obcaecati doloribus aliquam deserunt.
					fuga numquam itaque quam, minima error nisi cum magnam sint nostrum aliquid consectetur libero obcaecati doloribus aliquam deserunt.
					fuga numquam itaque quam, minima error nisi cum magnam sint nostrum aliquid consectetur libero obcaecati doloribus aliquam deserunt.
					fuga numquam itaque quam, minima error nisi cum magnam sint nostrum aliquid consectetur libero obcaecati doloribus aliquam deserunt.
					fuga numquam itaque quam, minima error nisi cum magnam sint nostrum aliquid consectetur libero obcaecati doloribus aliquam deserunt.
				</p>
				<h2>MAIN HOME QUIENES SOMOS ETC </h2>
				<p>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla earum nobis dolor
					fuga numquam itaque quam, minima error nisi cum magnam sint nostrum aliquid consectetur libero obcaecati doloribus aliquam deserunt.
					fuga numquam itaque quam, minima error nisi cum magnam sint nostrum aliquid consectetur libero obcaecati doloribus aliquam deserunt.
					fuga numquam itaque quam, minima error nisi cum magnam sint nostrum aliquid consectetur libero obcaecati doloribus aliquam deserunt.
					fuga numquam itaque quam, minima error nisi cum magnam sint nostrum aliquid consectetur libero obcaecati doloribus aliquam deserunt.
					fuga numquam itaque quam, minima error nisi cum magnam sint nostrum aliquid consectetur libero obcaecati doloribus aliquam deserunt.
					fuga numquam itaque quam, minima error nisi cum magnam sint nostrum aliquid consectetur libero obcaecati doloribus aliquam deserunt.
					fuga numquam itaque quam, minima error nisi cum magnam sint nostrum aliquid consectetur libero obcaecati doloribus aliquam deserunt.
					fuga numquam itaque quam, minima error nisi cum magnam sint nostrum aliquid consectetur libero obcaecati doloribus aliquam deserunt.
					fuga numquam itaque quam, minima error nisi cum magnam sint nostrum aliquid consectetur libero obcaecati doloribus aliquam deserunt.
					fuga numquam itaque quam, minima error nisi cum magnam sint nostrum aliquid consectetur libero obcaecati doloribus aliquam deserunt.
				</p>
				<h2>MAIN HOME QUIENES SOMOS ETC </h2>
				<p>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla earum nobis dolor
					fuga numquam itaque quam, minima error nisi cum magnam sint nostrum aliquid consectetur libero obcaecati doloribus aliquam deserunt.
					fuga numquam itaque quam, minima error nisi cum magnam sint nostrum aliquid consectetur libero obcaecati doloribus aliquam deserunt.
					fuga numquam itaque quam, minima error nisi cum magnam sint nostrum aliquid consectetur libero obcaecati doloribus aliquam deserunt.
					fuga numquam itaque quam, minima error nisi cum magnam sint nostrum aliquid consectetur libero obcaecati doloribus aliquam deserunt.
					fuga numquam itaque quam, minima error nisi cum magnam sint nostrum aliquid consectetur libero obcaecati doloribus aliquam deserunt.
					fuga numquam itaque quam, minima error nisi cum magnam sint nostrum aliquid consectetur libero obcaecati doloribus aliquam deserunt.
					fuga numquam itaque quam, minima error nisi cum magnam sint nostrum aliquid consectetur libero obcaecati doloribus aliquam deserunt.
					fuga numquam itaque quam, minima error nisi cum magnam sint nostrum aliquid consectetur libero obcaecati doloribus aliquam deserunt.
					fuga numquam itaque quam, minima error nisi cum magnam sint nostrum aliquid consectetur libero obcaecati doloribus aliquam deserunt.
					fuga numquam itaque quam, minima error nisi cum magnam sint nostrum aliquid consectetur libero obcaecati doloribus aliquam deserunt.
				</p>

			</div>
		</div>
	);
};

export default Home;
