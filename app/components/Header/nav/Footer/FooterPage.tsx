import instagram from '@/public/instagram.svg';
import styles from '@/app/components/Header/nav/Footer/style.module.scss';
import { ResponsiveImage } from '@/app/common/ResponsiveImage/ResponsiveImage';

interface FooterPageProps { caller?: string }

export default function FooterPage({caller}: FooterPageProps) {

	return (
		<div className={styles.footer}>
			<div className={styles.logo}>
				<div className={styles.name}>
					<p className={styles.handOut}>Social</p>
					<p className={styles.studios}>Profiles</p>
					<p className={styles.socialProfiles}>
						<a href={caller === "earthline-made" ? `https://www.instagram.com/earthline.made/` :`https://www.instagram.com/handout_studio?igsh=bXVubGc2YXo1ZDkx`} target="_blank" rel="noreferrer">
							<ResponsiveImage className={styles.imgAll} src={instagram} alt="instagram" />
						</a>
					</p>
				</div>
			</div>
			<div className={styles.logo} onClick={() => window.location.pathname !== '/' && window.location.assign('/')} style={{ cursor: 'pointer' }}>
				<p className={styles.copyright}>©</p>
				{
					caller === 'earthline-made'
					?
						<div className={styles.name}>
							<p className={styles.handOut}>earth-line.made</p>
							<p className={styles.studios}></p>
							<p className={styles.aishiniRuzal}>By Handout-Studios</p>
						</div>
					:
						<div className={styles.name}>
							<p className={styles.handOut}>Handout</p>
							<p className={styles.studios}>Studios</p>
							<p className={styles.aishiniRuzal}>By Aishni & Ruzal</p>
						</div>
				}
			</div>
		</div>
	)
}
