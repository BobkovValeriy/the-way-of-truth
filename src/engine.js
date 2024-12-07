export  async function getCountryCode() {
    try {
        const response = await fetch('https://ipapi.co/country/');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const countryCode = await response.text();
        return countryCode;
    } catch (error) {
        return navigator.language.split('-')[0].toUpperCase();; // Значение по умолчанию
    }
}