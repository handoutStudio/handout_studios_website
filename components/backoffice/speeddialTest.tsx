'use client';

import React, { useState } from 'react';
import { Box, SpeedDial, SpeedDialAction, Avatar, Backdrop } from '@mui/material';
import { FileCopyRounded, SaveRounded, PrintRounded, ShareRounded, MenuRounded } from '@mui/icons-material';

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
      <SpeedDial
        ariaLabel="Parent SpeedDial"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<MenuRounded />}
        onClose={handleParentClose}
        onOpen={handleParentOpen}
        open={parentOpen}
        direction="up" // Opens from bottom to top
      >
        {/* Actions for Parent SpeedDial */}
        <SpeedDialAction
          icon={<FileCopyRounded />}
          tooltipTitle="Copy"
          onClick={() => alert('Copy clicked!')}
        />
        <SpeedDialAction
          icon={<SaveRounded />}
          tooltipTitle="Save"
          onClick={() => alert('Save clicked!')}
        />
        <SpeedDialAction
          icon={<PrintRounded />}
          tooltipTitle="Print"
          onClick={() => alert('Print clicked!')}
        />

        {/* Nested SpeedDial trigger */}
        <SpeedDialAction
          icon={<ShareRounded />}
          tooltipTitle="More Options"
          onMouseEnter={handleNestedOpen} // Opens the nested SpeedDial
          onClick={handleNestedOpen} // Opens the nested SpeedDial
        />
      </SpeedDial>

      {/* Nested SpeedDial */}
      {nestedOpen && (
        <SpeedDial
          ariaLabel="Nested SpeedDial"
          sx={{ position: 'absolute', bottom: 120, right: 100 }}
          icon={<Avatar>+</Avatar>} // Icon for nested SpeedDial
          onClose={handleNestedClose}
          open={nestedOpen}
          direction="left" // Opens from right to left
        >
          <SpeedDialAction
            icon={<FileCopyRounded />}
            tooltipTitle="Nested Copy"
            onClick={() => alert('Nested Copy clicked!')}
          />
          <SpeedDialAction
            icon={<SaveRounded />}
            tooltipTitle="Nested Save"
            onClick={() => alert('Nested Save clicked!')}
          />
          <SpeedDialAction
            icon={<PrintRounded />}
            tooltipTitle="Nested Print"
            onClick={() => alert('Nested Print clicked!')}
          />
        </SpeedDial>
      )}
    </Box>
  );
}
