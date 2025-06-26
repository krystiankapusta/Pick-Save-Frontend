export const getAlertColors = () => {
    const theme = localStorage.getItem('theme');
    let backgroundColor = '#2c2c2c';
    let textColor = 'white';

    switch (theme) {
        case 'light':
            backgroundColor = 'white';
            textColor = 'black';
            break;
        case 'dark':
            backgroundColor = '#2c2c2c';
            textColor = 'white';
            break;
        default:
            backgroundColor = '#2c2c2c';
            textColor = 'white';
            break;
    }

    return { backgroundColor, textColor };
};
