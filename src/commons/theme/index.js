import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    color: {
        primary: '#0097A7',
        secondary: '#FF4081',
        error: '#FFA000'
    },
    typography: {
        fontFamily: 'Roboto',
    },
    shape: {
        borderRadius: 4,
        background: '#7B1FA2',
        textColor: '#fff',
        border: '#ccc'
    }
});
export default theme;