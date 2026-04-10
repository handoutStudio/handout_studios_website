'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import ToolTip from '@mui/material/Tooltip';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import MenuRounded from '@mui/icons-material/MenuRounded';
import SaveRounded from '@mui/icons-material/SaveRounded';
import ShareRounded from '@mui/icons-material/ShareRounded';
import PrintRounded from '@mui/icons-material/PrintRounded';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyRounded from '@mui/icons-material/FileCopyRounded';


export default function NestedSpeedDial() {
  // States for the parent and nested SpeedDials
  const [parentOpen, setParentOpen] = useState(false);
  const [nestedOpen, setNestedOpen] = useState(false);

  // Functions to handle parent SpeedDial open/close
  const handleParentOpen = () => setParentOpen(true);
  const handleParentClose = () => {
    setParentOpen(false);
    setNestedOpen(false); // Close nested when parent closes
  };

  // Functions to handle nested SpeedDial open/close
  const handleNestedOpen = () => setNestedOpen(true);
  const handleNestedClose = () => setNestedOpen(false);

  return (
    <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1, position: 'relative' }}>
      {/* Backdrop for parent SpeedDial */}
      <Backdrop open={parentOpen} onClick={handleParentClose} />

      {/* Parent SpeedDial */}
      <SpeedDial ariaLabel="Parent SpeedDial" sx={{ position: 'absolute', bottom: 16, right: 16 }} icon={<MenuRounded />} onClose={handleParentClose} onOpen={handleParentOpen} open={parentOpen} direction="up">
        {/* Actions for Parent SpeedDial */}
        <ToolTip title="Copy">
          <SpeedDialAction icon={<FileCopyRounded />} onClick={() => alert('Copy clicked!')} />
        </ToolTip>
        <ToolTip title="Save">
          <SpeedDialAction icon={<SaveRounded />} onClick={() => alert('Save clicked!')} />
        </ToolTip>
        <ToolTip title="Print">
          <SpeedDialAction icon={<PrintRounded />} onClick={() => alert('Print clicked!')} />
        </ToolTip>
        {/* Nested SpeedDial trigger */}
        <ToolTip title="More Options">
          <SpeedDialAction icon={<ShareRounded />} onMouseEnter={handleNestedOpen} onClick={handleNestedOpen} />
        </ToolTip>
      </SpeedDial>

      {/* Nested SpeedDial */}
      {
        nestedOpen &&
          <SpeedDial ariaLabel="Nested SpeedDial" sx={{ position: 'absolute', bottom: 120, right: 100 }} icon={<Avatar>+</Avatar>} onClose={handleNestedClose} open={nestedOpen} direction="left">
            <ToolTip title="Nested Copy">
              <SpeedDialAction icon={<FileCopyRounded />} onClick={() => alert('Nested Copy clicked!')} />
            </ToolTip>
            <ToolTip title="Nested Save">
              <SpeedDialAction icon={<SaveRounded />} onClick={() => alert('Nested Save clicked!')} />
            </ToolTip>
            <ToolTip title="Nested Print">
              <SpeedDialAction icon={<PrintRounded />} onClick={() => alert('Nested Print clicked!')} />
            </ToolTip>
          </SpeedDial>
      }
    </Box>
  );
}
