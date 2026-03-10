'use client';

import Link from 'next/link';
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import Timeline from '@mui/lab/Timeline';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import TimelineDot from '@mui/lab/TimelineDot';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TimelineContent from '@mui/lab/TimelineContent';
import InstagramIcon from '@mui/icons-material/Instagram';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ConnectWithoutContactOutlinedIcon from '@mui/icons-material/ConnectWithoutContactOutlined';

type HowToOrderType = { open: boolean; handleClose: () => void; };

export default function HowToOrder({ open, handleClose }: HowToOrderType) {

    return (
        <Modal open={open} onClose={handleClose}>
            <Card sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: { xs: "95%", sm: "85%", md: "70%", lg: "50%" }, height: { xs: "90vh", sm: "85vh" }, display: "flex", flexDirection: "column", borderRadius: 3, }}>
                <CardHeader title="How To Order" subheader="Let's create something unique for your space." sx={{ textAlign: "center", flexShrink: 0, "& .MuiCardHeader-title": { fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.6rem" }, fontWeight: 600, }, "& .MuiCardHeader-subheader": { fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" }, }, }} />
                <Divider sx={{ flexShrink: 0 }} />

                {/* SCROLLABLE CONTENT */}
                <CardContent sx={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: { xs: 4, md: 6 }, px: { xs: 2, sm: 4 }, py: { xs: 3, sm: 4 }, }}>
                    <div>
                        <Timeline sx={{ [`& .${timelineItemClasses.root}:before`]: { flex: 0, padding: 0, } }} className={`text-[#EDE8E4]! bg-[#564F47] w-full rounded-xl`}>
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot sx={{ backgroundColor: "#EDE8E4" }}>
                                        <ChecklistOutlinedIcon sx={{ color: "#564F47" }} />
                                    </TimelineDot>
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent><strong><i>{`Choose your Product - `}</i></strong>{`We have a wide range of products to choose from`}</TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot sx={{ backgroundColor: "#EDE8E4" }}>
                                        <ShareOutlinedIcon sx={{ color: "#564F47" }} />
                                    </TimelineDot>
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent><strong><i>{`Share your Idea -`}</i></strong>{`Send us your Requirements or inspiration`}</TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot sx={{ backgroundColor: "#EDE8E4" }}>
                                        <ThumbUpAltOutlinedIcon sx={{ color: "#564F47" }} />
                                    </TimelineDot>
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent><strong><i>{`Approve the Design -`}</i></strong>{`We send you the Concept along with the Quote`}</TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot sx={{ backgroundColor: "#EDE8E4" }}>
                                        <ThumbUpAltOutlinedIcon sx={{ color: "#564F47" }} />
                                    </TimelineDot>
                                </TimelineSeparator>
                                <TimelineContent><strong><i>{`Receive Your Piece -`}</i></strong>{`Your handcrafted art, made just for you`}</TimelineContent>
                            </TimelineItem>
                        </Timeline>
                    </div>
                    <Divider />
                    <MenuList className={`text-[#EDE8E4] w-full bg-[#564F47] rounded-xl`}>
                        <MenuItem disabled>
                            <ListItemIcon>
                                <ConnectWithoutContactOutlinedIcon sx={{ color: "#EDE8E4" }} />
                            </ListItemIcon>
                            <ListItemText primary={`Contact us for any queries`} />
                        </MenuItem>
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

                <Divider sx={{ flexShrink: 0 }} />

                <CardActions sx={{ p: 0, flexShrink: 0 }}>
                    <Button variant="contained" onClick={handleClose} sx={{ backgroundColor: "#564F47", color: "#EDE8E4", width: "100%", py: { xs: 1.5, md: 2 }, fontSize: { xs: "0.9rem", md: "1rem" }, }}>
                        {`Close`}
                    </Button>
                </CardActions>
            </Card>
        </Modal>
    );
}