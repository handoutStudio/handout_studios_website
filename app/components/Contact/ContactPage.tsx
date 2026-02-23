'use client';

import Link from 'next/link';
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import styles from './style.module.scss';
import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import CardHeader from '@mui/material/CardHeader';
import useScreenSize from '@/app/lib/useScreenSize';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InstagramIcon from '@mui/icons-material/Instagram';
import MagneticPage from '@/app/common/Magnetic/MagneticPage';
import HandoutStudioLogo from '@/public/images/background.svg';
import earthlineLogo from '@/public/images/earthline-made.svg';
import { useScroll, motion, useTransform } from 'framer-motion';
import RoundedPage from '@/app/common/RoundedButton/RoundedButtonPage';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import { ResponsiveImage } from '@/app/common/ResponsiveImage/ResponsiveImage';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';


interface ContactPageProps { caller?: string }


export default function ContactPage({ caller }: ContactPageProps) {

	const handleOpen = () => setOpen(true);
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);

	// check if the screen is Mobile or Tablet or Desktop
	const screenSize = useScreenSize();

	const isMobile = screenSize?.width && screenSize.width <= 768;
	const isTablet = screenSize?.width && screenSize.width <= 1024;
	const isDesktop = screenSize?.width && screenSize.width >= 1025;

	// Variables
	const container = useRef(null);
	const { scrollYProgress } = useScroll({ target: container, offset: ["start end", "end end"] });
	const x = useTransform(scrollYProgress, [0, 1], [0, 100])
	const y = useTransform(scrollYProgress, [0, 1], [-500, 0])
	const rotate = useTransform(scrollYProgress, [0, 1], [120, 90])

	return (
		<motion.div style={{y}} ref={container} className={caller === "earthline-made" ? styles.contactE : styles.contactH}>
			<div className={styles.body}>
		{
			isDesktop
			?
				<>
					<div className={styles.title}>
						<span>
							{/* <div className={`fixed left-[8vw] bg-[#FFFFFF] rounded-xl`}>
								<MagneticPage>
									<div className={styles.workVenture}>
										<div className={styles.imageContainerOtherVenture}>
											<div className={styles.imageContainer}>
												<ResponsiveImage src={`/images/background.svg`} alt={"image"} />
											</div>
										</div>
									</div>
								</MagneticPage>
							</div> */}
							<div className={styles.imageContainer}>
								<p className={styles.copyright}>
									<ResponsiveImage src={caller === "earthline-made" ? earthlineLogo : HandoutStudioLogo} alt="handout studios logo" fill={false} />
								</p>
							</div>
							<h2>{`We make things that`}</h2> 
						</span>
						<h2>{`stay forever...!`}</h2>
						<motion.div style={{x}} className={styles.buttonContainer}>
							<RoundedPage onClick={handleOpen} backgroundColor={caller === "earthline-made" ? "#564F47" : "#7a0007"} className={styles.button}> <p>{`Get in touch`}</p> </RoundedPage>
						</motion.div>
						<span className={styles.otherVenturesSpan}>{"Parent Company"}</span>
						<motion.svg style={{rotate, scale: 2}} width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z" fill="white"/>
						</motion.svg>
						<div className={styles.workVentureOuter}>
							<MagneticPage>
								<div className={styles.workVenture}>
									<div className={styles.imageContainerOtherVenture}>
										<div />
									</div>
								</div>
							</MagneticPage>
						</div>
					</div>
					<div className={styles.nav}>
						<motion.div style={{x}} className={styles.buttonContainer}>
							<RoundedPage backgroundColor={caller === "earthline-made" ? "#EDE8E4" : "#FFFFFF"} caller={caller}>
								<p onClick={ () => window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=handoutstudio3@gmail.com`, '_blank') } className={styles.textP}>{`handoutstudio3@gmail.com`}</p>
							</RoundedPage>
						</motion.div>
						<motion.div style={{x}} className={styles.buttonContainer}>
							<RoundedPage backgroundColor={caller === "earthline-made" ? "#EDE8E4" : "#FFFFFF"} caller={caller}>
								<p className={styles.textP}>{`(+91) - 823 - 800 - 4301`}</p>
							</RoundedPage>
						</motion.div>
					</div>
					<br />
					<div id='contact' className={styles.info}>
						{/* <div>
							<span>
								<h3>{`Developed By`}</h3>
								<a href='https://mail.google.com/mail/?view=cm&fs=1&to=ellis0078@gmail.com' target='_blank'> {`Ellis Sanjay Tarmaster`} </a>
							</span>
						</div> */}
						<div>
							<span>
								<h3>{`© All Rights Reserved`}</h3>
								<MagneticPage>
									<p>{ caller === "earthline-made" ? `earth-line.made@2024` : `Handout-Studios@2024` }</p>
								</MagneticPage>
							</span>
						</div>
						<div>
							<span>
								<h3>{`socials`}</h3>
								<MagneticPage>
									<p onClick={() => window.open(`${caller === "earthline-made" ? "https://www.instagram.com/earthline.made/" : "https://www.instagram.com/handout_studio?igsh=bXVubGc2YXo1ZDkx" } `, '_blank')}> {`Instagram`} </p>
								</MagneticPage>
							</span>
							<span>
								<MagneticPage>
									<p onClick={() => window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=handoutstudio@gmail.com`, '_blank')}> {`Gmail`} </p>
								</MagneticPage>
							</span>
							{/* <MagneticPage> <p>{`Awwwards`}</p> </MagneticPage>
							<MagneticPage> <p>{`Dribbble`}</p> </MagneticPage>
							<MagneticPage> <p>{`Linkedin`}</p> </MagneticPage> */}
						</div>
					</div>
					<div title='Back to top' className={`absolute bottom-[25vh] right-[8vw] ${styles.backToTop}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
						<motion.div style={{x}} className={styles.buttonContainer}>
							<MagneticPage>
								<div className={`flex items-center justify-center flex-col cursor-pointer`}>
									<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className={`bi bi-caret-up-fill`} viewBox="0 0 16 16">
										<path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
									</svg>
									<label className={styles.label}>{`Back to top`}</label>
								</div>
							</MagneticPage>
						</motion.div>
					</div>
					<Modal open={open} onClose={handleClose}>
						<Card className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl`}>
							<CardHeader title={`Get in Touch`} subheader={`Contact us for any queries`} className={`text-center`} />
							<Divider />
							<CardContent className={`flex flex-col gap-10`}>
								<MenuList className={`text-[#EDE8E4] w-full bg-[#564F47] rounded-xl`}>
									<MenuItem>
										<ListItemIcon>
											<InstagramIcon sx={{ color: "#EDE8E4" }} />
										</ListItemIcon>
										<ListItemText primary={ <Link href={`https://www.instagram.com/earthline.made/`} target="_blank" rel="noopener noreferrer"> <p><i>{`@earthline.made`}</i></p> </Link> } />
									</MenuItem>
									<MenuItem>
										<ListItemIcon>
											<MailOutlineOutlinedIcon sx={{ color: "#EDE8E4" }} />
										</ListItemIcon>
										<ListItemText primary={ <Link href={`mailto:handoutstudio3@gmail.com`} target="_blank" rel="noopener noreferrer"> <p><i>{'handoutstudio3@gmail.com'}</i></p> </Link> } />
									</MenuItem>
									<MenuItem>
										<ListItemIcon>
											<LocalShippingOutlinedIcon sx={{ color: "#EDE8E4" }} />
										</ListItemIcon>
										<ListItemText primary={ <p><i>{`(+91) - 823 - 800 - 4301`}</i></p> } />
									</MenuItem>
								</MenuList>
							</CardContent>
							<Divider />
							<CardActions className={`m-0! p-0!`}>
								<Button variant='contained' sx={{ backgroundColor: "#564F47", color: "#EDE8E4", width: "100%" }} onClick={handleClose}>Close</Button>
							</CardActions>
						</Card>
					</Modal>
				</>
			:
				isTablet || isMobile
				?
					<>
						<div className={`flex flex-col gap-12 px-6 py-16`}>

							{/* Top Section */}
							<div className={`flex flex-col items-start gap-6`}>

								<div className={`flex items-center gap-4`}>
									<div className={`w-60 h-60 bg-[#EDE8E4] rounded-xl flex items-center justify-center p-10 max-[400px]:p-3`}>
										<ResponsiveImage src={caller === "earthline-made" ? earthlineLogo : HandoutStudioLogo} alt="logo" fill={false} />
									</div>
									<h2 className={`text-xl md:text-3xl font-light leading-tight`}> {`We make things that `} <br /> {` stay forever.`} </h2>
								</div>
							</div>

							{/* Contact Buttons */}
							<div className="flex flex-row justify-around max-[450px]:flex-col max-[450px]:gap-5">
								<p className={`text-sm border-[#EDE8E4] border p-3 rounded-2xl`} onClick={() => window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=handoutstudio3@gmail.com`, "_blank")}> {`handoutstudio3@gmail.com`} </p>
								<p className={`text-sm border-[#EDE8E4] border p-3 rounded-2xl`}>{`(+91) - 823 - 800 - 4301`}</p>
							</div>

							{/* Divider */}
							<div className="border-t border-[#EDE8E4]/30 pt-25 flex flex-row justify-between w-full">

								{/* Copyright */}
								<div className="flex flex-col gap-2">
									<h3 className="text-sm font-light opacity-70"> {`© All Rights Reserved`} </h3>
									<p className="text-sm"> { caller === "earthline-made" ? "earth-line.made@2024" : "Handout-Studios@2024"} </p>
								</div>

								{/* Socials */}
								<div className="flex flex-col gap-2">
									<h3 className="text-sm font-light opacity-70"> {`Socials`} </h3>
									<div className="flex gap-6">
										<p className="text-sm underline underline-offset-4" onClick={() => window.open( caller === "earthline-made" ? "https://www.instagram.com/earthline.made/" : "https://www.instagram.com/handout_studio", "_blank") }> {`Instagram`} </p>
										<p className="text-sm underline underline-offset-4" onClick={() => window.open( "https://mail.google.com/mail/?view=cm&fs=1&to=handoutstudio@gmail.com", "_blank") }> {`Gmail`} </p>
									</div>
								</div>

							</div>

							{/* Back to top */}
							<div className="fixed bottom-30 right-6 bg-white text-black rounded-full p-3 shadow-lg" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}> ↑ </div>

						</div>
						</>

				:
					null
			}
			</div>
		</motion.div>
	)
}
