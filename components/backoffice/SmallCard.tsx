import * as React from 'react';
import { Avatar, LinearProgress, Paper, Typography } from '@mui/material';
import SmallCardSkeleton from '@/components/backoffice/skeletons/SmallCardSkeleton';

export default function SmallCard({ data }: any) {

	const [getIsLoading, setIsLoading] = React.useState(true);

	return (
		<>
		{
			getIsLoading
			?
				(<SmallCardSkeleton setIsLoading={setIsLoading} />)
			:
				(
					<>
						<Paper className={`!bg-[#7C0107] dark:!bg-[#AF0106] !text-white rounded-lg flex flex-col gap-2 p-4`} elevation={2}>
							<div className={`flex w-full justify-between items-center space-x-4 min-[600px]:justify-center min-[800px]:justify-between min-[600px]:flex-col min-[800px]:flex-row`}> 
								<Avatar alt="Remy Sharp" className={`${data.IconcolorName} !bg-white w-12 h-12`}>
									{data.icon}
								</Avatar>
								<div className={`flex w-full items-start`}>
									<Typography className={`min-[600px]:text-md min-[800px]:text-lg`} variant={'h6'} component={'h6'}>{ data.title }</Typography>
								</div>
								<Typography variant={'h4'} component={'h4'}>{ data.sales }</Typography>
							</div>
						<LinearProgress className={`!w-full`} sx={{ backgroundColor: data.BarColorBg, '& .MuiLinearProgress-bar': { backgroundColor: data.BarcolorName } }} value={50} variant="determinate" />
						</Paper>
					</>
				)
		}
		</>
	)
}
