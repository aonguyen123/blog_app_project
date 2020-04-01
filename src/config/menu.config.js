const setSelectedMenu = (selectedMenu = '') => {
    return sessionStorage.setItem('selectedID', selectedMenu);
}
const getSelectedMenu = () => {
    const selectedMenu = sessionStorage.getItem('selectedID');
    return selectedMenu;
}

export default {
    setSelectedMenu,
    getSelectedMenu
}