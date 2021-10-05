import { Box, Snackbar, Typography, Portal } from '@material-ui/core';
import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
	snack: {
		zIndex: `${99999}!important`
	}
}));

export default function SnackBarMessages({ alert, setAlert }) {
	const classes = useStyles();

	const handleClose = () => {
		setAlert({ open: false, status: alert.status, message: '' });
	};

	return (
		<Portal>
			<Snackbar
				className={classes.snack}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				open={alert.open}
				onClose={handleClose}
				autoHideDuration={3000}
				message={
					<Box display="flex">
						{alert.status === 'success' ? (
							<CheckCircleIcon style={{ color: '#22bb33' }} />
						) : (
							<ErrorIcon style={{ color: 'red' }} />
						)}
						<Box mr={1} />
						<Typography>{alert.message}</Typography>
					</Box>
				}
			/>
		</Portal>
	);
}
