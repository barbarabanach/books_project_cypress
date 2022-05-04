export default {
    async loadCurrency(context) {
        const response = await fetch('http://api.nbp.pl/api/exchangerates/tables/a?format=json');
        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Something goes wrong! Try again later...');
            throw error;
        }

        const currency = [];

        for(const key in responseData[0].rates) {
            const item = {
                id: key,
                code: responseData[0].rates[key].code,
                mid: responseData[0].rates[key].mid,
            };
            currency.push(item);
        }

        context.commit('setCurrency', currency);

    }
};