import styles from '@/app/(front-end)/earthline-made/our-mission/style.module.scss';
import OurMission from '@/app/(front-end)/earthline-made/components/OurMission/OurMission';


export default function Page() {
	return (
		<div className={styles.main}>
			<OurMission />
		</div>
	);
}