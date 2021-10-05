import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	button: {
		position: 'absolute !important',
		top: '9px',
		right: 0
	},
	title: {
		marginLeft: '-8px !important'
	}
});

function Modal({ children, onClose, open, title }) {
	const classes = useStyles();

	const handleClose = () => {
		onClose();
	};

	return (
		<Dialog fullWidth onClose={handleClose} open={open}>
			<DialogTitle className={classes.title}>
				{title}
				{onClose ? (
					<IconButton className={classes.button} onClick={onClose}>
						<FontAwesomeIcon icon={faTimes} />
					</IconButton>
				) : null}
			</DialogTitle>
			<DialogContent>{children}</DialogContent>
		</Dialog>
	);
}

export default Modal;
