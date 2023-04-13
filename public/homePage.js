'use strict'

const logoutButton = new LogoutButton();
    logoutButton.action = () => {
        ApiConnector.logout(response => {
            if (response.success === true) {
            location.reload();
            }
        }
    )
}

ApiConnector.current(response => {
    if (response.success === true) {
        ProfileWidget.showProfile(response.data);
        }        
    }   
)

stocks();


const ratesBoard = new RatesBoard();
    function stocks(){
        ApiConnector.getStocks(response => {
            if (response.success === true) {
                ratesBoard.clearTable();
                ratesBoard.fillTable(response.data);
            }
        }
    )    
}
let timerId = setTimeout(stocks, 6000);


const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        if (response.success === true) {
            moneyManager.setMessage(response, "Спасибо за успешное пополнение в размере " + data.amount + " " + data.currency + " !");
            ProfileWidget.showProfile(response.data);
        } else {             
            moneyManager.setMessage(response.success, response.error);
            }
        }   
    )
}

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success === true) {
            moneyManager.setMessage(response, "Спасибо за успешную конвертацию "  + data.fromAmount + data.fromCurrency +" в "  + data.targetCurrency + "!");
            ProfileWidget.showProfile(response.data);
        } else {             
            moneyManager.setMessage(response.success, response.error);
            }
        }
    )
}

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        ProfileWidget.showProfile(response.data);
        if (response.success === true) {
            moneyManager.setMessage(response, "Спасибо за успешный перевод в размере " + data.amount + " " + data.currency + "!");
        } else {             
            moneyManager.setMessage(response.success, response.error);
            }
        }
    )
}

const favoritesWidget = new FavoritesWidget();
    ApiConnector.getFavorites(response => {
        if (response.success === true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            }
        }
    )

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success === true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
        } else {
            favoritesWidget.setMessage(response.success, response.error);}
        }
    )
}

favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success === true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
        } else {
            favoritesWidget.setMessage(response.success, response.error);}
        }
    )
}