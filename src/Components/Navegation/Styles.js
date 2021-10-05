import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    image: {
		maxHeight: '100%',
		maxWidth: '100%',
        display: 'flex',
        justifyItems: 'center',
        alignContent: 'center',
        alignItems: 'center'
	},
	containerImage:{
		width: 100,
		height: 90
	},
	containerImageDrawer:{
		width: 100,
		height: 100
	}
});

export default useStyles;