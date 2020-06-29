import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IThreadModeration, IPanelProps } from './interface';

export const Panel = ({ lockData, toggleThreadLockAction }: IPanelProps) => {
  const [reason, changeReason] = useState('');

  const handleClick = () => {
    toggleThreadLockAction({
      reason: reason || null,
    });
    changeReason('');
  };

  return (
    <Grid container alignItems="center" justify="space-between">
      {!!!lockData && (
        <>
          <Grid item xs={12}>
            <Typography variant="h6" component="p">
              Vérouiller le thread
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField
              label="Raison (optionnel)"
              fullWidth
              onChange={(evt) => changeReason(evt.target.value)}
              value={reason}
            />
          </Grid>
          <Grid item xs={3}>
            <Button variant="outlined" onClick={handleClick} fullWidth>
              Vérouiller
            </Button>
          </Grid>
        </>
      )}
      {!!lockData && (
        <>
          <Typography variant="h6" component="p">
            Dévérouiller le thread
          </Typography>
          <Button variant="outlined" onClick={handleClick}>
            Dévérouiller
          </Button>
        </>
      )}
    </Grid>
  );
};

export const ThreadModeration = ({
  lockData,
  toggleThreadLockAction,
}: IThreadModeration) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean,
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <ExpansionPanel
        TransitionProps={{ unmountOnExit: true }}
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography>Modération </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Panel
            toggleThreadLockAction={toggleThreadLockAction}
            lockData={lockData}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};
